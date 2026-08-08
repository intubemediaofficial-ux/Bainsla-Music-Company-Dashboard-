import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

function uploadDir(): string {
  return process.env.UPLOAD_DIR ?? path.join(process.cwd(), "public", "uploads");
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File is larger than 25 MB" },
      { status: 400 }
    );
  }

  const extension = path.extname(file.name).slice(0, 12);
  const storedName = `${randomUUID()}${extension}`;
  const directory = uploadDir();
  await mkdir(directory, { recursive: true });
  await writeFile(
    path.join(directory, storedName),
    Buffer.from(await file.arrayBuffer())
  );

  const relatedType = formData.get("relatedType");
  const relatedId = formData.get("relatedId");
  const songId = formData.get("songId");
  const tags = formData.get("tags");

  const record = await prisma.file.create({
    data: {
      fileName: file.name,
      fileType: file.type || null,
      fileUrl: `/uploads/${storedName}`,
      fileSize: file.size,
      relatedType: typeof relatedType === "string" ? relatedType : null,
      relatedId: typeof relatedId === "string" ? relatedId : null,
      songId: typeof songId === "string" && songId ? songId : null,
      tags:
        typeof tags === "string" && tags
          ? tags.split(",").map((tag) => tag.trim()).filter(Boolean)
          : [],
      uploadedById: session.id,
    },
  });

  return NextResponse.json(record, { status: 201 });
}
