"use client";

import { UserCog } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "ADMIN", label: "Admin" },
  { value: "MANAGER", label: "Manager" },
  { value: "YOUTUBE_MANAGER", label: "YouTube Manager" },
  { value: "COPYRIGHT_MANAGER", label: "Copyright Manager" },
  { value: "DESIGNER", label: "Designer" },
  { value: "STUDIO_STAFF", label: "Studio Staff" },
  { value: "VIDEO_TEAM", label: "Video Team" },
  { value: "ACCOUNTANT", label: "Accountant" },
  { value: "ARTIST_CLIENT", label: "Artist / Client (portal login)" },
];

const fields: FieldDef[] = [
  { name: "name", label: "Full Name", required: true, placeholder: "Staff name" },
  { name: "email", label: "Email (login)", required: true, placeholder: "name@bainslamusic.com" },
  { name: "password", label: "Password", required: true, placeholder: "Min 6 characters" },
  { name: "role", label: "Role", type: "select", options: ROLES, required: true },
  { name: "phone", label: "Phone", placeholder: "+91 XXXXX XXXXX" },
  { name: "clientId", label: "Client ID (for portal login)", placeholder: "Link to a client for artist portal" },
];

const columns: ColumnDef[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role", format: "enum" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status" },
  { key: "lastLogin", label: "Last Login", format: "datetime" },
];

export default function StaffPage() {
  return (
    <ResourceManager
      title="Staff Management"
      description="Team members, roles and portal logins"
      endpoint="/api/staff"
      addLabel="Add Staff"
      icon={UserCog}
      fields={fields}
      columns={columns}
      searchKeys={["name", "email", "role", "status"]}
      emptyTitle="Team & Roles"
      emptyDescription="Add staff with a role — Manager, YouTube Manager, Copyright Manager, Designer, Studio Staff, Video Team, Accountant — or create an Artist/Client portal login linked to a client."
    />
  );
}
