"use client";

import { Mail } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const STATUSES = [
  "DMCA_DRAFT", "DMCA_PENDING_REVIEW", "DMCA_APPROVED", "DMCA_SENT", "DMCA_DELIVERED",
  "DMCA_REJECTED", "DMCA_RESPONDED", "DMCA_COUNTER_RECEIVED", "DMCA_RESOLVED", "DMCA_WITHDRAWN",
].map((value) => ({ value, label: value.replace("DMCA_", "").replaceAll("_", " ") }));

const fields: FieldDef[] = [
  { name: "noticeSubject", label: "Notice Subject", required: true, span: 2, placeholder: "Copyright infringement notice for..." },
  { name: "status", label: "Status", type: "select", options: STATUSES, defaultValue: "DMCA_DRAFT" },
  { name: "platform", label: "Platform", type: "select", options: ["YouTube", "Facebook", "Instagram", "Google", "Hosting Provider", "Other"] },
  { name: "recipientName", label: "Recipient Name", placeholder: "Platform / host legal team" },
  { name: "recipientEmail", label: "Recipient Email", placeholder: "copyright@platform.com" },
  { name: "caseId", label: "Case ID", placeholder: "Linked case (optional)" },
  { name: "assetId", label: "Asset ID", placeholder: "Linked asset (optional)" },
  { name: "copyrightOwnerName", label: "Copyright Owner", defaultValue: "Bainsla Music" },
  { name: "authorizedPersonName", label: "Authorized Person", placeholder: "Name of signatory" },
  { name: "originalWorkUrl", label: "Original Work URL", placeholder: "https://" },
  { name: "infringingWorkUrl", label: "Infringing Work URL", placeholder: "https://" },
  { name: "signatureName", label: "Signature Name", placeholder: "Full name" },
  { name: "signatureDate", label: "Signature Date", type: "date" },
  { name: "originalWorkDescription", label: "Original Work Description", type: "textarea", span: 3 },
  { name: "noticeBody", label: "Notice Body", type: "textarea", span: 3 },
  { name: "recipientAddress", label: "Recipient Address", type: "textarea", span: 3 },
];

const columns: ColumnDef[] = [
  { key: "noticeCode", label: "Notice" },
  { key: "noticeSubject", label: "Subject" },
  { key: "platform", label: "Platform" },
  { key: "recipientEmail", label: "Recipient" },
  { key: "infringingWorkUrl", label: "Infringing URL" },
  { key: "status", label: "Status", format: "enum" },
  { key: "signatureDate", label: "Signed", format: "date" },
];

export default function DmcaPage() {
  return (
    <ResourceManager
      title="DMCA Notices"
      description="Draft, review, send and track DMCA takedown notices"
      endpoint="/api/copyright/dmca"
      addLabel="Draft DMCA Notice"
      icon={Mail}
      fields={fields}
      columns={columns}
      searchKeys={["noticeCode", "noticeSubject", "platform", "status"]}
      emptyTitle="DMCA Register"
      emptyDescription="Create a complete DMCA notice — recipient, original work, infringing work, good faith statement and signature — then track its status until resolution."
    />
  );
}
