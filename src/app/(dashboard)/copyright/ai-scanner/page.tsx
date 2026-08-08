"use client";

import { Bot } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const MATCH_TYPES = ["AUDIO_MATCH", "LYRICS_MATCH", "TITLE_MATCH", "METADATA_MATCH", "THUMBNAIL_MATCH", "VIDEO_MATCH", "MIXED_MATCH", "POSSIBLE_FALSE_POSITIVE"]
  .map((value) => ({ value, label: value.replaceAll("_", " ") }));

const RISK_LEVELS = ["RISK_LOW", "RISK_MEDIUM", "RISK_HIGH", "RISK_CRITICAL"]
  .map((value) => ({ value, label: value.replace("RISK_", "") }));

const fields: FieldDef[] = [
  { name: "matchType", label: "Match Type", type: "select", options: MATCH_TYPES, required: true },
  { name: "riskLevel", label: "Risk Level", type: "select", options: RISK_LEVELS, defaultValue: "RISK_LOW" },
  { name: "assetId", label: "Our Asset ID", placeholder: "Linked asset (optional)" },
  { name: "matchedUrl", label: "Matched URL", placeholder: "https://" },
  { name: "matchedPlatform", label: "Platform", type: "select", options: ["YouTube", "Facebook", "Instagram", "Spotify", "Other"] },
  { name: "matchScore", label: "Match Score (%)", type: "number", placeholder: "0-100" },
  { name: "audioSimilarityScore", label: "Audio Similarity (%)", type: "number" },
  { name: "lyricsSimilarityScore", label: "Lyrics Similarity (%)", type: "number" },
  { name: "titleSimilarityScore", label: "Title Similarity (%)", type: "number" },
  { name: "recommendedAction", label: "Recommended Action", type: "select", options: ["Monitor", "Claim", "Takedown", "Ignore", "Manual Review"] },
  { name: "reviewStatus", label: "Review Status", type: "select", options: ["pending", "reviewed", "actioned", "dismissed"], defaultValue: "pending" },
  { name: "aiSummary", label: "AI Summary", type: "textarea", span: 3 },
];

const columns: ColumnDef[] = [
  { key: "matchType", label: "Match", format: "enum" },
  { key: "matchedPlatform", label: "Platform" },
  { key: "matchedUrl", label: "Matched URL" },
  { key: "matchScore", label: "Score", format: "number" },
  { key: "riskLevel", label: "Risk", format: "enum" },
  { key: "recommendedAction", label: "Action" },
  { key: "reviewStatus", label: "Review" },
  { key: "createdAt", label: "Detected", format: "datetime" },
];

export default function AiScannerPage() {
  return (
    <ResourceManager
      title="AI Copyright Scanner"
      description="Similarity matches detected across platforms with risk scoring"
      endpoint="/api/copyright/ai-matches"
      addLabel="Log Match"
      icon={Bot}
      fields={fields}
      columns={columns}
      searchKeys={["matchType", "matchedPlatform", "matchedUrl", "riskLevel"]}
      emptyTitle="AI Match Register"
      emptyDescription="Record audio, lyrics, title, thumbnail and video similarity matches with risk level and recommended action, then convert high-risk matches into cases."
    />
  );
}
