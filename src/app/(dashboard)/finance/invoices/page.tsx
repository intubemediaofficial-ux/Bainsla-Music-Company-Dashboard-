"use client";

import { FileText } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const INVOICE_TYPES = [
  "Client Invoice", "Song Sale Invoice", "License Invoice", "Studio Rental Invoice",
  "Promotion Service Invoice", "Distribution Invoice", "Royalty Invoice", "Other Invoice",
];

const INVOICE_STATUSES = [
  { value: "INV_DRAFT", label: "Draft" },
  { value: "INV_SENT", label: "Sent" },
  { value: "INV_VIEWED", label: "Viewed" },
  { value: "INV_PARTIALLY_PAID", label: "Partially Paid" },
  { value: "INV_PAID", label: "Paid" },
  { value: "INV_OVERDUE", label: "Overdue" },
  { value: "INV_CANCELLED", label: "Cancelled" },
  { value: "INV_REFUNDED", label: "Refunded" },
];

const fields: FieldDef[] = [
  { name: "invoiceType", label: "Invoice Type", type: "select", options: INVOICE_TYPES, required: true },
  { name: "invoiceDate", label: "Invoice Date", type: "date", required: true },
  { name: "dueDate", label: "Due Date", type: "date" },
  { name: "placeOfSupply", label: "Place of Supply", placeholder: "State" },
  { name: "subtotal", label: "Subtotal (₹)", type: "number", required: true, placeholder: "0.00" },
  { name: "discountAmount", label: "Discount (₹)", type: "number", placeholder: "0.00" },
  { name: "cgstAmount", label: "CGST (₹)", type: "number", placeholder: "0.00" },
  { name: "sgstAmount", label: "SGST (₹)", type: "number", placeholder: "0.00" },
  { name: "igstAmount", label: "IGST (₹)", type: "number", placeholder: "0.00" },
  { name: "paidAmount", label: "Paid Amount (₹)", type: "number", placeholder: "0.00" },
  { name: "status", label: "Status", type: "select", options: INVOICE_STATUSES, defaultValue: "INV_DRAFT" },
];

const columns: ColumnDef[] = [
  { key: "invoiceNumber", label: "Invoice No." },
  { key: "invoiceType", label: "Type" },
  { key: "invoiceDate", label: "Date", format: "date" },
  { key: "dueDate", label: "Due", format: "date" },
  { key: "taxableAmount", label: "Taxable", format: "currency" },
  { key: "totalGst", label: "GST", format: "currency" },
  { key: "grandTotal", label: "Grand Total", format: "currency" },
  { key: "paidAmount", label: "Paid", format: "currency" },
  { key: "balanceAmount", label: "Balance", format: "currency" },
  { key: "status", label: "Status", format: "enum" },
];

export default function InvoicesPage() {
  return (
    <ResourceManager
      title="Invoices"
      description="GST-compliant invoices for clients, licensing, studio rental & services"
      endpoint="/api/finance/invoices"
      addLabel="Create Invoice"
      icon={FileText}
      fields={fields}
      columns={columns}
      searchKeys={["invoiceNumber", "invoiceType", "status"]}
      emptyTitle="Invoice Manager"
      emptyDescription="Create GST invoices with CGST/SGST/IGST — taxable amount, total GST, grand total and balance are calculated automatically."
    />
  );
}
