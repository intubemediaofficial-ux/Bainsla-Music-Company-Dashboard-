"use client";

import { FileText, Download, Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FinanceReportsPage() {
  const reports = [
    { title: "Income Report", description: "All income entries by source and period" },
    { title: "Expense Report", description: "All expenses by category and period" },
    { title: "Profit/Loss Report", description: "Net P&L by month/quarter/year" },
    { title: "Cash Flow Report", description: "Cash inflow and outflow analysis" },
    { title: "GST Report", description: "Output GST, Input GST, GST Payable" },
    { title: "TDS Report", description: "TDS deducted and deposited" },
    { title: "Artist Payment Report", description: "All artist payments with TDS" },
    { title: "Studio Payment Report", description: "Studio-wise payment summary" },
    { title: "Vendor Payment Report", description: "Vendor-wise expense breakdown" },
    { title: "Client Outstanding Report", description: "Pending receivables from clients" },
    { title: "Invoice Report", description: "All invoices with payment status" },
    { title: "Receipt Report", description: "All receipts generated" },
    { title: "Song-wise Profit Report", description: "Income vs expense per song" },
    { title: "Platform Revenue Report", description: "Revenue by YouTube, Spotify, etc." },
    { title: "Royalty Report", description: "Royalty calculations and settlements" },
    { title: "Bank Report", description: "Bank-wise transaction summary" },
    { title: "Cash Book Report", description: "Cash transactions ledger" },
    { title: "Tax Summary", description: "Annual tax obligations summary" },
    { title: "Audit Report", description: "Full audit trail of financial actions" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Finance Reports</h1>
          <p className="text-muted-foreground">Generate, export, and schedule financial reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Calendar className="h-4 w-4" /> Schedule Report</Button>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export All</Button>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Report Filters</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div><label className="text-xs text-muted-foreground">Date From</label><Input type="date" /></div>
            <div><label className="text-xs text-muted-foreground">Date To</label><Input type="date" /></div>
            <div><label className="text-xs text-muted-foreground">Financial Year</label>
              <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                <option>2026-27</option><option>2025-26</option><option>2024-25</option>
              </select>
            </div>
            <div><label className="text-xs text-muted-foreground">Format</label>
              <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                <option>PDF</option><option>Excel</option><option>CSV</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Card key={report.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-sm mb-1">{report.title}</h3>
                  <p className="text-xs text-muted-foreground">{report.description}</p>
                </div>
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm">Generate</Button>
                <Button variant="ghost" size="sm" className="gap-1"><Download className="h-3 w-3" /> PDF</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
