import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const invoices = await prisma.financeInvoice.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
      receipts: true,
    },
    take: 100,
  });
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!data.invoiceType || typeof data.invoiceType !== "string") {
    return NextResponse.json({ error: "invoiceType is required" }, { status: 400 });
  }
  if (!data.subtotal || isNaN(parseFloat(data.subtotal))) {
    return NextResponse.json({ error: "valid subtotal is required" }, { status: 400 });
  }

  const invoiceNumber = `BM-INV-${Date.now()}`;
  const subtotal = parseFloat(data.subtotal);
  const discountAmount = data.discountAmount ? parseFloat(data.discountAmount) : 0;
  const taxableAmount = subtotal - discountAmount;
  const cgstAmount = data.cgstAmount ? parseFloat(data.cgstAmount) : 0;
  const sgstAmount = data.sgstAmount ? parseFloat(data.sgstAmount) : 0;
  const igstAmount = data.igstAmount ? parseFloat(data.igstAmount) : 0;
  const totalGst = cgstAmount + sgstAmount + igstAmount;
  const grandTotal = taxableAmount + totalGst;

  const invoice = await prisma.financeInvoice.create({
    data: {
      invoiceNumber,
      invoiceType: data.invoiceType,
      clientId: data.clientId || null,
      invoiceDate: data.invoiceDate ? new Date(data.invoiceDate) : new Date(),
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      placeOfSupply: data.placeOfSupply || null,
      subtotal,
      discountAmount,
      taxableAmount,
      cgstAmount,
      sgstAmount,
      igstAmount,
      totalGst,
      grandTotal,
      balanceAmount: grandTotal,
      createdById: session.id,
    },
  });

  return NextResponse.json(invoice, { status: 201 });
}
