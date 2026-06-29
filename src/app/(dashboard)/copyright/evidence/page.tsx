"use client";

import { useState } from "react";
import { Upload, Plus, Search, Filter, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CopyrightEvidencePage() {
  const [showForm, setShowForm] = useState(false);

  const evidenceTypes = [
    "Signed Agreement", "Studio Invoice", "Raw Audio File", "Project File", "Lyrics File",
    "Video Project File", "Thumbnail Source File", "Release Screenshot", "YouTube Upload Screenshot",
    "YouTube Studio Screenshot", "Distribution Dashboard Screenshot", "ISRC Certificate",
    "UPC Certificate", "Payment Proof", "WhatsApp Chat", "Email Permission",
    "Artist ID Proof", "Studio Permission", "Copyright Registration",
    "Audio Fingerprint Report", "AI Similarity Report", "DMCA Notice Copy"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Evidence Vault</h1>
          <p className="text-muted-foreground">Store, verify, and manage copyright evidence and proofs</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> Upload Evidence
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search evidence..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Upload New Evidence</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Evidence Title *</label>
                <Input placeholder="Title for this evidence" />
              </div>
              <div>
                <label className="text-sm font-medium">Evidence Type *</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="">Select type</option>
                  {evidenceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Related Asset / Song</label>
                <Input placeholder="Link to asset or song" />
              </div>
              <div>
                <label className="text-sm font-medium">Platform</label>
                <Input placeholder="YouTube, Spotify, etc." />
              </div>
              <div>
                <label className="text-sm font-medium">Source URL</label>
                <Input placeholder="URL where evidence was captured" />
              </div>
              <div>
                <label className="text-sm font-medium">Captured Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Legal Weight</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="LOW_WEIGHT">Low</option>
                  <option value="MEDIUM_WEIGHT">Medium</option>
                  <option value="HIGH_WEIGHT">High</option>
                  <option value="CRITICAL_WEIGHT">Critical</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Primary Evidence?</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm bg-background" placeholder="Describe this evidence..." />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Upload File</label>
                <Input type="file" />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <Button type="button">Upload & Save</Button>
                <Button type="button" variant="outline">Mark as Verified</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6 text-center py-8">
          <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-medium mb-1">Evidence Management</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload and verify evidence including signed agreements, raw audio files, release screenshots, payment proofs, studio invoices, ISRC certificates, and more. Each evidence is hashed and timestamped for legal validity.
          </p>
          <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Upload First Evidence</Button>
        </CardContent>
      </Card>
    </div>
  );
}
