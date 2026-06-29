"use client";

import { useState } from "react";
import { TrendingDown, Plus, Search, Filter, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ExpenseManagementPage() {
  const [showForm, setShowForm] = useState(false);

  const expenseCategories = [
    "Artist Payment", "Singer Payment", "Lyricist Payment", "Composer Payment",
    "Music Director Payment", "Studio Recording Payment", "Video Shooting Expense",
    "Video Editing Expense", "Thumbnail Design Expense", "Poster Design Expense",
    "Promotion Expense", "YouTube Ads Expense", "Facebook Ads Expense",
    "Instagram Ads Expense", "Distribution Fee", "Copyright Legal Expense",
    "DMCA Legal Expense", "Office Rent", "Staff Salary", "Travel Expense",
    "Food Expense", "Equipment Purchase", "Software Subscription",
    "Website Expense", "Server Expense", "GST Payment", "Tax Payment",
    "Bank Charges", "Loan Payment", "Other Expense"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Expense Management</h1>
          <p className="text-muted-foreground">Track all company expenses — artist, studio, promotion, operations & more</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> Add Expense</Button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search expenses..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Add New Expense</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Expense Title *</label>
                <Input placeholder="Title for this expense" />
              </div>
              <div>
                <label className="text-sm font-medium">Category *</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="">Select category</option>
                  {expenseCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Amount (₹) *</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">Expense Date *</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Paid Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Payment Mode</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="">Select mode</option>
                  <option>Bank Transfer</option>
                  <option>UPI</option>
                  <option>Cash</option>
                  <option>Cheque</option>
                  <option>Wallet</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Vendor / Payee</label>
                <Input placeholder="Vendor or payee name" />
              </div>
              <div>
                <label className="text-sm font-medium">Artist</label>
                <Input placeholder="Artist name (if applicable)" />
              </div>
              <div>
                <label className="text-sm font-medium">Song / Project</label>
                <Input placeholder="Related song or project" />
              </div>
              <div>
                <label className="text-sm font-medium">GST Amount (₹)</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">TDS Amount (₹)</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">Net Paid (₹)</label>
                <Input type="number" placeholder="Auto-calculated" />
              </div>
              <div>
                <label className="text-sm font-medium">Bill Number</label>
                <Input placeholder="Bill/Invoice number" />
              </div>
              <div>
                <label className="text-sm font-medium">Transaction ID</label>
                <Input placeholder="Bank transaction ID" />
              </div>
              <div>
                <label className="text-sm font-medium">Approval Required?</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="lg:col-span-3">
                <label className="text-sm font-medium">Notes</label>
                <textarea className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm bg-background" placeholder="Additional notes..." />
              </div>
              <div className="lg:col-span-3">
                <label className="text-sm font-medium">Upload Bill / Proof</label>
                <Input type="file" />
              </div>
              <div className="lg:col-span-3 flex gap-3">
                <Button type="button">Save Expense</Button>
                <Button type="button" variant="outline">Send for Approval</Button>
                <Button type="button" variant="outline">Mark as Paid</Button>
                <Button type="button" variant="outline">Save as Draft</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6 text-center py-8">
          <TrendingDown className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-medium mb-1">Expense Tracking</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Record every expense — artist payments, studio recording, video shooting, promotion, software, salaries, and all operational costs with bill uploads and approval workflow.
          </p>
          <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Add First Expense</Button>
        </CardContent>
      </Card>
    </div>
  );
}
