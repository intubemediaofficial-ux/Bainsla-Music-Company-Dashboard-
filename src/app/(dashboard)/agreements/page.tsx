"use client";

import { FileText } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const AGREEMENT_TYPES = [
  "Singer Agreement", "Lyricist Agreement", "Composer Agreement", "Musician Agreement",
  "Studio Agreement", "Video Production Agreement", "Rights Assignment", "License Agreement",
  "Distribution Agreement", "Revenue Share Agreement", "NDA", "Other",
];

const fields: FieldDef[] = [
  { name: "agreementTitle", label: "Agreement Title", required: true, span: 2, placeholder: "Agreement title" },
  { name: "agreementType", label: "Agreement Type", type: "select", options: AGREEMENT_TYPES, required: true },
  { name: "partyId", label: "Party (Client ID)", placeholder: "Client id (optional)" },
  { name: "songId", label: "Song ID", placeholder: "Linked song (optional)" },
  { name: "assetId", label: "Copyright Asset ID", placeholder: "Linked asset (optional)" },
  { name: "agreementDate", label: "Agreement Date", type: "date" },
  { name: "effectiveDate", label: "Effective Date", type: "date" },
  { name: "expiryDate", label: "Expiry Date", type: "date" },
  { name: "territory", label: "Territory", defaultValue: "India" },
  { name: "revenueShare", label: "Revenue Share (%)", type: "number", placeholder: "e.g. 70" },
  { name: "signedStatus", label: "Signed Status", type: "select", options: ["draft", "sent", "signed", "expired", "cancelled"], defaultValue: "draft" },
  { name: "legalReviewStatus", label: "Legal Review", type: "select", options: ["not_reviewed", "in_review", "approved", "rejected"], defaultValue: "not_reviewed" },
  { name: "rightsAssigned", label: "Rights Assigned", span: 3, placeholder: "Comma separated, e.g. Master, Publishing, YouTube" },
  { name: "paymentTerms", label: "Payment Terms", type: "textarea", span: 3 },
  { name: "documentFileId", label: "Upload Agreement", type: "file", span: 3 },
];

const columns: ColumnDef[] = [
  { key: "agreementCode", label: "Code" },
  { key: "agreementTitle", label: "Title" },
  { key: "agreementType", label: "Type" },
  { key: "agreementDate", label: "Date", format: "date" },
  { key: "expiryDate", label: "Expiry", format: "date" },
  { key: "revenueShare", label: "Share %", format: "number" },
  { key: "signedStatus", label: "Signed", format: "enum" },
  { key: "legalReviewStatus", label: "Legal", format: "enum" },
];

export default function AgreementsPage() {
  return (
    <ResourceManager
      title="Agreements"
      description="Singer, lyricist, studio, rights and distribution agreements"
      endpoint="/api/agreements"
      addLabel="New Agreement"
      icon={FileText}
      fields={fields}
      columns={columns}
      searchKeys={["agreementCode", "agreementTitle", "agreementType", "signedStatus"]}
      emptyTitle="Agreement Register"
      emptyDescription="Store every agreement with party, dates, territory, revenue share, signed status and the signed PDF itself."
    />
  );
}
