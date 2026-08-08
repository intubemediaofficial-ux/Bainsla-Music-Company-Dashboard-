import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(notifications);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = (await req.json()) as Record<string, unknown>;
  const title = typeof data.title === "string" ? data.title.trim() : "";
  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const notification = await prisma.notification.create({
    data: {
      userId: typeof data.userId === "string" && data.userId ? data.userId : session.id,
      title,
      message: typeof data.message === "string" ? data.message : null,
      type: typeof data.type === "string" ? data.type : null,
      relatedType: typeof data.relatedType === "string" ? data.relatedType : null,
      relatedId: typeof data.relatedId === "string" ? data.relatedId : null,
    },
  });
  return NextResponse.json(notification, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    id?: string;
    all?: boolean;
    isRead?: boolean;
  };
  const isRead = body.isRead ?? true;

  if (body.all) {
    const result = await prisma.notification.updateMany({
      where: { userId: session.id, isRead: !isRead },
      data: { isRead },
    });
    return NextResponse.json({ updated: result.count });
  }

  if (!body.id) {
    return NextResponse.json({ error: "id or all is required" }, { status: 400 });
  }

  const result = await prisma.notification.updateMany({
    where: { id: body.id, userId: session.id },
    data: { isRead },
  });
  return NextResponse.json({ updated: result.count });
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

  const result = await prisma.notification.deleteMany({
    where: { id: body.id, userId: session.id },
  });
  return NextResponse.json({ deleted: result.count });
}
