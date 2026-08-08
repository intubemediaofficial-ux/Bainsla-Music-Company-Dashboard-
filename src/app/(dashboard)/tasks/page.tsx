"use client";

import { CheckSquare } from "lucide-react";
import { ResourceManager, type FieldDef, type ColumnDef } from "@/components/resource-manager";

const PRIORITIES = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
];

const STATUSES = [
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const fields: FieldDef[] = [
  { name: "title", label: "Task Title", required: true, span: 2, placeholder: "What needs to be done" },
  { name: "priority", label: "Priority", type: "select", options: PRIORITIES, defaultValue: "MEDIUM" },
  { name: "status", label: "Status", type: "select", options: STATUSES, defaultValue: "PENDING" },
  { name: "assignedToId", label: "Assign To (User ID)", placeholder: "Staff user id (optional)" },
  { name: "dueDate", label: "Due Date", type: "date" },
  { name: "reminderDate", label: "Reminder Date", type: "date" },
  { name: "relatedType", label: "Related To", type: "select", options: ["Song", "Client", "Case", "Invoice", "Release", "Shoot", "Other"] },
  { name: "relatedId", label: "Related ID", placeholder: "Record id (optional)" },
  { name: "description", label: "Description", type: "textarea", span: 3 },
];

const columns: ColumnDef[] = [
  { key: "title", label: "Task" },
  { key: "assignedTo.name", label: "Assigned To" },
  { key: "priority", label: "Priority", format: "enum" },
  { key: "status", label: "Status", format: "enum" },
  { key: "dueDate", label: "Due", format: "date" },
  { key: "createdAt", label: "Created", format: "datetime" },
];

export default function TasksPage() {
  return (
    <ResourceManager
      title="Tasks"
      description="Team tasks, deadlines and reminders"
      endpoint="/api/tasks"
      addLabel="Add Task"
      icon={CheckSquare}
      fields={fields}
      columns={columns}
      searchKeys={["title", "status", "priority"]}
      emptyTitle="Task Board"
      emptyDescription="Create tasks for recording, editing, artwork, uploads, claims and payments — assign them to staff with due dates and reminders."
    />
  );
}
