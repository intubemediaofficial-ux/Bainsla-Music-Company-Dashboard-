import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { ADMIN_ROLES, getSession, hasPermission } from "@/lib/auth";

const SELECT = {
  id: true,
  name: true,
  email: true,
  phone: true,
  role: true,
  status: true,
  clientId: true,
  lastLogin: true,
  createdAt: true,
};

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: SELECT,
  });
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasPermission(session.role, ADMIN_ROLES)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data = (await req.json()) as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const password = typeof data.password === "string" ? data.password : "";
  const role = typeof data.role === "string" ? data.role : "";

  if (!name || !email || !role) {
    return NextResponse.json(
      { error: "name, email and role are required" },
      { status: 400 }
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { error: "password must be at least 6 characters" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "A user with this email already exists" },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone: typeof data.phone === "string" && data.phone ? data.phone : null,
      role: role as never,
      passwordHash: await bcrypt.hash(password, 10),
      status: typeof data.status === "string" && data.status ? data.status : "active",
      clientId:
        typeof data.clientId === "string" && data.clientId ? data.clientId : null,
    },
    select: SELECT,
  });

  return NextResponse.json(user, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasPermission(session.role, ADMIN_ROLES)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data = (await req.json()) as Record<string, unknown>;
  if (typeof data.id !== "string") {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: data.id },
    data: {
      ...(typeof data.name === "string" ? { name: data.name } : {}),
      ...(typeof data.phone === "string" ? { phone: data.phone } : {}),
      ...(typeof data.role === "string" ? { role: data.role as never } : {}),
      ...(typeof data.status === "string" ? { status: data.status } : {}),
      ...(typeof data.clientId === "string" ? { clientId: data.clientId } : {}),
      ...(typeof data.password === "string" && data.password.length >= 6
        ? { passwordHash: await bcrypt.hash(data.password, 10) }
        : {}),
    },
    select: SELECT,
  });

  return NextResponse.json(user);
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasPermission(session.role, ADMIN_ROLES)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as { id?: string };
  if (!body.id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }
  if (body.id === session.id) {
    return NextResponse.json(
      { error: "You cannot delete your own account" },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: { id: body.id },
    data: { status: "disabled" },
  });
  return NextResponse.json({ success: true });
}
