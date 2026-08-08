"use client";

import { TrendingUp } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const INCOME_SOURCES = [
  "YouTube Revenue", "YouTube CMS Revenue", "YouTube Content ID Revenue",
  "Facebook Revenue", "Instagram Revenue", "Spotify Revenue", "Apple Music Revenue",
  "JioSaavn Revenue", "Wynk Revenue", "Gaana Revenue", "Amazon Music Revenue",
  "Distribution Revenue", "Client Payment", "Song Sale", "Music License Fee",
  "Copyright Claim Recovery", "DMCA Settlement", "Channel Sale Income",
  "Promotion Service Income", "Studio Rental Income", "Ad Revenue",
  "Sponsorship Income", "Royalty Income", "Advance Received", "Other Income",
];

const PAYMENT_MODES = ["Bank Transfer", "UPI", "Cash", "Cheque", "Wallet", "Online Gateway", "Other"];

const INCOME_STATUSES = [
  { value: "INCOME_DRAFT", label: "Draft" },
  { value: "INCOME_PENDING", label: "Pending" },
  { value: "INCOME_RECEIVED", label: "Received" },
  { value: "PARTIALLY_RECEIVED", label: "Partially Received" },
  { value: "INCOME_CANCELLED", label: "Cancelled" },
  { value: "INCOME_REFUNDED", label: "Refunded" },
  { value: "INCOME_ADJUSTED", label: "Adjusted" },
  { value: "INCOME_UNDER_REVIEW", label: "Under Review" },
];

const fields: FieldDef[] = [
  { name: "incomeTitle", label: "Income Title", required: true, placeholder: "Title for this income" },
  { name: "incomeSource", label: "Income Source", type: "select", options: INCOME_SOURCES, required: true },
  { name: "amount", label: "Amount (₹)", type: "number", required: true, placeholder: "0.00" },
  { name: "incomeDate", label: "Income Date", type: "date", required: true },
  { name: "receivedDate", label: "Received Date", type: "date" },
  { name: "paymentMode", label: "Payment Mode", type: "select", options: PAYMENT_MODES },
  { name: "gstAmount", label: "GST Amount (₹)", type: "number", placeholder: "0.00" },
  { name: "tdsAmount", label: "TDS Deducted (₹)", type: "number", placeholder: "0.00" },
  { name: "status", label: "Status", type: "select", options: INCOME_STATUSES, defaultValue: "INCOME_PENDING" },
  { name: "transactionId", label: "Transaction ID", placeholder: "Bank transaction ID" },
  { name: "referenceNumber", label: "Reference Number", placeholder: "Reference" },
  { name: "notes", label: "Notes", type: "textarea", span: 3, placeholder: "Additional notes..." },
];

const columns: ColumnDef[] = [
  { key: "incomeCode", label: "Code" },
  { key: "incomeTitle", label: "Title" },
  { key: "incomeSource", label: "Source" },
  { key: "amount", label: "Amount", format: "currency" },
  { key: "gstAmount", label: "GST", format: "currency" },
  { key: "tdsAmount", label: "TDS", format: "currency" },
  { key: "netAmount", label: "Net", format: "currency" },
  { key: "incomeDate", label: "Date", format: "date" },
  { key: "status", label: "Status", format: "enum" },
];

export default function IncomeManagementPage() {
  return (
    <ResourceManager
      title="Income Management"
      description="Track all income sources — YouTube, Spotify, clients, licensing & more"
      endpoint="/api/finance/income"
      addLabel="Add Income"
      icon={TrendingUp}
      fields={fields}
      columns={columns}
      searchKeys={["incomeCode", "incomeTitle", "incomeSource", "status"]}
      emptyTitle="Income Tracking"
      emptyDescription="Record income from YouTube, Spotify, Apple Music, JioSaavn, client payments, song sales, royalties, and all other revenue sources. GST & TDS handled automatically."
    />
  );
}
