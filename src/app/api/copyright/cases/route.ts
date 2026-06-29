import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cases = await prisma.copyrightCase.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      assignedTo: { select: { id: true, name: true } },
    },
    take: 100,
  });
  return NextResponse.json(cases);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!data.caseTitle || typeof data.caseTitle !== "string") {
    return NextResponse.json({ error: "caseTitle is required" }, { status: 400 });
  }

  const caseCode = `BM-CASE-${Date.now()}`;

  const copyrightCase = await prisma.copyrightCase.create({
    data: {
      caseCode,
      caseTitle: data.caseTitle,
      caseType: data.caseType || "INFRINGEMENT",
      priority: data.priority || "NORMAL",
      caseDescription: data.description || null,
      infringerName: data.infringerName || null,
      platform: data.platform || null,
      infringingUrl: data.infringingUrl || null,
      assetId: data.assetId || null,
      assignedToId: data.assignedToId || null,
      createdById: session.id,
    },
  });

  return NextResponse.json(copyrightCase, { status: 201 });
}
