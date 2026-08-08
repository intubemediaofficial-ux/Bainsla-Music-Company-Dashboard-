import { Music } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { formatCurrency, formatDate, humanizeEnum } from "@/lib/format";

async function getPortalData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { clientId: true, clientProfile: { select: { id: true, name: true } } },
  });
  const clientId = user?.clientId ?? null;

  if (!clientId) {
    return { clientName: null, songs: [], payments: [], agreements: [], notifications: [] };
  }

  const [songs, payments, agreements, notifications] = await Promise.all([
    prisma.song.findMany({
      where: {
        OR: [
          { singerId: clientId },
          { lyricistId: clientId },
          { composerId: clientId },
          { musicDirectorId: clientId },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.financePayment.findMany({
      where: { payeeId: clientId },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.copyrightAgreement.findMany({
      where: { partyId: clientId },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  return {
    clientName: user?.clientProfile?.name ?? null,
    songs,
    payments,
    agreements,
    notifications,
  };
}

export default async function ArtistPortalPage() {
  const session = await getSession();
  const data = await getPortalData(session!.id);

  const released = data.songs.filter((song) => song.releaseStatus === "released");
  const paid = data.payments.reduce((sum, p) => sum + (p.paidAmount ?? 0), 0);
  const pending = data.payments.reduce((sum, p) => sum + (p.pendingAmount ?? 0), 0);
  const pendingAgreements = data.agreements.filter((a) => a.signedStatus !== "signed");

  const stats = [
    { label: "Total Songs", value: String(data.songs.length), color: "text-blue-500" },
    { label: "Released Songs", value: String(released.length), color: "text-green-500" },
    {
      label: "Pending Releases",
      value: String(data.songs.length - released.length),
      color: "text-amber-500",
    },
    {
      label: "Pending Agreements",
      value: String(pendingAgreements.length),
      color: "text-orange-500",
    },
    { label: "Pending Payments", value: formatCurrency(pending), color: "text-red-500" },
    { label: "Paid Amount", value: formatCurrency(paid), color: "text-green-500" },
    {
      label: "Agreements",
      value: String(data.agreements.length),
      color: "text-purple-500",
    },
    {
      label: "Notifications",
      value: String(data.notifications.length),
      color: "text-cyan-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Artist Portal</h1>
        <p className="text-muted-foreground">
          {data.clientName
            ? `Welcome ${data.clientName} — your songs, agreements and payments`
            : "Your login is not linked to an artist profile yet. Ask the company to link your Client ID."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
            <Music className="h-4 w-4" /> My Songs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {data.songs.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No songs linked to your profile yet.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Song</th>
                  <th className="p-3 text-left font-medium">Stage</th>
                  <th className="p-3 text-left font-medium">Release Date</th>
                  <th className="p-3 text-left font-medium">Links</th>
                </tr>
              </thead>
              <tbody>
                {data.songs.map((song) => (
                  <tr key={song.id} className="border-b">
                    <td className="p-3">{song.songTitle}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-[10px]">
                        {humanizeEnum(song.currentStage)}
                      </Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {formatDate(song.releaseDate)}
                    </td>
                    <td className="p-3">
                      {song.youtubeLink ? (
                        <a
                          href={song.youtubeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          YouTube
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">My Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.payments.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No payments recorded yet.
              </p>
            ) : (
              data.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between rounded-md border p-3 text-sm"
                >
                  <div>
                    <p className="font-medium">{humanizeEnum(payment.paymentType)}</p>
                    <p className="text-xs text-muted-foreground">
                      {payment.paymentCode} · {payment.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>{formatCurrency(payment.netAmount)}</p>
                    <p className="text-xs text-muted-foreground">
                      Pending {formatCurrency(payment.pendingAmount)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">My Agreements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.agreements.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No agreements yet.
              </p>
            ) : (
              data.agreements.map((agreement) => (
                <div
                  key={agreement.id}
                  className="flex items-center justify-between rounded-md border p-3 text-sm"
                >
                  <div>
                    <p className="font-medium">{agreement.agreementTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {agreement.agreementType} · {formatDate(agreement.agreementDate)}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {agreement.signedStatus}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
