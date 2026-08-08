"use client";

import { Mic2 } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const SESSION_TYPES = [
  { value: "RECORDING", label: "Recording" },
  { value: "MIXING", label: "Mixing" },
  { value: "MASTERING", label: "Mastering" },
  { value: "DUBBING", label: "Dubbing" },
  { value: "LIVE_SESSION", label: "Live Session" },
  { value: "REHEARSAL", label: "Rehearsal" },
];

const fields: FieldDef[] = [
  { name: "studioName", label: "Studio Name", required: true, placeholder: "Studio name" },
  { name: "sessionType", label: "Session Type", type: "select", options: SESSION_TYPES, defaultValue: "RECORDING" },
  { name: "sessionDate", label: "Session Date", type: "date", required: true },
  { name: "studioCity", label: "City", placeholder: "City" },
  { name: "engineerName", label: "Sound Engineer", placeholder: "Engineer name" },
  { name: "songId", label: "Song ID", placeholder: "Linked song (optional)" },
  { name: "startTime", label: "Start Time", placeholder: "10:00 AM" },
  { name: "endTime", label: "End Time", placeholder: "02:00 PM" },
  { name: "hours", label: "Hours", type: "number", placeholder: "4" },
  { name: "ratePerHour", label: "Rate / Hour (₹)", type: "number", placeholder: "1000" },
  { name: "status", label: "Status", type: "select", options: ["scheduled", "in_progress", "completed", "cancelled"], defaultValue: "scheduled" },
  { name: "notes", label: "Notes", type: "textarea", span: 3 },
];

const columns: ColumnDef[] = [
  { key: "sessionCode", label: "Code" },
  { key: "studioName", label: "Studio" },
  { key: "sessionType", label: "Type", format: "enum" },
  { key: "sessionDate", label: "Date", format: "date" },
  { key: "engineerName", label: "Engineer" },
  { key: "hours", label: "Hours", format: "number" },
  { key: "totalCost", label: "Cost", format: "currency" },
  { key: "status", label: "Status", format: "enum" },
];

export default function StudioPage() {
  return (
    <ResourceManager
      title="Studio & Recording"
      description="Recording, mixing, mastering and dubbing sessions with cost tracking"
      endpoint="/api/studio"
      addLabel="Book Session"
      icon={Mic2}
      fields={fields}
      columns={columns}
      searchKeys={["sessionCode", "studioName", "engineerName", "status"]}
      emptyTitle="Studio Sessions"
      emptyDescription="Book and track every studio session — type, date, engineer, hours and cost (total cost is calculated from hours × rate)."
    />
  );
}
