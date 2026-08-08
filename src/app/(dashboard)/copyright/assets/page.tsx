"use client";

import { FileText } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const ASSET_TYPES = [
  { value: "AUDIO_MASTER", label: "Audio Master" },
  { value: "LYRICS", label: "Lyrics" },
  { value: "COMPOSITION", label: "Composition" },
  { value: "VIDEO", label: "Video" },
  { value: "ARTWORK", label: "Artwork" },
  { value: "THUMBNAIL", label: "Thumbnail" },
  { value: "ALBUM_COVER", label: "Album Cover" },
  { value: "SHORT_AUDIO", label: "Short Audio" },
  { value: "REEL_AUDIO", label: "Reel Audio" },
  { value: "LIVE_AUDIO", label: "Live Audio" },
  { value: "REMIX_AUDIO", label: "Remix" },
  { value: "KARAOKE", label: "Karaoke" },
  { value: "INSTRUMENTAL", label: "Instrumental" },
  { value: "FULL_SONG_PACKAGE", label: "Full Song Package" },
];

const OWNERSHIP_STATUSES = [
  { value: "OWNED_BY_COMPANY", label: "Owned by Company" },
  { value: "LICENSED_TO_COMPANY", label: "Licensed to Company" },
  { value: "PENDING_AGREEMENT", label: "Pending Agreement" },
  { value: "THIRD_PARTY_RIGHTS", label: "Third Party Rights" },
  { value: "SHARED_RIGHTS", label: "Shared Rights" },
  { value: "DISPUTED", label: "Disputed" },
  { value: "UNKNOWN", label: "Unknown" },
];

const COPYRIGHT_STATUSES = [
  { value: "REGISTERED", label: "Registered" },
  { value: "NOT_REGISTERED", label: "Not Registered" },
  { value: "UNDER_REVIEW", label: "Under Review" },
  { value: "CLAIM_ACTIVE", label: "Claim Active" },
  { value: "DMCA_ACTIVE", label: "DMCA Active" },
  { value: "CR_DISPUTED", label: "Disputed" },
  { value: "CR_RELEASED", label: "Released" },
  { value: "BLOCKED", label: "Blocked" },
  { value: "MONETIZED", label: "Monetized" },
  { value: "PENDING_EVIDENCE", label: "Pending Evidence" },
];

const fields: FieldDef[] = [
  { name: "assetTitle", label: "Asset Title", required: true, placeholder: "Song / content title" },
  { name: "assetType", label: "Asset Type", type: "select", options: ASSET_TYPES, required: true },
  { name: "language", label: "Language", placeholder: "Hindi" },
  { name: "genre", label: "Genre", placeholder: "Bhajan / Rasiya / Folk" },
  { name: "isrcCode", label: "ISRC Code", placeholder: "ISRC..." },
  { name: "upcCode", label: "UPC Code", placeholder: "UPC..." },
  { name: "youtubeVideoId", label: "YouTube Video ID", placeholder: "Video ID" },
  { name: "releaseDate", label: "Release Date", type: "date" },
  { name: "recordingDate", label: "Recording Date", type: "date" },
  { name: "labelName", label: "Label Name", defaultValue: "Bainsla Music" },
  { name: "producerName", label: "Producer", placeholder: "Producer name" },
  { name: "ownershipStatus", label: "Ownership Status", type: "select", options: OWNERSHIP_STATUSES, defaultValue: "OWNED_BY_COMPANY" },
  { name: "copyrightStatus", label: "Copyright Status", type: "select", options: COPYRIGHT_STATUSES, defaultValue: "NOT_REGISTERED" },
  { name: "alternateTitles", label: "Alternate Titles", span: 3, placeholder: "Comma separated" },
];

const columns: ColumnDef[] = [
  { key: "assetCode", label: "Code" },
  { key: "assetTitle", label: "Title" },
  { key: "assetType", label: "Type", format: "enum" },
  { key: "language", label: "Language" },
  { key: "isrcCode", label: "ISRC" },
  { key: "ownershipStatus", label: "Ownership", format: "enum" },
  { key: "copyrightStatus", label: "Copyright", format: "enum" },
  { key: "releaseDate", label: "Release", format: "date" },
];

export default function CopyrightAssetsPage() {
  return (
    <ResourceManager
      title="Song Rights Registry"
      description="Complete ownership records for all copyright assets"
      endpoint="/api/copyright/assets"
      addLabel="Add Copyright Asset"
      icon={FileText}
      fields={fields}
      columns={columns}
      searchKeys={["assetCode", "assetTitle", "isrcCode", "assetType"]}
      emptyTitle="Copyright Assets Registry"
      emptyDescription="Register every song, audio master, lyrics, composition, video, thumbnail and artwork as a copyright asset with ownership status."
    />
  );
}
