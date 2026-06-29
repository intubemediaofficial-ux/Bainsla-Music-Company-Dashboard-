"use client";

import { useState } from "react";
import { FileText, Plus, Search, Filter, Download, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InvoicesPage() {
  const [showForm, setShowForm] = useState(false);

  const invoiceTypes = [
    "Tax Invoice", "Proforma Invoice", "Service Invoice", "Royalty Invoice",
    "Distribution Invoice", "Promotion Invoice", "License Invoice",
    "Studio Invoice", "Copyright Service Invoice", "Advance Invoice", "Final Invoice"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Invoice Generator</h1>
          <p className="text-muted-foreground">Create, send, and track invoices for clients and services</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> Create Invoice</Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search invoices by number, client..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Create New Invoice</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Invoice Type *</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="">Select type</option>
                  {invoiceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Invoice Number</label>
                <Input defaultValue="BM/FIN/2026-27/INV/0001" />
              </div>
              <div>
                <label className="text-sm font-medium">Invoice Date *</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date *</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Client Name *</label>
                <Input placeholder="Client name" />
              </div>
              <div>
                <label className="text-sm font-medium">Client GSTIN</label>
                <Input placeholder="GSTIN (if B2B)" />
              </div>
              <div>
                <label className="text-sm font-medium">Client Address</label>
                <Input placeholder="Client address" />
              </div>
              <div>
                <label className="text-sm font-medium">Place of Supply *</label>
                <Input placeholder="State/UT" />
              </div>
              <div>
                <label className="text-sm font-medium">HSN/SAC Code</label>
                <Input placeholder="999611" />
              </div>
              <div className="lg:col-span-3">
                <label className="text-sm font-medium">Service Description *</label>
                <textarea className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm bg-background" placeholder="Describe the service provided..." />
              </div>
              <div>
                <label className="text-sm font-medium">Subtotal (₹) *</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">Discount (₹)</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">Taxable Amount (₹)</label>
                <Input type="number" placeholder="Auto-calculated" />
              </div>
              <div>
                <label className="text-sm font-medium">CGST %</label>
                <Input type="number" placeholder="9" />
              </div>
              <div>
                <label className="text-sm font-medium">SGST %</label>
                <Input type="number" placeholder="9" />
              </div>
              <div>
                <label className="text-sm font-medium">IGST %</label>
                <Input type="number" placeholder="0" />
              </div>
              <div>
                <label className="text-sm font-medium">Grand Total (₹)</label>
                <Input type="number" placeholder="Auto-calculated" />
              </div>
              <div>
                <label className="text-sm font-medium">Payment Terms</label>
                <Input placeholder="Net 30 days" />
              </div>
              <div>
                <label className="text-sm font-medium">Bank Account</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option>Company Primary Account</option>
                </select>
              </div>
              <div className="lg:col-span-3">
                <label className="text-sm font-medium">Notes</label>
                <textarea className="w-full min-h-[40px] rounded-md border px-3 py-2 text-sm bg-background" placeholder="Additional notes..." />
              </div>
              <div className="lg:col-span-3 flex gap-3">
                <Button type="button">Create Invoice</Button>
                <Button type="button" variant="outline">Preview PDF</Button>
                <Button type="button" variant="outline">Save Draft</Button>
                <Button type="button" variant="outline" className="gap-2"><Send className="h-4 w-4" /> Send Email</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6 text-center py-8">
          <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-medium mb-1">Invoice Management</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Generate GST-compliant invoices with auto-numbering (BM/FIN/2026-27/INV/xxxx). Supports Tax Invoice, Proforma, Service, Royalty and more. Send via email or WhatsApp.
          </p>
          <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Create First Invoice</Button>
        </CardContent>
      </Card>
    </div>
  );
}
