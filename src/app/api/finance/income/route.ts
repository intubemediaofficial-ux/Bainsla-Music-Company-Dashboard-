import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const incomes = await prisma.financeIncome.findMany({
    orderBy: { incomeDate: "desc" },
    take: 100,
  });
  return NextResponse.json(incomes);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!data.incomeTitle || typeof data.incomeTitle !== "string" || data.incomeTitle.trim().length === 0) {
    return NextResponse.json({ error: "incomeTitle is required" }, { status: 400 });
  }
  if (!data.amount || isNaN(parseFloat(data.amount))) {
    return NextResponse.json({ error: "valid amount is required" }, { status: 400 });
  }

  const incomeCode = `BM-INC-${Date.now()}`;
  const amount = parseFloat(data.amount);
  const gstAmount = data.gstAmount ? parseFloat(data.gstAmount) : 0;
  const tdsAmount = data.tdsAmount ? parseFloat(data.tdsAmount) : 0;
  const netAmount = amount + gstAmount - tdsAmount;

  const income = await prisma.financeIncome.create({
    data: {
      incomeCode,
      incomeTitle: data.incomeTitle,
      incomeSource: data.incomeSource || "OTHER",
      amount,
      gstAmount,
      tdsAmount,
      netAmount,
      currency: data.currency || "INR",
      incomeDate: data.incomeDate ? new Date(data.incomeDate) : new Date(),
      paymentMode: data.paymentMode || null,
      clientId: data.clientId || null,
      songId: data.songId || null,
      transactionId: data.transactionId || null,
      notes: data.notes || null,
      createdById: session.id,
    },
  });

  return NextResponse.json(income, { status: 201 });
}
