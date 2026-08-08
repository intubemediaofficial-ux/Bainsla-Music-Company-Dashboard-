"use client";

import { TrendingDown } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const EXPENSE_CATEGORIES = [
  "Studio Recording", "Mixing & Mastering", "Video Shoot", "Video Editing",
  "Artwork & Thumbnail", "Artist Payment", "Singer Payment", "Lyricist Payment",
  "Composer Payment", "Musician Payment", "Dancer Payment", "Location Rent",
  "Equipment Rent", "Travel & Transport", "Food & Hospitality", "Costume & Makeup",
  "Promotion & Ads", "Distribution Fee", "Legal & Copyright", "Software & Tools",
  "Office Expense", "Salary", "Internet & Utilities", "Bank Charges", "Tax Payment",
  "Other Expense",
];

const PAYMENT_MODES = ["Bank Transfer", "UPI", "Cash", "Cheque", "Wallet", "Online Gateway", "Other"];

const APPROVAL_STATUSES = [
  { value: "EXPENSE_DRAFT", label: "Draft" },
  { value: "PENDING_APPROVAL", label: "Pending Approval" },
  { value: "EXPENSE_APPROVED", label: "Approved" },
  { value: "EXPENSE_REJECTED", label: "Rejected" },
  { value: "EXPENSE_PAID", label: "Paid" },
  { value: "PARTIALLY_PAID", label: "Partially Paid" },
  { value: "EXPENSE_CANCELLED", label: "Cancelled" },
  { value: "EXPENSE_ADJUSTED", label: "Adjusted" },
];

const fields: FieldDef[] = [
  { name: "expenseTitle", label: "Expense Title", required: true, placeholder: "What was this expense for" },
  { name: "expenseCategory", label: "Category", type: "select", options: EXPENSE_CATEGORIES, required: true },
  { name: "amount", label: "Amount (₹)", type: "number", required: true, placeholder: "0.00" },
  { name: "expenseDate", label: "Expense Date", type: "date", required: true },
  { name: "paidDate", label: "Paid Date", type: "date" },
  { name: "paymentMode", label: "Payment Mode", type: "select", options: PAYMENT_MODES },
  { name: "gstAmount", label: "GST Amount (₹)", type: "number", placeholder: "0.00" },
  { name: "tdsAmount", label: "TDS Deducted (₹)", type: "number", placeholder: "0.00" },
  { name: "approvalStatus", label: "Approval Status", type: "select", options: APPROVAL_STATUSES, defaultValue: "EXPENSE_DRAFT" },
  { name: "paymentStatus", label: "Payment Status", type: "select", options: ["unpaid", "partial", "paid"] },
  { name: "billNumber", label: "Bill Number", placeholder: "Bill / voucher number" },
  { name: "referenceNumber", label: "Reference Number", placeholder: "Reference" },
  { name: "notes", label: "Notes", type: "textarea", span: 3, placeholder: "Additional notes..." },
];

const columns: ColumnDef[] = [
  { key: "expenseCode", label: "Code" },
  { key: "expenseTitle", label: "Title" },
  { key: "expenseCategory", label: "Category" },
  { key: "amount", label: "Amount", format: "currency" },
  { key: "gstAmount", label: "GST", format: "currency" },
  { key: "netAmount", label: "Net", format: "currency" },
  { key: "expenseDate", label: "Date", format: "date" },
  { key: "approvalStatus", label: "Approval", format: "enum" },
  { key: "paymentStatus", label: "Payment", format: "enum" },
];

export default function ExpenseManagementPage() {
  return (
    <ResourceManager
      title="Expense Management"
      description="Studio, artists, video shoots, promotion, salary & every other company expense"
      endpoint="/api/finance/expenses"
      addLabel="Add Expense"
      icon={TrendingDown}
      fields={fields}
      columns={columns}
      searchKeys={["expenseCode", "expenseTitle", "expenseCategory", "approvalStatus"]}
      emptyTitle="Expense Tracking"
      emptyDescription="Record every company expense with category, GST, TDS and approval workflow — studio recording, artist payments, video shoots, promotion, salary and more."
    />
  );
}
