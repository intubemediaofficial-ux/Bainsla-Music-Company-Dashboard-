import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { songsAsSinger: true, songParticipants: true } },
    },
  });
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  if (!data.clientType || typeof data.clientType !== "string") {
    return NextResponse.json({ error: "clientType is required" }, { status: 400 });
  }

  const client = await prisma.client.create({
    data: {
      clientType: data.clientType,
      name: data.name,
      stageName: data.stageName || null,
      phone: data.phone || null,
      whatsappNumber: data.whatsappNumber || null,
      email: data.email || null,
      address: data.address || null,
      city: data.city || null,
      state: data.state || null,
      country: data.country || "India",
      aadhaarNumber: data.aadhaarNumber || null,
      panNumber: data.panNumber || null,
      gstNumber: data.gstNumber || null,
      bankName: data.bankName || null,
      accountNumber: data.accountNumber || null,
      ifsc: data.ifsc || null,
      upiId: data.upiId || null,
      revenueSharePercentage: data.revenueSharePercentage
        ? parseFloat(data.revenueSharePercentage)
        : null,
      advanceAmount: data.advanceAmount ? parseFloat(data.advanceAmount) : 0,
      notes: data.notes || null,
      createdById: session.id,
    },
  });

  return NextResponse.json(client, { status: 201 });
}
