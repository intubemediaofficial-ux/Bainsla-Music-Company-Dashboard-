"use client";

import { useState } from "react";
import { Receipt, Plus, Search, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReceiptsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Receipt Generator</h1>
          <p className="text-muted-foreground">Generate and manage payment receipts</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> Generate Receipt</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Generate New Receipt</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Receipt Number</label>
                <Input defaultValue="BM/FIN/2026-27/REC/0001" />
              </div>
              <div>
                <label className="text-sm font-medium">Receipt Date *</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Received From *</label>
                <Input placeholder="Client / payer name" />
              </div>
              <div>
                <label className="text-sm font-medium">Amount Received (₹) *</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">Payment Mode *</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option>Bank Transfer</option>
                  <option>UPI</option>
                  <option>Cash</option>
                  <option>Cheque</option>
                  <option>Online Gateway</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Transaction ID</label>
                <Input placeholder="Transaction reference" />
              </div>
              <div>
                <label className="text-sm font-medium">Link to Invoice</label>
                <Input placeholder="Invoice number (optional)" />
              </div>
              <div>
                <label className="text-sm font-medium">Purpose</label>
                <Input placeholder="Payment purpose" />
              </div>
              <div>
                <label className="text-sm font-medium">Balance Amount (₹)</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="lg:col-span-3">
                <label className="text-sm font-medium">Notes</label>
                <textarea className="w-full min-h-[40px] rounded-md border px-3 py-2 text-sm bg-background" placeholder="Additional notes..." />
              </div>
              <div className="lg:col-span-3 flex gap-3">
                <Button type="button">Generate Receipt</Button>
                <Button type="button" variant="outline">Preview</Button>
                <Button type="button" variant="outline" className="gap-2"><Download className="h-4 w-4" /> Download PDF</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6 text-center py-8">
          <Receipt className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-medium mb-1">Receipt Management</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Generate receipts after payment is received. Auto-numbered (BM/FIN/2026-27/REC/xxxx). Link to invoices, download PDF, send via WhatsApp or email.
          </p>
          <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Generate First Receipt</Button>
        </CardContent>
      </Card>
    </div>
  );
}
