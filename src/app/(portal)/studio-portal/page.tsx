import { Mic2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { formatCurrency, formatDate, humanizeEnum } from "@/lib/format";

async function getPortalData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { clientId: true, clientProfile: { select: { name: true } } },
  });
  const studioName = user?.clientProfile?.name ?? null;

  const [sessions, payments] = await Promise.all([
    studioName
      ? prisma.studioSession.findMany({
          where: { studioName },
          orderBy: { sessionDate: "desc" },
          take: 50,
          include: { song: { select: { songTitle: true } } },
        })
      : Promise.resolve([]),
    user?.clientId
      ? prisma.financePayment.findMany({
          where: { payeeId: user.clientId, payeeType: "Studio" },
          orderBy: { createdAt: "desc" },
          take: 50,
        })
      : Promise.resolve([]),
  ]);

  return { studioName, sessions, payments };
}

export default async function StudioPortalPage() {
  const session = await getSession();
  const data = await getPortalData(session!.id);

  const completed = data.sessions.filter((item) => item.status === "completed");
  const pendingPayment = data.payments.reduce(
    (sum, payment) => sum + (payment.pendingAmount ?? 0),
    0
  );
  const paid = data.payments.reduce((sum, payment) => sum + (payment.paidAmount ?? 0), 0);

  const stats = [
    { label: "Sessions", value: String(data.sessions.length), color: "text-blue-500" },
    {
      label: "Pending Sessions",
      value: String(data.sessions.length - completed.length),
      color: "text-amber-500",
    },
    { label: "Completed", value: String(completed.length), color: "text-green-500" },
    {
      label: "Payments Pending",
      value: formatCurrency(pendingPayment),
      color: "text-red-500",
    },
    { label: "Payments Paid", value: formatCurrency(paid), color: "text-green-500" },
    {
      label: "Total Billed",
      value: formatCurrency(
        data.sessions.reduce((sum, item) => sum + (item.totalCost ?? 0), 0)
      ),
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Studio Portal</h1>
        <p className="text-muted-foreground">
          {data.studioName
            ? `${data.studioName} — your sessions, billing and payments`
            : "Your login is not linked to a studio profile yet. Ask the company to link your Client ID."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mic2 className="h-4 w-4" /> My Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {data.sessions.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No studio sessions assigned yet.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Code</th>
                  <th className="p-3 text-left font-medium">Song</th>
                  <th className="p-3 text-left font-medium">Type</th>
                  <th className="p-3 text-left font-medium">Date</th>
                  <th className="p-3 text-left font-medium">Cost</th>
                  <th className="p-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.sessions.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{item.sessionCode}</td>
                    <td className="p-3 text-muted-foreground">
                      {item.song?.songTitle ?? "—"}
                    </td>
                    <td className="p-3">{humanizeEnum(item.sessionType)}</td>
                    <td className="p-3 text-muted-foreground">
                      {formatDate(item.sessionDate)}
                    </td>
                    <td className="p-3">{formatCurrency(item.totalCost)}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-[10px]">
                        {humanizeEnum(item.status)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
