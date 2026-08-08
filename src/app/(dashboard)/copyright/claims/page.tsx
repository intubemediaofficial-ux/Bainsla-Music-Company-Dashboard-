"use client";

import { ShieldAlert } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const CLAIM_TYPES = [
  "YOUTUBE_COPYRIGHT_CLAIM", "YOUTUBE_CONTENT_ID_CLAIM", "YOUTUBE_MANUAL_CLAIM",
  "YOUTUBE_STRIKE", "FACEBOOK_RIGHTS_MANAGER_CLAIM", "INSTAGRAM_RIGHTS_CLAIM",
  "DMCA_NOTICE", "EMAIL_NOTICE", "LEGAL_NOTICE", "PLATFORM_FORM_SUBMISSION",
  "DISTRIBUTOR_CLAIM", "CMS_CLAIM",
].map((value) => ({ value, label: value.replaceAll("_", " ") }));

const CLAIM_ACTIONS = [
  "MONETIZE", "TRACK", "BLOCK", "TAKEDOWN", "STRIKE", "REQUEST_CREDIT",
  "REQUEST_REVENUE_SHARE", "REQUEST_REMOVAL", "REQUEST_SETTLEMENT", "MANUAL_REVIEW",
].map((value) => ({ value, label: value.replaceAll("_", " ") }));

const fields: FieldDef[] = [
  { name: "claimType", label: "Claim Type", type: "select", options: CLAIM_TYPES, required: true },
  { name: "claimAction", label: "Claim Action", type: "select", options: CLAIM_ACTIONS, defaultValue: "MONETIZE" },
  { name: "platform", label: "Platform", type: "select", options: ["YouTube", "Facebook", "Instagram", "Spotify", "Other"] },
  { name: "caseId", label: "Case ID", placeholder: "Linked case (optional)" },
  { name: "assetId", label: "Asset ID", placeholder: "Linked asset (optional)" },
  { name: "claimReferenceId", label: "Claim Reference ID", placeholder: "Platform claim id" },
  { name: "targetUrl", label: "Target URL", placeholder: "https://" },
  { name: "targetVideoId", label: "Target Video ID", placeholder: "Video ID" },
  { name: "targetChannelId", label: "Target Channel ID", placeholder: "UC..." },
  { name: "submittedAt", label: "Submitted At", type: "date" },
  { name: "responseStatus", label: "Response Status", type: "select", options: ["awaiting", "accepted", "rejected", "counter_received"] },
  { name: "platformDecision", label: "Platform Decision", placeholder: "Decision" },
  { name: "claimReason", label: "Claim Reason", type: "textarea", span: 3 },
  { name: "claimText", label: "Claim Text", type: "textarea", span: 3 },
];

const columns: ColumnDef[] = [
  { key: "claimType", label: "Type", format: "enum" },
  { key: "claimAction", label: "Action", format: "enum" },
  { key: "platform", label: "Platform" },
  { key: "targetUrl", label: "Target URL" },
  { key: "submittedAt", label: "Submitted", format: "date" },
  { key: "responseStatus", label: "Response", format: "enum" },
  { key: "platformDecision", label: "Decision" },
];

export default function CopyrightClaimsPage() {
  return (
    <ResourceManager
      title="Copyright Claims"
      description="Content ID, manual claims, strikes and platform submissions"
      endpoint="/api/copyright/claims"
      addLabel="Add Claim"
      icon={ShieldAlert}
      fields={fields}
      columns={columns}
      searchKeys={["claimType", "platform", "targetUrl", "responseStatus"]}
      emptyTitle="Claim Register"
      emptyDescription="Log every claim raised on any platform with reference id, requested action and the platform's decision."
    />
  );
}
