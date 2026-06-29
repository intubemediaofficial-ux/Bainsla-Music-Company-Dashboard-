import { Music } from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
          <Music className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold">Bainsla Music</h1>
          <span className="text-xs text-muted-foreground">Portal</span>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
