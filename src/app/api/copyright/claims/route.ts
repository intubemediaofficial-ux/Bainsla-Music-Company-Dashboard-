import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const claims = await prisma.copyrightClaim.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(claims);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!data.claimType || typeof data.claimType !== "string") {
    return NextResponse.json({ error: "claimType is required" }, { status: 400 });
  }

  const claim = await prisma.copyrightClaim.create({
    data: {
      claimType: data.claimType || "AUDIO_CLAIM",
      platform: data.platform || "YouTube",
      caseId: data.caseId || null,
      assetId: data.assetId || null,
      claimReferenceId: data.claimReferenceId || null,
      targetUrl: data.targetUrl || null,
      targetVideoId: data.targetVideoId || null,
      targetChannelId: data.targetChannelId || null,
      claimReason: data.claimReason || null,
      claimText: data.claimText || null,
      submittedById: session.id,
      submittedAt: new Date(),
    },
  });

  return NextResponse.json(claim, { status: 201 });
}
