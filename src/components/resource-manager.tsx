"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Loader2, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  humanizeEnum,
} from "@/lib/format";

export type FieldOption = { value: string; label: string };

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "number" | "date" | "select" | "textarea" | "checkbox" | "file";
  options?: (string | FieldOption)[];
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  /** Grid width in columns (of 3). */
  span?: 1 | 2 | 3;
};

export type ColumnDef = {
  key: string;
  label: string;
  format?: "currency" | "date" | "datetime" | "enum" | "text" | "number";
};

export type ResourceRow = Record<string, unknown> & { id: string };

type Props = {
  title: string;
  description?: string;
  endpoint: string;
  fields: FieldDef[];
  columns: ColumnDef[];
  icon?: LucideIcon;
  addLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  searchKeys?: string[];
  /** Rendered above the table, e.g. summary cards. */
  summary?: (rows: ResourceRow[]) => React.ReactNode;
};

function toOption(option: string | FieldOption): FieldOption {
  return typeof option === "string" ? { value: option, label: option } : option;
}

function renderCell(row: ResourceRow, column: ColumnDef): string {
  const value = column.key.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, row);

  switch (column.format) {
    case "currency":
      return formatCurrency(value);
    case "date":
      return formatDate(value);
    case "datetime":
      return formatDateTime(value);
    case "enum":
      return humanizeEnum(value);
    case "number":
      return value === null || value === undefined ? "—" : String(value);
    default:
      return value === null || value === undefined || value === ""
        ? "—"
        : String(value);
  }
}

export function ResourceManager({
  title,
  description,
  endpoint,
  fields,
  columns,
  icon: Icon,
  addLabel,
  emptyTitle,
  emptyDescription,
  searchKeys,
  summary,
}: Props) {
  const [rows, setRows] = useState<ResourceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      if (!res.ok) throw new Error("Could not load records");
      const data = (await res.json()) as ResourceRow[];
      setRows(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const keys = searchKeys ?? columns.map((c) => c.key);
    const needle = query.toLowerCase();
    return rows.filter((row) =>
      keys.some((key) => String(row[key] ?? "").toLowerCase().includes(needle))
    );
  }, [rows, query, searchKeys, columns]);

  async function uploadFile(file: File): Promise<string | null> {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/files/upload", { method: "POST", body });
    if (!res.ok) return null;
    const data = (await res.json()) as { id?: string };
    return data.id ?? null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, unknown> = {};

    for (const field of fields) {
      const raw = formData.get(field.name);
      if (field.type === "file") {
        if (raw instanceof File && raw.size > 0) {
          const fileId = await uploadFile(raw);
          if (fileId) payload[field.name] = fileId;
        }
        continue;
      }
      if (field.type === "checkbox") {
        payload[field.name] = raw === "on";
        continue;
      }
      if (typeof raw === "string" && raw !== "") payload[field.name] = raw;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Could not save record");
      }
      form.reset();
      setShowForm(false);
      await load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setError(null);
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Could not delete record");
      return;
    }
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => void load()}>
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button onClick={() => setShowForm((v) => !v)} className="gap-2">
            <Plus className="h-4 w-4" /> {addLabel ?? "Add New"}
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search records..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Badge variant="secondary" className="h-9 px-3 text-sm">
          {filtered.length} records
        </Badge>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{addLabel ?? "Add New"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {fields.map((field) => {
                const spanClass =
                  field.span === 3
                    ? "md:col-span-2 lg:col-span-3"
                    : field.span === 2
                      ? "md:col-span-2"
                      : "";
                return (
                  <div key={field.name} className={spanClass}>
                    <label className="text-sm font-medium" htmlFor={field.name}>
                      {field.label}
                      {field.required ? " *" : ""}
                    </label>
                    {field.type === "select" ? (
                      <select
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        defaultValue={field.defaultValue ?? ""}
                        className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                      >
                        <option value="">Select {field.label}</option>
                        {(field.options ?? []).map(toOption).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="min-h-[60px] w-full rounded-md border bg-background px-3 py-2 text-sm"
                      />
                    ) : field.type === "checkbox" ? (
                      <div className="flex h-9 items-center">
                        <input
                          id={field.name}
                          name={field.name}
                          type="checkbox"
                          className="h-4 w-4"
                        />
                      </div>
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type ?? "text"}
                        placeholder={field.placeholder}
                        required={field.required}
                        defaultValue={field.defaultValue}
                      />
                    )}
                  </div>
                );
              })}
              <div className="flex gap-3 md:col-span-2 lg:col-span-3">
                <Button type="submit" disabled={saving} className="gap-2">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? "Saving..." : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {summary && rows.length > 0 && summary(rows)}

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center">
              {Icon && (
                <Icon className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
              )}
              <h3 className="mb-1 font-medium">{emptyTitle ?? title}</h3>
              {emptyDescription && (
                <p className="mx-auto mb-4 max-w-xl text-sm text-muted-foreground">
                  {emptyDescription}
                </p>
              )}
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" /> {addLabel ?? "Add New"}
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/40">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="px-4 py-3 text-left font-medium text-muted-foreground"
                      >
                        {column.label}
                      </th>
                    ))}
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id} className="border-b last:border-0">
                      {columns.map((column) => (
                        <td key={column.key} className="px-4 py-3">
                          {renderCell(row, column)}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Delete record"
                          onClick={() => void handleDelete(row.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
