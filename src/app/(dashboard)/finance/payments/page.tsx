"use client";

import { CreditCard } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const PAYMENT_TYPES = [
  { value: "ARTIST_PAYMENT", label: "Artist Payment" },
  { value: "STUDIO_PAYMENT", label: "Studio Payment" },
  { value: "VENDOR_PAYMENT", label: "Vendor Payment" },
  { value: "SALARY_PAYMENT", label: "Salary Payment" },
  { value: "ROYALTY_PAYMENT", label: "Royalty Payment" },
  { value: "ADVANCE_PAYMENT", label: "Advance Payment" },
  { value: "SETTLEMENT_PAYMENT", label: "Settlement Payment" },
  { value: "REFUND_PAYMENT", label: "Refund Payment" },
];

const PAYEE_TYPES = ["Artist", "Singer", "Lyricist", "Composer", "Musician", "Studio", "Vendor", "Staff", "Client", "Other"];
const PAYMENT_MODES = ["Bank Transfer", "UPI", "Cash", "Cheque", "Wallet", "Online Gateway", "Other"];

const fields: FieldDef[] = [
  { name: "paymentType", label: "Payment Type", type: "select", options: PAYMENT_TYPES, required: true },
  { name: "payeeType", label: "Payee Type", type: "select", options: PAYEE_TYPES, required: true },
  { name: "payeeId", label: "Payee ID", placeholder: "Client / staff id (optional)" },
  { name: "grossAmount", label: "Gross Amount (₹)", type: "number", required: true, placeholder: "0.00" },
  { name: "tdsAmount", label: "TDS (₹)", type: "number", placeholder: "0.00" },
  { name: "gstAmount", label: "GST (₹)", type: "number", placeholder: "0.00" },
  { name: "paidAmount", label: "Paid Amount (₹)", type: "number", placeholder: "0.00" },
  { name: "dueDate", label: "Due Date", type: "date" },
  { name: "paidDate", label: "Paid Date", type: "date" },
  { name: "paymentMode", label: "Payment Mode", type: "select", options: PAYMENT_MODES },
  { name: "status", label: "Status", type: "select", options: ["pending", "partial", "paid", "cancelled"], defaultValue: "pending" },
];

const columns: ColumnDef[] = [
  { key: "paymentCode", label: "Code" },
  { key: "paymentType", label: "Type", format: "enum" },
  { key: "payeeType", label: "Payee" },
  { key: "grossAmount", label: "Gross", format: "currency" },
  { key: "tdsAmount", label: "TDS", format: "currency" },
  { key: "netAmount", label: "Net", format: "currency" },
  { key: "paidAmount", label: "Paid", format: "currency" },
  { key: "pendingAmount", label: "Pending", format: "currency" },
  { key: "dueDate", label: "Due", format: "date" },
  { key: "status", label: "Status", format: "enum" },
];

export default function FinancePaymentsPage() {
  return (
    <ResourceManager
      title="Payments"
      description="Artist, studio, vendor, salary & royalty payouts with TDS tracking"
      endpoint="/api/finance/payments"
      addLabel="Add Payment"
      icon={CreditCard}
      fields={fields}
      columns={columns}
      searchKeys={["paymentCode", "paymentType", "payeeType", "status"]}
      emptyTitle="Payment Manager"
      emptyDescription="Track every payout — net amount and pending balance are calculated from gross, GST and TDS automatically."
    />
  );
}
