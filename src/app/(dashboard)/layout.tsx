import { redirect } from "next/navigation";
import { ALL_STAFF_ROLES, getSession, hasPermission, homePathForRole } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!hasPermission(session.role, ALL_STAFF_ROLES)) {
    redirect(homePathForRole(session.role));
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Topbar user={session} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
