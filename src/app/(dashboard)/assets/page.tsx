"use client";

import { Archive } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const ASSET_TYPES = ["Audio", "Video", "Image", "Thumbnail", "Artwork", "Document", "Project File", "Font", "Preset", "Other"];

const fields: FieldDef[] = [
  { name: "assetName", label: "Asset Name", required: true, placeholder: "Asset name" },
  { name: "assetType", label: "Asset Type", type: "select", options: ASSET_TYPES, required: true },
  { name: "category", label: "Category", placeholder: "e.g. Bhajan thumbnails" },
  { name: "licenseStatus", label: "License Status", type: "select", options: ["owned", "licensed", "royalty_free", "restricted"] },
  { name: "usageRights", label: "Usage Rights", placeholder: "Where it can be used" },
  { name: "fileUrl", label: "File URL", required: true, span: 2, placeholder: "https:// or /uploads/..." },
  { name: "previewUrl", label: "Preview URL", placeholder: "Optional preview" },
  { name: "tags", label: "Tags", span: 3, placeholder: "Comma separated tags" },
];

const columns: ColumnDef[] = [
  { key: "assetName", label: "Asset" },
  { key: "assetType", label: "Type" },
  { key: "category", label: "Category" },
  { key: "licenseStatus", label: "License" },
  { key: "fileUrl", label: "File" },
  { key: "createdAt", label: "Added", format: "datetime" },
];

export default function AssetsPage() {
  return (
    <ResourceManager
      title="Asset Library"
      description="Reusable audio, video, artwork, thumbnails, fonts and project files"
      endpoint="/api/assets"
      addLabel="Add Asset"
      icon={Archive}
      fields={fields}
      columns={columns}
      searchKeys={["assetName", "assetType", "category"]}
      emptyTitle="Asset Library"
      emptyDescription="Keep every reusable file in one place with license status and usage rights. Upload files from the File Manager and paste the URL here."
    />
  );
}
