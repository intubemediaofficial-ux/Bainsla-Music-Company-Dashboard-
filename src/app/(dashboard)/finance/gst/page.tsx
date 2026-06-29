"use client";

import { IndianRupee, FileText, Download, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GstTaxPage() {
  const gstStats = [
    { label: "Output GST", value: "₹0", color: "text-red-500" },
    { label: "Input GST", value: "₹0", color: "text-green-500" },
    { label: "GST Payable", value: "₹0", color: "text-amber-500" },
    { label: "GST Credit Available", value: "₹0", color: "text-blue-500" },
    { label: "B2B Sales", value: "₹0", color: "text-purple-500" },
    { label: "B2C Sales", value: "₹0", color: "text-cyan-500" },
  ];

  const tdsStats = [
    { label: "TDS Deducted by Clients", value: "₹0" },
    { label: "TDS Deducted on Artist Payments", value: "₹0" },
    { label: "TDS Deducted on Vendor Payments", value: "₹0" },
    { label: "TDS Certificates Pending", value: "0" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">GST & Tax Management</h1>
          <p className="text-muted-foreground">GST calculation, TDS tracking, tax reports & compliance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export GSTR Summary</Button>
          <Button className="gap-2"><Calculator className="h-4 w-4" /> GST Calculator</Button>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>GST Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gstStats.map((stat) => (
              <div key={stat.label} className="p-3 rounded-md border">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>GST Rules</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>• Same state client → CGST + SGST applies</p>
            <p>• Different state client → IGST applies</p>
            <p>• GSTIN available → B2B invoice</p>
            <p>• GSTIN missing → B2C invoice</p>
            <p>• Expense bill GST → Input credit</p>
            <p>• Output GST - Input GST = GST Payable</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>TDS Management</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {tdsStats.map((stat) => (
              <div key={stat.label} className="p-3 rounded-md border">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Add TDS Entry</Button>
            <Button variant="outline" size="sm">Upload Certificate</Button>
            <Button variant="outline" size="sm">Generate TDS Report</Button>
            <Button variant="outline" size="sm">Export for CA</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" className="gap-2"><FileText className="h-4 w-4" /> Generate GST Report</Button>
        <Button variant="outline">Check Missing GSTIN</Button>
        <Button variant="outline">View Invoice GST</Button>
        <Button variant="outline">View Expense GST</Button>
        <Button variant="outline">Add GST Payment</Button>
      </div>
    </div>
  );
}
