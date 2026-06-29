import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const assets = await prisma.copyrightAsset.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      song: { select: { id: true, songTitle: true } },
      primaryArtist: { select: { id: true, name: true } },
    },
    take: 100,
  });
  return NextResponse.json(assets);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!data.assetTitle || typeof data.assetTitle !== "string") {
    return NextResponse.json({ error: "assetTitle is required" }, { status: 400 });
  }

  const assetCode = `BM-CR-${Date.now()}`;

  const asset = await prisma.copyrightAsset.create({
    data: {
      assetCode,
      assetTitle: data.assetTitle,
      assetType: data.assetType || "SOUND_RECORDING",
      songId: data.songId || null,
      primaryArtistId: data.primaryArtistId || null,
      language: data.language || null,
      genre: data.genre || null,
      labelName: data.labelName || null,
      createdById: session.id,
    },
  });

  return NextResponse.json(asset, { status: 201 });
}
