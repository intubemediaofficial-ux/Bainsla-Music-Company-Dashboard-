"use client";

import { Building2 } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const ACCOUNT_TYPES = [
  { value: "BANK", label: "Bank Account" },
  { value: "CASH", label: "Cash" },
  { value: "WALLET", label: "Wallet" },
  { value: "PAYMENT_GATEWAY", label: "Payment Gateway" },
  { value: "PLATFORM_WALLET", label: "Platform Wallet" },
];

const fields: FieldDef[] = [
  { name: "accountType", label: "Account Type", type: "select", options: ACCOUNT_TYPES, required: true },
  { name: "accountName", label: "Account Name", required: true, placeholder: "e.g. Bainsla Music Current A/c" },
  { name: "bankName", label: "Bank Name", placeholder: "Bank name" },
  { name: "accountNumber", label: "Account Number", placeholder: "Account number" },
  { name: "ifscCode", label: "IFSC Code", placeholder: "IFSC" },
  { name: "upiId", label: "UPI ID", placeholder: "name@upi" },
  { name: "walletProvider", label: "Wallet Provider", placeholder: "Paytm / PhonePe / Razorpay" },
  { name: "openingBalance", label: "Opening Balance (₹)", type: "number", placeholder: "0.00" },
  { name: "status", label: "Status", type: "select", options: ["active", "inactive"], defaultValue: "active" },
];

const columns: ColumnDef[] = [
  { key: "accountName", label: "Account" },
  { key: "accountType", label: "Type", format: "enum" },
  { key: "bankName", label: "Bank" },
  { key: "accountNumber", label: "A/c Number" },
  { key: "upiId", label: "UPI" },
  { key: "openingBalance", label: "Opening", format: "currency" },
  { key: "currentBalance", label: "Current", format: "currency" },
  { key: "status", label: "Status" },
];

export default function BankingPage() {
  return (
    <ResourceManager
      title="Banking & Wallets"
      description="Company bank accounts, cash books, UPI and payment gateway wallets"
      endpoint="/api/finance/accounts"
      addLabel="Add Account"
      icon={Building2}
      fields={fields}
      columns={columns}
      searchKeys={["accountName", "bankName", "accountType"]}
      emptyTitle="Banking"
      emptyDescription="Add every bank account, cash box, UPI handle and gateway wallet so income and expenses can be mapped to a real account."
    />
  );
}
