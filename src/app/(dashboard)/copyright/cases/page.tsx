"use client";

import { useState } from "react";
import { Scale, Plus, Search, Filter, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CopyrightCasesPage() {
  const [showForm, setShowForm] = useState(false);

  const caseTypes = [
    "Unauthorized Upload", "Audio Copy", "Video Copy", "Lyrics Copy", "Thumbnail Copy",
    "Remix Without Permission", "Shorts Reuse", "Facebook Reupload", "Instagram Reel Copy",
    "Fake Claim Against Us", "Counter Claim Received", "Copyright Strike Sent",
    "DMCA Takedown", "Revenue Dispute", "Ownership Dispute", "Settlement Case"
  ];

  const priorities = ["Low", "Normal", "High", "Urgent", "Critical"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Copyright Cases</h1>
          <p className="text-muted-foreground">Track and manage all copyright disputes and enforcement actions</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> New Case
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search cases by title, code, platform..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Create New Case</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Case Title *</label>
                <Input placeholder="Describe the infringement" />
              </div>
              <div>
                <label className="text-sm font-medium">Case Type *</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="">Select type</option>
                  {caseTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Original URL</label>
                <Input placeholder="URL of your original content" />
              </div>
              <div>
                <label className="text-sm font-medium">Infringing URL *</label>
                <Input placeholder="URL of unauthorized copy" />
              </div>
              <div>
                <label className="text-sm font-medium">Platform</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="">Select platform</option>
                  <option>YouTube</option>
                  <option>Facebook</option>
                  <option>Instagram</option>
                  <option>Spotify</option>
                  <option>JioSaavn</option>
                  <option>Moj</option>
                  <option>Josh</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  {priorities.map(p => <option key={p} value={p.toUpperCase()}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Infringer Name</label>
                <Input placeholder="Channel / page name" />
              </div>
              <div>
                <label className="text-sm font-medium">Infringer Channel ID</label>
                <Input placeholder="Channel ID" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea className="w-full min-h-[80px] rounded-md border px-3 py-2 text-sm bg-background" placeholder="Detailed description of the infringement..." />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <Button type="button">Create Case</Button>
                <Button type="button" variant="outline">Save & Upload Evidence</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <Scale className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-medium mb-1">Case Management</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Track every copyright dispute from detection to resolution. Monitor case status, evidence collection, DMCA notices, platform responses, and legal escalations.
            </p>
            <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Create First Case</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
