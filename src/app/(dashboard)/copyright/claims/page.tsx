"use client";

import { useState } from "react";
import { Shield, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CopyrightClaimsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Claims Center</h1>
          <p className="text-muted-foreground">Manage YouTube, Facebook, Instagram and platform copyright claims</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> New Claim
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search claims..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Submit New Claim</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Claim Type *</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="">Select type</option>
                  <option>YouTube Copyright Claim</option>
                  <option>YouTube Content ID Claim</option>
                  <option>YouTube Manual Claim</option>
                  <option>YouTube Strike</option>
                  <option>Facebook Rights Manager</option>
                  <option>Instagram Rights Claim</option>
                  <option>DMCA Notice</option>
                  <option>Email Notice</option>
                  <option>Legal Notice</option>
                  <option>Distributor Claim</option>
                  <option>CMS Claim</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Platform</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option>YouTube</option>
                  <option>Facebook</option>
                  <option>Instagram</option>
                  <option>Spotify</option>
                  <option>JioSaavn</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Target URL *</label>
                <Input placeholder="URL of infringing content" />
              </div>
              <div>
                <label className="text-sm font-medium">Target Video/Channel ID</label>
                <Input placeholder="Video or channel ID" />
              </div>
              <div>
                <label className="text-sm font-medium">Claim Action</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option value="MONETIZE">Monetize</option>
                  <option value="TRACK">Track</option>
                  <option value="BLOCK">Block</option>
                  <option value="TAKEDOWN">Takedown</option>
                  <option value="STRIKE">Strike</option>
                  <option value="REQUEST_REMOVAL">Request Removal</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Claim Reason</label>
                <Input placeholder="Reason for claim" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Claim Text</label>
                <textarea className="w-full min-h-[80px] rounded-md border px-3 py-2 text-sm bg-background" placeholder="Detailed claim text..." />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <Button type="button">Submit Claim</Button>
                <Button type="button" variant="outline">Save as Draft</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6 text-center py-8">
          <Shield className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-medium mb-1">Claims Management</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Submit and track copyright claims across YouTube, Facebook, Instagram, and other platforms. Monitor claim status, platform decisions, and revenue recovery.
          </p>
          <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Submit First Claim</Button>
        </CardContent>
      </Card>
    </div>
  );
}
