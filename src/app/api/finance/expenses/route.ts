import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const expenses = await prisma.financeExpense.findMany({
    orderBy: { expenseDate: "desc" },
    take: 100,
  });
  return NextResponse.json(expenses);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!data.expenseTitle || typeof data.expenseTitle !== "string" || data.expenseTitle.trim().length === 0) {
    return NextResponse.json({ error: "expenseTitle is required" }, { status: 400 });
  }
  if (!data.amount || isNaN(parseFloat(data.amount))) {
    return NextResponse.json({ error: "valid amount is required" }, { status: 400 });
  }

  const expenseCode = `BM-EXP-${Date.now()}`;
  const amount = parseFloat(data.amount);
  const gstAmount = data.gstAmount ? parseFloat(data.gstAmount) : 0;
  const tdsAmount = data.tdsAmount ? parseFloat(data.tdsAmount) : 0;
  const netAmount = amount + gstAmount - tdsAmount;

  const expense = await prisma.financeExpense.create({
    data: {
      expenseCode,
      expenseTitle: data.expenseTitle,
      expenseCategory: data.expenseCategory || "OTHER",
      amount,
      gstAmount,
      tdsAmount,
      netAmount,
      expenseDate: data.expenseDate ? new Date(data.expenseDate) : new Date(),
      vendorId: data.vendorId || null,
      artistId: data.artistId || null,
      songId: data.songId || null,
      paymentMode: data.paymentMode || null,
      billNumber: data.billNumber || null,
      notes: data.notes || null,
      createdById: session.id,
    },
  });

  return NextResponse.json(expense, { status: 201 });
}
