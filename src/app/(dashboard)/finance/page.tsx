import { IndianRupee, TrendingUp, TrendingDown, Wallet, Receipt, FileText, CreditCard, Building2, Bot, Plus, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function FinanceDashboardPage() {
  const stats = [
    { label: "Total Income", value: "₹0", color: "text-green-500", icon: TrendingUp },
    { label: "Total Expense", value: "₹0", color: "text-red-500", icon: TrendingDown },
    { label: "Net Profit", value: "₹0", color: "text-blue-500", icon: IndianRupee },
    { label: "Pending Receivables", value: "₹0", color: "text-amber-500", icon: Wallet },
    { label: "Pending Payables", value: "₹0", color: "text-orange-500", icon: CreditCard },
    { label: "GST Payable", value: "₹0", color: "text-purple-500", icon: Receipt },
    { label: "Bank Balance", value: "₹0", color: "text-cyan-500", icon: Building2 },
    { label: "Cash Balance", value: "₹0", color: "text-emerald-500", icon: Wallet },
  ];

  const quickLinks = [
    { title: "Income Manager", description: "Track all income sources", href: "/finance/income", icon: TrendingUp },
    { title: "Expense Manager", description: "Manage company expenses", href: "/finance/expenses", icon: TrendingDown },
    { title: "Invoices", description: "Create & send invoices", href: "/finance/invoices", icon: FileText },
    { title: "Receipts", description: "Generate payment receipts", href: "/finance/receipts", icon: Receipt },
    { title: "Payments", description: "Artist, Studio & Vendor payments", href: "/finance/payments", icon: CreditCard },
    { title: "GST & Tax", description: "GST, TDS, Tax management", href: "/finance/gst", icon: IndianRupee },
    { title: "Banking", description: "Bank accounts & wallets", href: "/finance/banking", icon: Building2 },
    { title: "Reports", description: "Financial reports & analytics", href: "/finance/reports", icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Finance Management</h1>
          <p className="text-muted-foreground">Income, expenses, invoicing, GST, payments & financial reports</p>
        </div>
        <div className="flex gap-2">
          <Link href="/finance/income">
            <Button variant="outline" className="gap-2"><Plus className="h-4 w-4" /> Add Income</Button>
          </Link>
          <Link href="/finance/expenses">
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Expense</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} href={item.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-4">
                  <Icon className="h-6 w-6 mb-2 text-green-500" />
                  <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Recent Income</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-4">No income entries yet. Add your first income record.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Recent Expenses</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-4">No expense entries yet. Add your first expense record.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Pending Client Payments</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-4">No pending client payments.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Pending Artist Payments</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-4">No pending artist payments.</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" className="gap-2"><Bot className="h-4 w-4" /> AI Finance Summary</Button>
        <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export Report</Button>
        <Link href="/finance/invoices"><Button variant="outline" className="gap-2"><FileText className="h-4 w-4" /> Create Invoice</Button></Link>
        <Link href="/finance/receipts"><Button variant="outline" className="gap-2"><Receipt className="h-4 w-4" /> Create Receipt</Button></Link>
      </div>
    </div>
  );
}
