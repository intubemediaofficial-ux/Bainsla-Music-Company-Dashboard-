"use client";

import { Gavel } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const CASE_TYPES = [
  "UNAUTHORIZED_UPLOAD", "AUDIO_COPY", "VIDEO_COPY", "LYRICS_COPY", "THUMBNAIL_COPY",
  "REMIX_WITHOUT_PERMISSION", "SHORTS_REUSE", "FACEBOOK_REUPLOAD", "INSTAGRAM_REEL_COPY",
  "FAKE_CLAIM_AGAINST_US", "COUNTER_CLAIM_RECEIVED", "COPYRIGHT_STRIKE_RECEIVED",
  "COPYRIGHT_STRIKE_SENT", "DMCA_TAKEDOWN", "DMCA_COUNTER_NOTICE", "REVENUE_DISPUTE",
  "OWNERSHIP_DISPUTE", "ARTIST_DISPUTE", "LABEL_DISPUTE", "PLATFORM_REJECTION", "SETTLEMENT_CASE",
].map((value) => ({ value, label: value.replaceAll("_", " ") }));

const PRIORITIES = ["LOW", "NORMAL", "HIGH", "URGENT", "CRITICAL"].map((value) => ({
  value,
  label: value.charAt(0) + value.slice(1).toLowerCase(),
}));

const STATUSES = [
  "NEW", "EVIDENCE_PENDING", "EVIDENCE_READY", "AI_REVIEW_DONE", "MANUAL_REVIEW_PENDING",
  "NOTICE_DRAFTED", "NOTICE_SENT", "PLATFORM_REVIEW", "CLAIM_ACCEPTED", "CLAIM_REJECTED",
  "COUNTER_RECEIVED", "LEGAL_ESCALATION", "SETTLEMENT_DISCUSSION", "CASE_RESOLVED",
  "CASE_CLOSED", "CASE_ARCHIVED",
].map((value) => ({ value, label: value.replaceAll("_", " ") }));

const fields: FieldDef[] = [
  { name: "caseTitle", label: "Case Title", required: true, placeholder: "Short case title" },
  { name: "caseType", label: "Case Type", type: "select", options: CASE_TYPES, required: true },
  { name: "priority", label: "Priority", type: "select", options: PRIORITIES, defaultValue: "NORMAL" },
  { name: "status", label: "Status", type: "select", options: STATUSES, defaultValue: "NEW" },
  { name: "platform", label: "Platform", type: "select", options: ["YouTube", "Facebook", "Instagram", "Spotify", "JioSaavn", "Other"] },
  { name: "assetId", label: "Copyright Asset ID", placeholder: "Linked asset (optional)" },
  { name: "originalUrl", label: "Original URL", placeholder: "https://" },
  { name: "infringingUrl", label: "Infringing URL", placeholder: "https://" },
  { name: "infringerName", label: "Infringer Name", placeholder: "Channel / person" },
  { name: "infringerChannelId", label: "Infringer Channel ID", placeholder: "UC..." },
  { name: "infringerEmail", label: "Infringer Email", placeholder: "email@example.com" },
  { name: "nextActionDueAt", label: "Next Action Due", type: "date" },
  { name: "caseDescription", label: "Case Description", type: "textarea", span: 3 },
];

const columns: ColumnDef[] = [
  { key: "caseCode", label: "Case" },
  { key: "caseTitle", label: "Title" },
  { key: "caseType", label: "Type", format: "enum" },
  { key: "platform", label: "Platform" },
  { key: "infringerName", label: "Infringer" },
  { key: "priority", label: "Priority", format: "enum" },
  { key: "status", label: "Status", format: "enum" },
  { key: "nextActionDueAt", label: "Next Action", format: "date" },
];

export default function CopyrightCasesPage() {
  return (
    <ResourceManager
      title="Copyright Cases"
      description="Every infringement, dispute and strike tracked end-to-end"
      endpoint="/api/copyright/cases"
      addLabel="Open Case"
      icon={Gavel}
      fields={fields}
      columns={columns}
      searchKeys={["caseCode", "caseTitle", "caseType", "status", "infringerName"]}
      emptyTitle="Case Register"
      emptyDescription="Open a case for unauthorized uploads, audio/video copies, fake claims, strikes and disputes — then attach evidence, claims and DMCA notices."
    />
  );
}
