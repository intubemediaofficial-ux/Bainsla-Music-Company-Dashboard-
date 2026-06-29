import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const threads = await prisma.chatThread.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      participants: true,
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    take: 50,
  });
  return NextResponse.json(threads);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (data.action === "send_message") {
    if (!data.threadId || !data.messageText) {
      return NextResponse.json({ error: "threadId and messageText are required" }, { status: 400 });
    }

    const message = await prisma.chatMessage.create({
      data: {
        threadId: data.threadId,
        senderId: session.id,
        messageText: data.messageText,
        messageType: data.messageType || "TEXT",
        replyToMessageId: data.replyToMessageId || null,
      },
    });

    await prisma.chatThread.update({
      where: { id: data.threadId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(message, { status: 201 });
  }

  if (!data.threadTitle || typeof data.threadTitle !== "string") {
    return NextResponse.json({ error: "threadTitle is required" }, { status: 400 });
  }

  const thread = await prisma.chatThread.create({
    data: {
      threadTitle: data.threadTitle,
      threadType: data.threadType || "DIRECT",
      createdById: session.id,
      participants: {
        create: {
          userId: session.id,
        },
      },
    },
  });

  return NextResponse.json(thread, { status: 201 });
}
