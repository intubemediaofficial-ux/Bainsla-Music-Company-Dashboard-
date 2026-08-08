"use client";

import { IndianRupee } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const ENTRY_TYPES = [
  { value: "OUTPUT_GST", label: "Output GST (on sales)" },
  { value: "INPUT_GST", label: "Input GST (on purchases)" },
  { value: "GST_PAYMENT_ENTRY", label: "GST Payment" },
  { value: "GST_ADJUSTMENT", label: "GST Adjustment" },
];

const MONTHS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: new Date(2000, i, 1).toLocaleString("en-IN", { month: "long" }),
}));

const fields: FieldDef[] = [
  { name: "entryType", label: "Entry Type", type: "select", options: ENTRY_TYPES, required: true },
  { name: "gstType", label: "GST Type", type: "select", options: ["CGST+SGST", "IGST", "Exempt", "Nil Rated"] },
  { name: "taxableAmount", label: "Taxable Amount (₹)", type: "number", required: true, placeholder: "0.00" },
  { name: "cgstRate", label: "CGST Rate (%)", type: "number", placeholder: "9" },
  { name: "cgstAmount", label: "CGST Amount (₹)", type: "number", placeholder: "0.00" },
  { name: "sgstRate", label: "SGST Rate (%)", type: "number", placeholder: "9" },
  { name: "sgstAmount", label: "SGST Amount (₹)", type: "number", placeholder: "0.00" },
  { name: "igstRate", label: "IGST Rate (%)", type: "number", placeholder: "18" },
  { name: "igstAmount", label: "IGST Amount (₹)", type: "number", placeholder: "0.00" },
  { name: "gstMonth", label: "GST Month", type: "select", options: MONTHS },
  { name: "gstYear", label: "GST Year", type: "number", placeholder: "2026" },
  { name: "sourceModule", label: "Source", type: "select", options: ["Invoice", "Income", "Expense", "Manual"] },
  { name: "status", label: "Status", type: "select", options: ["pending", "filed", "paid"], defaultValue: "pending" },
];

const columns: ColumnDef[] = [
  { key: "entryType", label: "Entry", format: "enum" },
  { key: "gstType", label: "GST Type" },
  { key: "taxableAmount", label: "Taxable", format: "currency" },
  { key: "cgstAmount", label: "CGST", format: "currency" },
  { key: "sgstAmount", label: "SGST", format: "currency" },
  { key: "igstAmount", label: "IGST", format: "currency" },
  { key: "totalGst", label: "Total GST", format: "currency" },
  { key: "gstMonth", label: "Month", format: "number" },
  { key: "gstYear", label: "Year", format: "number" },
  { key: "status", label: "Status" },
];

export default function GstPage() {
  return (
    <ResourceManager
      title="GST & Tax"
      description="Output/input GST register, monthly filing status and tax payments"
      endpoint="/api/finance/gst"
      addLabel="Add GST Entry"
      icon={IndianRupee}
      fields={fields}
      columns={columns}
      searchKeys={["entryType", "gstType", "status"]}
      emptyTitle="GST Register"
      emptyDescription="Maintain output and input GST entries month-wise. Total GST is calculated from CGST, SGST and IGST automatically."
    />
  );
}
