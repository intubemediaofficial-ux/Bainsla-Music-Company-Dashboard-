"use client";

import { Video } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const SHOOT_TYPES = ["Music Video", "Lyrical Video", "Reel / Shorts", "Behind The Scenes", "Live Performance", "Promo Video", "Other"];

const fields: FieldDef[] = [
  { name: "shootTitle", label: "Shoot Title", required: true, placeholder: "Video shoot title" },
  { name: "shootType", label: "Shoot Type", type: "select", options: SHOOT_TYPES },
  { name: "shootDate", label: "Shoot Date", type: "date", required: true },
  { name: "endDate", label: "End Date", type: "date" },
  { name: "location", label: "Location", placeholder: "Shoot location" },
  { name: "city", label: "City", placeholder: "City" },
  { name: "directorName", label: "Director", placeholder: "Director name" },
  { name: "cameraTeam", label: "Camera Team", placeholder: "Team / vendor" },
  { name: "dancersCount", label: "Dancers", type: "number", placeholder: "0" },
  { name: "budget", label: "Budget (₹)", type: "number", placeholder: "0.00" },
  { name: "actualCost", label: "Actual Cost (₹)", type: "number", placeholder: "0.00" },
  { name: "songId", label: "Song ID", placeholder: "Linked song (optional)" },
  { name: "status", label: "Status", type: "select", options: ["planned", "shooting", "editing", "completed", "cancelled"], defaultValue: "planned" },
  { name: "notes", label: "Notes", type: "textarea", span: 3 },
];

const columns: ColumnDef[] = [
  { key: "shootCode", label: "Code" },
  { key: "shootTitle", label: "Title" },
  { key: "shootType", label: "Type" },
  { key: "shootDate", label: "Date", format: "date" },
  { key: "location", label: "Location" },
  { key: "directorName", label: "Director" },
  { key: "budget", label: "Budget", format: "currency" },
  { key: "actualCost", label: "Actual", format: "currency" },
  { key: "status", label: "Status", format: "enum" },
];

export default function VideoShootPage() {
  return (
    <ResourceManager
      title="Video Shoots"
      description="Plan and track music video shoots, budgets and post-production"
      endpoint="/api/video-shoots"
      addLabel="Plan Shoot"
      icon={Video}
      fields={fields}
      columns={columns}
      searchKeys={["shootCode", "shootTitle", "location", "status"]}
      emptyTitle="Video Shoots"
      emptyDescription="Plan shoots with location, director, camera team, dancers and budget — then track actual cost against budget."
    />
  );
}
