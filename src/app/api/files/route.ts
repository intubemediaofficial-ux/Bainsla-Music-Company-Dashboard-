import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const relatedType = req.nextUrl.searchParams.get("relatedType");
  const relatedId = req.nextUrl.searchParams.get("relatedId");

  const files = await prisma.file.findMany({
    where: {
      ...(relatedType ? { relatedType } : {}),
      ...(relatedId ? { relatedId } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { uploadedBy: { select: { name: true } } },
  });
  return NextResponse.json(files);
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { id?: string };
  if (!body.id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await prisma.file.delete({ where: { id: body.id } });
  return NextResponse.json({ success: true });
}
