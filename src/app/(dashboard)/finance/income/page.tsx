"use client";

import { useState } from "react";
import { TrendingUp, Plus, Search, Filter, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function IncomeManagementPage() {
  const [showForm, setShowForm] = useState(false);

  const incomeSources = [
    "YouTube Revenue", "YouTube CMS Revenue", "YouTube Content ID Revenue",
    "Facebook Revenue", "Instagram Revenue", "Spotify Revenue", "Apple Music Revenue",
    "JioSaavn Revenue", "Wynk Revenue", "Gaana Revenue", "Amazon Music Revenue",
    "Distribution Revenue", "Client Payment", "Song Sale", "Music License Fee",
    "Copyright Claim Recovery", "DMCA Settlement", "Channel Sale Income",
    "Promotion Service Income", "Studio Rental Income", "Ad Revenue",
    "Sponsorship Income", "Royalty Income", "Advance Received", "Other Income"
  ];

  const paymentModes = ["Bank Transfer", "UPI", "Cash", "Cheque", "Wallet", "Online Gateway", "Other"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Income Management</h1>
          <p className="text-muted-foreground">Track all income sources — YouTube, Spotify, clients, licensing & more</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> Add Income</Button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search income entries..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Add New Income</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Income Title *</label>
                <Input placeholder="Title for this income" />
              </div>
              <div>
                <label className="text-sm font-medium">Income Source *</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="">Select source</option>
                  {incomeSources.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Amount (₹) *</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">Income Date *</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Received Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Payment Mode</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="">Select mode</option>
                  {paymentModes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Client</label>
                <Input placeholder="Client name (optional)" />
              </div>
              <div>
                <label className="text-sm font-medium">Song</label>
                <Input placeholder="Related song (optional)" />
              </div>
              <div>
                <label className="text-sm font-medium">Platform</label>
                <Input placeholder="Platform name" />
              </div>
              <div>
                <label className="text-sm font-medium">GST Applicable?</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">GST Amount (₹)</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">TDS Deducted (₹)</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">Net Received (₹)</label>
                <Input type="number" placeholder="Auto-calculated" />
              </div>
              <div>
                <label className="text-sm font-medium">Transaction ID</label>
                <Input placeholder="Bank transaction ID" />
              </div>
              <div>
                <label className="text-sm font-medium">Reference Number</label>
                <Input placeholder="Reference" />
              </div>
              <div className="lg:col-span-3">
                <label className="text-sm font-medium">Notes</label>
                <textarea className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm bg-background" placeholder="Additional notes..." />
              </div>
              <div className="lg:col-span-3">
                <label className="text-sm font-medium">Upload Proof</label>
                <Input type="file" />
              </div>
              <div className="lg:col-span-3 flex gap-3">
                <Button type="button">Save Income</Button>
                <Button type="button" variant="outline">Save & Create Receipt</Button>
                <Button type="button" variant="outline">Save as Draft</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6 text-center py-8">
          <TrendingUp className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-medium mb-1">Income Tracking</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Record income from YouTube, Spotify, Apple Music, JioSaavn, client payments, song sales, royalties, and all other revenue sources. GST & TDS handled automatically.
          </p>
          <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Add First Income</Button>
        </CardContent>
      </Card>
    </div>
  );
}
