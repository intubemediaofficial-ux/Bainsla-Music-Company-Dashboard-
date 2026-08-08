"use client";

import { Globe } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const PLATFORMS = "Spotify, Apple Music, JioSaavn, Wynk, Gaana, Amazon Music, YouTube Music, Instagram, Facebook, Resso";

const fields: FieldDef[] = [
  { name: "releaseTitle", label: "Release Title", required: true, placeholder: "Song / album title" },
  { name: "distributor", label: "Distributor", type: "select", options: ["Believe", "TuneCore", "DistroKid", "CD Baby", "Hungama", "Times Music", "In-house CMS", "Other"] },
  { name: "releaseDate", label: "Release Date", type: "date" },
  { name: "liveDate", label: "Live Date", type: "date" },
  { name: "isrc", label: "ISRC", placeholder: "ISRC code" },
  { name: "upc", label: "UPC", placeholder: "UPC code" },
  { name: "revenueShare", label: "Revenue Share (%)", type: "number", placeholder: "e.g. 70" },
  { name: "songId", label: "Song ID", placeholder: "Linked song (optional)" },
  { name: "status", label: "Status", type: "select", options: ["draft", "submitted", "in_review", "live", "rejected", "taken_down"], defaultValue: "draft" },
  { name: "platforms", label: "Platforms", span: 3, placeholder: PLATFORMS },
  { name: "notes", label: "Notes", type: "textarea", span: 3 },
];

const columns: ColumnDef[] = [
  { key: "releaseCode", label: "Code" },
  { key: "releaseTitle", label: "Title" },
  { key: "distributor", label: "Distributor" },
  { key: "releaseDate", label: "Release", format: "date" },
  { key: "liveDate", label: "Live", format: "date" },
  { key: "isrc", label: "ISRC" },
  { key: "upc", label: "UPC" },
  { key: "status", label: "Status", format: "enum" },
];

export default function DistributionPage() {
  return (
    <ResourceManager
      title="Distribution"
      description="Submit and track releases across Spotify, Apple Music, JioSaavn, Amazon & more"
      endpoint="/api/distribution"
      addLabel="New Release"
      icon={Globe}
      fields={fields}
      columns={columns}
      searchKeys={["releaseCode", "releaseTitle", "distributor", "status", "isrc"]}
      emptyTitle="Distribution Hub"
      emptyDescription="Create a release, list the platforms, store ISRC/UPC and track it from submission to live."
    />
  );
}
