"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FileText,
  FolderOpen,
  Image as ImageIcon,
  Loader2,
  Music,
  Search,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/format";

type FileRow = {
  id: string;
  fileName: string;
  fileType: string | null;
  fileUrl: string;
  fileSize: number | null;
  tags: string[];
  createdAt: string;
  uploadedBy?: { name: string } | null;
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "audio", label: "Audio" },
  { key: "video", label: "Video" },
  { key: "image", label: "Images" },
  { key: "document", label: "Documents" },
];

function matchesFilter(file: FileRow, filter: string): boolean {
  const type = `${file.fileType ?? ""} ${file.fileName}`.toLowerCase();
  switch (filter) {
    case "audio":
      return /audio|mp3|wav|flac|m4a/.test(type);
    case "video":
      return /video|mp4|mov|mkv|webm/.test(type);
    case "image":
      return /image|jpg|jpeg|png|webp|gif/.test(type);
    case "document":
      return /pdf|doc|docx|xls|xlsx|zip|text/.test(type);
    default:
      return true;
  }
}

function formatSize(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon({ file }: { file: FileRow }) {
  const type = `${file.fileType ?? ""} ${file.fileName}`.toLowerCase();
  if (/audio|mp3|wav/.test(type)) return <Music className="h-4 w-4 text-purple-500" />;
  if (/video|mp4|mov/.test(type)) return <Video className="h-4 w-4 text-blue-500" />;
  if (/image|jpg|jpeg|png|webp/.test(type))
    return <ImageIcon className="h-4 w-4 text-green-500" />;
  return <FileText className="h-4 w-4 text-gray-500" />;
}

export default function FilesPage() {
  const [files, setFiles] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/files", { cache: "no-store" });
      if (!res.ok) throw new Error("Could not load files");
      setFiles((await res.json()) as FileRow[]);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);

  const visible = useMemo(
    () =>
      files.filter(
        (file) =>
          matchesFilter(file, filter) &&
          file.fileName.toLowerCase().includes(query.toLowerCase())
      ),
    [files, filter, query]
  );

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    if (selected.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of selected) {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/files/upload", { method: "POST", body });
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(data.error ?? `Could not upload ${file.name}`);
        }
      }
      await load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch("/api/files", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      setError("Could not delete file");
      return;
    }
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">File Manager</h1>
          <p className="text-muted-foreground">
            All uploaded files — audio, video, images, documents
          </p>
        </div>
        <div>
          <input
            ref={inputRef}
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
          <Button
            className="gap-2"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? "Uploading..." : "Upload File"}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {FILTERS.map((item) => (
          <Button
            key={item.key}
            variant={filter === item.key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <Card>
          <CardContent className="flex items-center justify-center gap-2 p-8 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading files...
          </CardContent>
        </Card>
      ) : visible.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FolderOpen className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-1 font-medium">No Files Yet</h3>
            <p className="text-sm text-muted-foreground">
              Upload audio files, videos, thumbnails, agreements and documents.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Supported: MP3, WAV, MP4, JPG, PNG, PDF, DOCX, ZIP (max 25 MB)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">File</th>
                  <th className="p-3 text-left font-medium">Type</th>
                  <th className="p-3 text-left font-medium">Size</th>
                  <th className="p-3 text-left font-medium">Tags</th>
                  <th className="p-3 text-left font-medium">Uploaded By</th>
                  <th className="p-3 text-left font-medium">Date</th>
                  <th className="p-3" />
                </tr>
              </thead>
              <tbody>
                {visible.map((file) => (
                  <tr key={file.id} className="border-b hover:bg-muted/30">
                    <td className="p-3">
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:underline"
                      >
                        <FileIcon file={file} />
                        <span className="max-w-[240px] truncate">
                          {file.fileName}
                        </span>
                      </a>
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {file.fileType || "—"}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {formatSize(file.fileSize)}
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {file.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {file.uploadedBy?.name || "—"}
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">
                      {formatDateTime(file.createdAt)}
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete file"
                        onClick={() => void handleDelete(file.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
