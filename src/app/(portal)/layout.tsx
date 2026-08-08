import Link from "next/link";
import { redirect } from "next/navigation";
import { Music } from "lucide-react";
import { getSession } from "@/lib/auth";

const PORTAL_LINKS = [
  { href: "/artist", label: "Artist" },
  { href: "/client", label: "Client" },
  { href: "/studio-portal", label: "Studio" },
];

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <Music className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold">Bainsla Music</h1>
          <span className="text-xs text-muted-foreground">Portal</span>
          <nav className="ml-4 flex gap-3 text-sm">
            {PORTAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">{session.name}</span>
            <Link href="/api/auth/logout" className="hover:underline">
              Logout
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
