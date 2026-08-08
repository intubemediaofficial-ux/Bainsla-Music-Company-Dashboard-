"use client";

import { FolderLock } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const EVIDENCE_TYPES = [
  "SIGNED_AGREEMENT", "STUDIO_INVOICE", "RAW_AUDIO_FILE", "PROJECT_FILE", "LYRICS_FILE",
  "VIDEO_PROJECT_FILE", "THUMBNAIL_SOURCE_FILE", "RELEASE_SCREENSHOT",
  "YOUTUBE_UPLOAD_SCREENSHOT", "YOUTUBE_STUDIO_SCREENSHOT", "DISTRIBUTION_DASHBOARD_SCREENSHOT",
  "ISRC_CERTIFICATE", "UPC_CERTIFICATE", "PAYMENT_PROOF", "WHATSAPP_CHAT", "EMAIL_PERMISSION",
  "ARTIST_ID_PROOF", "STUDIO_PERMISSION", "COPYRIGHT_REGISTRATION", "PLATFORM_CLAIM_SCREENSHOT",
  "INFRINGING_URL_SCREENSHOT", "SCREEN_RECORDING", "AUDIO_FINGERPRINT_REPORT",
  "AI_SIMILARITY_REPORT", "METADATA_REPORT", "DMCA_NOTICE_COPY", "COUNTER_NOTICE_COPY",
  "LEGAL_NOTICE_COPY",
].map((value) => ({ value, label: value.replaceAll("_", " ") }));

const VERIFICATION = ["UPLOADED", "PENDING_REVIEW", "VERIFIED", "REJECTED", "NEEDS_BETTER_COPY", "EXPIRED", "DUPLICATE"]
  .map((value) => ({ value, label: value.replaceAll("_", " ") }));

const WEIGHTS = ["LOW_WEIGHT", "MEDIUM_WEIGHT", "HIGH_WEIGHT", "CRITICAL_WEIGHT"]
  .map((value) => ({ value, label: value.replace("_WEIGHT", "") }));

const fields: FieldDef[] = [
  { name: "evidenceTitle", label: "Evidence Title", required: true, placeholder: "What this evidence proves" },
  { name: "evidenceType", label: "Evidence Type", type: "select", options: EVIDENCE_TYPES, required: true },
  { name: "legalWeight", label: "Legal Weight", type: "select", options: WEIGHTS, defaultValue: "MEDIUM_WEIGHT" },
  { name: "verificationStatus", label: "Verification", type: "select", options: VERIFICATION, defaultValue: "UPLOADED" },
  { name: "assetId", label: "Asset ID", placeholder: "Linked asset (optional)" },
  { name: "caseId", label: "Case ID", placeholder: "Linked case (optional)" },
  { name: "platform", label: "Platform", placeholder: "YouTube / WhatsApp / Email" },
  { name: "sourceUrl", label: "Source URL", placeholder: "https://" },
  { name: "capturedAt", label: "Captured At", type: "date" },
  { name: "isPrimaryEvidence", label: "Primary Evidence", type: "checkbox" },
  { name: "fileId", label: "Upload File", type: "file", span: 2 },
  { name: "description", label: "Description", type: "textarea", span: 3 },
];

const columns: ColumnDef[] = [
  { key: "evidenceTitle", label: "Title" },
  { key: "evidenceType", label: "Type", format: "enum" },
  { key: "platform", label: "Platform" },
  { key: "legalWeight", label: "Weight", format: "enum" },
  { key: "verificationStatus", label: "Verification", format: "enum" },
  { key: "capturedAt", label: "Captured", format: "date" },
  { key: "createdAt", label: "Added", format: "datetime" },
];

export default function EvidencePage() {
  return (
    <ResourceManager
      title="Evidence Vault"
      description="Agreements, raw files, screenshots and reports that prove ownership"
      endpoint="/api/copyright/evidence"
      addLabel="Upload Evidence"
      icon={FolderLock}
      fields={fields}
      columns={columns}
      searchKeys={["evidenceTitle", "evidenceType", "platform", "verificationStatus"]}
      emptyTitle="Evidence Vault"
      emptyDescription="Upload signed agreements, studio invoices, raw project files, screenshots and AI similarity reports — each tagged with legal weight and verification status."
    />
  );
}
