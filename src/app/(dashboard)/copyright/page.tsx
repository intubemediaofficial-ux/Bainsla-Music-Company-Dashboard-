import { Shield, FileText, AlertTriangle, Search, Bot, Upload, Download, Plus, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function CopyrightDashboardPage() {
  const [totalAssets, activeClaims, dmcaNotices, pendingEvidence, cases] = await Promise.all([
    prisma.copyrightAsset.count().catch(() => 0),
    prisma.copyrightClaim.count().catch(() => 0),
    prisma.dmcaNotice.count().catch(() => 0),
    prisma.copyrightEvidence.count({ where: { verificationStatus: "PENDING_REVIEW" } }).catch(() => 0),
    prisma.copyrightCase.findMany({ take: 5, orderBy: { createdAt: "desc" } }).catch(() => []),
  ]);

  const stats = [
    { label: "Total Assets", value: totalAssets, color: "text-blue-500" },
    { label: "Active Claims", value: activeClaims, color: "text-amber-500" },
    { label: "DMCA Notices", value: dmcaNotices, color: "text-red-500" },
    { label: "Evidence Pending", value: pendingEvidence, color: "text-orange-500" },
  ];

  const quickLinks = [
    { title: "Song Rights Registry", description: "Complete ownership records", href: "/copyright/assets", icon: FileText },
    { title: "Copyright Cases", description: "Track disputes & enforcement", href: "/copyright/cases", icon: Scale },
    { title: "Claims Center", description: "Manage copyright claims", href: "/copyright/claims", icon: Shield },
    { title: "DMCA Notices", description: "Send & track takedowns", href: "/copyright/dmca", icon: AlertTriangle },
    { title: "Evidence Vault", description: "Store & verify proofs", href: "/copyright/evidence", icon: Upload },
    { title: "AI Copyright Scanner", description: "Detect unauthorized usage", href: "/copyright/ai-scanner", icon: Bot },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Copyright Management</h1>
          <p className="text-muted-foreground">Rights registry, claims, DMCA, evidence & legal operations</p>
        </div>
        <div className="flex gap-2">
          <Link href="/copyright/assets">
            <Button variant="outline" className="gap-2"><Plus className="h-4 w-4" /> Add Asset</Button>
          </Link>
          <Link href="/copyright/cases">
            <Button className="gap-2"><Shield className="h-4 w-4" /> New Case</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} href={item.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-5">
                  <Icon className="h-8 w-8 mb-3 text-amber-500" />
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Cases</CardTitle>
        </CardHeader>
        <CardContent>
          {cases.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No copyright cases yet. Create your first case to start tracking.</p>
          ) : (
            <div className="space-y-3">
              {cases.map((c: { id: string; caseCode: string; caseTitle: string; status: string; priority: string }) => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-md border">
                  <div>
                    <p className="font-medium text-sm">{c.caseTitle}</p>
                    <p className="text-xs text-muted-foreground">{c.caseCode}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{c.status}</Badge>
                    <Badge variant={c.priority === "CRITICAL" ? "destructive" : "secondary"}>{c.priority}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" className="gap-2"><Bot className="h-4 w-4" /> Run AI Scan</Button>
        <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export Report</Button>
        <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" /> Bulk Import Assets</Button>
      </div>
    </div>
  );
}
