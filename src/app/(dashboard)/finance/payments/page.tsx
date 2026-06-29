"use client";

import { useState } from "react";
import { CreditCard, Plus, Search, Filter, Users, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function PaymentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("artist");

  const tabs = [
    { id: "artist", label: "Artist Payments" },
    { id: "studio", label: "Studio Payments" },
    { id: "vendor", label: "Vendor Payments" },
  ];

  const paymentTypes: Record<string, string[]> = {
    artist: ["Fixed Payment", "Advance Payment", "Royalty Payment", "Revenue Share", "Settlement Payment", "Performance Payment", "Lyrics Payment", "Composition Payment", "One-time Buyout", "Bonus Payment"],
    studio: ["Recording Payment", "Mixing Payment", "Mastering Payment", "Full Production Payment", "Music Arrangement", "Session Charges", "Hourly Studio Charges", "Package Payment", "Advance Payment", "Balance Payment"],
    vendor: ["Thumbnail Design", "Poster Design", "Video Editing", "Camera/DOP", "Makeup Artist", "Location Vendor", "Promotion Agency", "Developer", "Legal Consultant", "CA/Accountant", "Office Supplier"],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payment Management</h1>
          <p className="text-muted-foreground">Manage artist, studio, and vendor payments</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> Create Payment</Button>
      </div>

      <div className="flex gap-2 border-b pb-2">
        {tabs.map(tab => (
          <Button key={tab.id} variant={activeTab === tab.id ? "default" : "ghost"} size="sm" onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </Button>
        ))}
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Create {activeTab === "artist" ? "Artist" : activeTab === "studio" ? "Studio" : "Vendor"} Payment</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">{activeTab === "artist" ? "Artist" : activeTab === "studio" ? "Studio" : "Vendor"} Name *</label>
                <Input placeholder="Name" />
              </div>
              <div>
                <label className="text-sm font-medium">Payment Type *</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="">Select type</option>
                  {(paymentTypes[activeTab] || []).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Song / Project</label>
                <Input placeholder="Related song or project" />
              </div>
              <div>
                <label className="text-sm font-medium">Gross Amount (₹) *</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">TDS Amount (₹)</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">Net Payable (₹)</label>
                <Input type="number" placeholder="Auto-calculated" />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Payment Mode</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option>Bank Transfer</option>
                  <option>UPI</option>
                  <option>Cash</option>
                  <option>Cheque</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Agreement Linked?</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="lg:col-span-3">
                <label className="text-sm font-medium">Notes</label>
                <textarea className="w-full min-h-[40px] rounded-md border px-3 py-2 text-sm bg-background" placeholder="Notes..." />
              </div>
              <div className="lg:col-span-3 flex gap-3">
                <Button type="button">Create Payment</Button>
                <Button type="button" variant="outline">Send for Approval</Button>
                <Button type="button" variant="outline">Mark Paid</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6 text-center py-8">
          <CreditCard className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-medium mb-1">{activeTab === "artist" ? "Artist" : activeTab === "studio" ? "Studio" : "Vendor"} Payments</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {activeTab === "artist" && "Manage fixed payments, advances, royalty shares, revenue shares, and settlements for singers, lyricists, composers, and performers."}
            {activeTab === "studio" && "Track recording, mixing, mastering, and production payments for studio services."}
            {activeTab === "vendor" && "Manage payments for thumbnail designers, video editors, cameramen, promotion agencies, and all external vendors."}
          </p>
          <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Create First Payment</Button>
        </CardContent>
      </Card>
    </div>
  );
}
