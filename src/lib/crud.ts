import { NextRequest, NextResponse } from "next/server";
import { getSession, type SessionUser } from "./auth";

export type FieldType =
  | "string"
  | "number"
  | "int"
  | "boolean"
  | "date"
  | "stringArray";

export interface CrudDelegate {
  findMany(args?: unknown): Promise<unknown[]>;
  create(args: unknown): Promise<unknown>;
  update(args: unknown): Promise<unknown>;
  delete(args: unknown): Promise<unknown>;
}

export interface CrudConfig {
  delegate: CrudDelegate;
  /** Whitelist of writable fields and how to coerce incoming JSON values. */
  fields: Record<string, FieldType>;
  required?: string[];
  defaults?: Record<string, unknown>;
  /** Auto-generated human readable code, e.g. codeField "incomeCode" + prefix "BM-INC". */
  codeField?: string;
  codePrefix?: string;
  orderBy?: Record<string, "asc" | "desc">;
  include?: Record<string, unknown>;
  ownerField?: string | null;
  take?: number;
  /** Extra computed columns (totals, net amounts, ...). */
  derive?: (
    data: Record<string, unknown>,
    session: SessionUser
  ) => Record<string, unknown>;
}

function coerce(type: FieldType, raw: unknown): unknown {
  if (raw === undefined || raw === null || raw === "") return null;
  switch (type) {
    case "number": {
      const n = typeof raw === "number" ? raw : parseFloat(String(raw));
      return Number.isNaN(n) ? null : n;
    }
    case "int": {
      const n = typeof raw === "number" ? raw : parseInt(String(raw), 10);
      return Number.isNaN(n) ? null : n;
    }
    case "boolean":
      return raw === true || raw === "true" || raw === "yes" || raw === "on";
    case "date": {
      const d = new Date(String(raw));
      return Number.isNaN(d.getTime()) ? null : d;
    }
    case "stringArray":
      if (Array.isArray(raw)) return raw.map((v) => String(v));
      return String(raw)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    default:
      return String(raw);
  }
}

export function generateCode(prefix: string): string {
  const random = Math.floor(Math.random() * 900 + 100);
  return `${prefix}-${Date.now().toString(36).toUpperCase()}${random}`;
}

function buildData(
  config: CrudConfig,
  body: Record<string, unknown>,
  session: SessionUser,
  isUpdate: boolean
): { data: Record<string, unknown> } | { error: string } {
  const data: Record<string, unknown> = {};

  for (const [name, type] of Object.entries(config.fields)) {
    if (!(name in body)) continue;
    const value = coerce(type, body[name]);
    if (value === null && config.required?.includes(name)) {
      return { error: `${name} is required` };
    }
    data[name] = value;
  }

  if (!isUpdate) {
    for (const name of config.required ?? []) {
      if (data[name] === undefined || data[name] === null) {
        return { error: `${name} is required` };
      }
    }
    for (const [name, value] of Object.entries(config.defaults ?? {})) {
      if (data[name] === undefined || data[name] === null) data[name] = value;
    }
    if (config.codeField && config.codePrefix && !data[config.codeField]) {
      data[config.codeField] = generateCode(config.codePrefix);
    }
    const ownerField =
      config.ownerField === undefined ? "createdById" : config.ownerField;
    if (ownerField) data[ownerField] = session.id;
  }

  if (config.derive) Object.assign(data, config.derive(data, session));

  // Enum / non-nullable columns must not receive an explicit null.
  for (const key of Object.keys(data)) {
    if (data[key] === null && config.defaults && key in config.defaults) {
      data[key] = config.defaults[key];
    }
  }

  return { data };
}

export interface CrudHandlers {
  GET: () => Promise<NextResponse>;
  POST: (req: NextRequest) => Promise<NextResponse>;
  PATCH: (req: NextRequest) => Promise<NextResponse>;
  DELETE: (req: NextRequest) => Promise<NextResponse>;
}

/**
 * Builds authenticated list/create/update/delete handlers for a Prisma model.
 * PATCH and DELETE take the record `id` in the JSON body.
 */
export function createCrudHandlers(config: CrudConfig): CrudHandlers {
  const unauthorized = () =>
    NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return {
    async GET() {
      const session = await getSession();
      if (!session) return unauthorized();
      const rows = await config.delegate.findMany({
        orderBy: config.orderBy ?? { createdAt: "desc" },
        include: config.include,
        take: config.take ?? 200,
      });
      return NextResponse.json(rows);
    },

    async POST(req: NextRequest) {
      const session = await getSession();
      if (!session) return unauthorized();
      const body = (await req.json()) as Record<string, unknown>;
      const built = buildData(config, body, session, false);
      if ("error" in built) {
        return NextResponse.json({ error: built.error }, { status: 400 });
      }
      try {
        const row = await config.delegate.create({ data: built.data });
        return NextResponse.json(row, { status: 201 });
      } catch (error) {
        return NextResponse.json(
          { error: (error as Error).message },
          { status: 400 }
        );
      }
    },

    async PATCH(req: NextRequest) {
      const session = await getSession();
      if (!session) return unauthorized();
      const body = (await req.json()) as Record<string, unknown>;
      const id = typeof body.id === "string" ? body.id : null;
      if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
      const built = buildData(config, body, session, true);
      if ("error" in built) {
        return NextResponse.json({ error: built.error }, { status: 400 });
      }
      try {
        const row = await config.delegate.update({
          where: { id },
          data: built.data,
        });
        return NextResponse.json(row);
      } catch (error) {
        return NextResponse.json(
          { error: (error as Error).message },
          { status: 400 }
        );
      }
    },

    async DELETE(req: NextRequest) {
      const session = await getSession();
      if (!session) return unauthorized();
      const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
      const id = typeof body.id === "string" ? body.id : null;
      if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
      try {
        await config.delegate.delete({ where: { id } });
        return NextResponse.json({ success: true });
      } catch (error) {
        return NextResponse.json(
          { error: (error as Error).message },
          { status: 400 }
        );
      }
    },
  };
}
