import { FileText } from "lucide-react";
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
  const clientId = user?.clientId ?? null;

  if (!clientId) {
    return { clientName: null, invoices: [], receipts: [], incomes: [], files: [] };
  }

  const [invoices, receipts, incomes, files] = await Promise.all([
    prisma.financeInvoice.findMany({
      where: { clientId },
      orderBy: { invoiceDate: "desc" },
      take: 50,
    }),
    prisma.financeReceipt.findMany({
      where: { clientId },
      orderBy: { receiptDate: "desc" },
      take: 50,
    }),
    prisma.financeIncome.findMany({
      where: { clientId },
      orderBy: { incomeDate: "desc" },
      take: 20,
    }),
    prisma.file.findMany({
      where: { relatedType: "Client", relatedId: clientId },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  return { clientName: user?.clientProfile?.name ?? null, invoices, receipts, incomes, files };
}

export default async function ClientPortalPage() {
  const session = await getSession();
  const data = await getPortalData(session!.id);

  const pendingInvoices = data.invoices.filter(
    (invoice) => (invoice.balanceAmount ?? 0) > 0
  );
  const paid = data.receipts.reduce((sum, r) => sum + r.amountReceived, 0);
  const pending = pendingInvoices.reduce((sum, i) => sum + (i.balanceAmount ?? 0), 0);

  const stats = [
    { label: "Invoices", value: String(data.invoices.length), color: "text-blue-500" },
    {
      label: "Pending Invoices",
      value: String(pendingInvoices.length),
      color: "text-amber-500",
    },
    { label: "Paid Amount", value: formatCurrency(paid), color: "text-green-500" },
    { label: "Pending Amount", value: formatCurrency(pending), color: "text-red-500" },
    { label: "Receipts", value: String(data.receipts.length), color: "text-purple-500" },
    { label: "Files", value: String(data.files.length), color: "text-cyan-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Client Portal</h1>
        <p className="text-muted-foreground">
          {data.clientName
            ? `Welcome ${data.clientName} — your invoices, receipts and files`
            : "Your login is not linked to a client profile yet. Ask the company to link your Client ID."}
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
            <FileText className="h-4 w-4" /> My Invoices
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {data.invoices.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No invoices yet.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Invoice</th>
                  <th className="p-3 text-left font-medium">Date</th>
                  <th className="p-3 text-left font-medium">Total</th>
                  <th className="p-3 text-left font-medium">Balance</th>
                  <th className="p-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b">
                    <td className="p-3">{invoice.invoiceNumber}</td>
                    <td className="p-3 text-muted-foreground">
                      {formatDate(invoice.invoiceDate)}
                    </td>
                    <td className="p-3">{formatCurrency(invoice.grandTotal)}</td>
                    <td className="p-3">{formatCurrency(invoice.balanceAmount)}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-[10px]">
                        {humanizeEnum(invoice.status)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">My Receipts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.receipts.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No receipts yet.
            </p>
          ) : (
            data.receipts.map((receipt) => (
              <div
                key={receipt.id}
                className="flex items-center justify-between rounded-md border p-3 text-sm"
              >
                <div>
                  <p className="font-medium">{receipt.receiptNumber}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(receipt.receiptDate)} · {receipt.paymentMode ?? "—"}
                  </p>
                </div>
                <p>{formatCurrency(receipt.amountReceived)}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
