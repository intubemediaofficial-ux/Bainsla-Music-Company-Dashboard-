"use client";

import { Receipt } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const PAYMENT_MODES = ["Bank Transfer", "UPI", "Cash", "Cheque", "Wallet", "Online Gateway", "Other"];

const fields: FieldDef[] = [
  { name: "receiptDate", label: "Receipt Date", type: "date", required: true },
  { name: "amountReceived", label: "Amount Received (₹)", type: "number", required: true, placeholder: "0.00" },
  { name: "paymentMode", label: "Payment Mode", type: "select", options: PAYMENT_MODES },
  { name: "invoiceId", label: "Invoice ID", placeholder: "Linked invoice (optional)" },
  { name: "clientId", label: "Client ID", placeholder: "Linked client (optional)" },
  { name: "transactionId", label: "Transaction ID", placeholder: "Bank / UPI reference" },
  { name: "balanceAmount", label: "Balance After (₹)", type: "number", placeholder: "0.00" },
  { name: "purpose", label: "Purpose", span: 2, placeholder: "Received against..." },
];

const columns: ColumnDef[] = [
  { key: "receiptNumber", label: "Receipt No." },
  { key: "receiptDate", label: "Date", format: "date" },
  { key: "amountReceived", label: "Received", format: "currency" },
  { key: "paymentMode", label: "Mode" },
  { key: "balanceAmount", label: "Balance", format: "currency" },
  { key: "purpose", label: "Purpose" },
];

export default function ReceiptsPage() {
  return (
    <ResourceManager
      title="Receipts"
      description="Payment receipts against invoices, advances and client payments"
      endpoint="/api/finance/receipts"
      addLabel="Create Receipt"
      icon={Receipt}
      fields={fields}
      columns={columns}
      searchKeys={["receiptNumber", "purpose", "paymentMode"]}
      emptyTitle="Receipt Manager"
      emptyDescription="Issue numbered receipts for every payment received — linked to invoices and clients."
    />
  );
}
