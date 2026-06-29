"use client";

import { useState } from "react";
import { FileText, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function CopyrightAssetsPage() {
  const [showForm, setShowForm] = useState(false);

  const assetTypes = [
    "Audio Master", "Lyrics", "Composition", "Video", "Artwork", "Thumbnail",
    "Album Cover", "Short Audio", "Reel Audio", "Live Audio", "Remix", "Karaoke", "Instrumental", "Full Song Package"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Song Rights Registry</h1>
          <p className="text-muted-foreground">Complete ownership records for all copyright assets</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Copyright Asset
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by title, ISRC, artist..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Add New Copyright Asset</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Asset Title *</label>
                <Input placeholder="Song / content title" />
              </div>
              <div>
                <label className="text-sm font-medium">Asset Type *</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="">Select type</option>
                  {assetTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Language</label>
                <Input placeholder="Hindi" />
              </div>
              <div>
                <label className="text-sm font-medium">Genre</label>
                <Input placeholder="Bhajan / Rasiya / Folk" />
              </div>
              <div>
                <label className="text-sm font-medium">Primary Artist</label>
                <Input placeholder="Singer / Artist name" />
              </div>
              <div>
                <label className="text-sm font-medium">ISRC Code</label>
                <Input placeholder="ISRC..." />
              </div>
              <div>
                <label className="text-sm font-medium">UPC Code</label>
                <Input placeholder="UPC..." />
              </div>
              <div>
                <label className="text-sm font-medium">YouTube Video ID</label>
                <Input placeholder="Video ID" />
              </div>
              <div>
                <label className="text-sm font-medium">Release Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Label Name</label>
                <Input placeholder="Bainsla Music" defaultValue="Bainsla Music" />
              </div>
              <div>
                <label className="text-sm font-medium">Producer</label>
                <Input placeholder="Producer name" />
              </div>
              <div>
                <label className="text-sm font-medium">Ownership Status</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="OWNED_BY_COMPANY">Owned by Company</option>
                  <option value="LICENSED_TO_COMPANY">Licensed to Company</option>
                  <option value="PENDING_AGREEMENT">Pending Agreement</option>
                  <option value="SHARED_RIGHTS">Shared Rights</option>
                  <option value="THIRD_PARTY_RIGHTS">Third Party Rights</option>
                </select>
              </div>
              <div className="md:col-span-2 lg:col-span-3 flex gap-3">
                <Button type="button">Save Draft</Button>
                <Button type="button" variant="outline">Save & Add Rights</Button>
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
            <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-medium mb-1">Copyright Assets Registry</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Register every song, audio master, lyrics, composition, video, thumbnail, and artwork as a copyright asset. Each asset tracks ownership, agreements, evidence, and claims.
            </p>
            <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Register First Asset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
