import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payments = await prisma.financePayment.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(payments);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!data.paymentType || typeof data.paymentType !== "string") {
    return NextResponse.json({ error: "paymentType is required" }, { status: 400 });
  }
  if (!data.grossAmount || isNaN(parseFloat(data.grossAmount))) {
    return NextResponse.json({ error: "valid grossAmount is required" }, { status: 400 });
  }

  const paymentCode = `BM-PAY-${Date.now()}`;
  const grossAmount = parseFloat(data.grossAmount);
  const tdsAmount = data.tdsAmount ? parseFloat(data.tdsAmount) : 0;
  const gstAmount = data.gstAmount ? parseFloat(data.gstAmount) : 0;
  const netAmount = grossAmount - tdsAmount + gstAmount;

  const payment = await prisma.financePayment.create({
    data: {
      paymentCode,
      paymentType: data.paymentType,
      payeeType: data.payeeType || "ARTIST",
      payeeId: data.payeeId || null,
      songId: data.songId || null,
      grossAmount,
      tdsAmount,
      gstAmount,
      netAmount,
      pendingAmount: netAmount,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      paymentMode: data.paymentMode || null,
      createdById: session.id,
    },
  });

  return NextResponse.json(payment, { status: 201 });
}
