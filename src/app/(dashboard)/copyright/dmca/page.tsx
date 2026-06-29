"use client";

import { useState } from "react";
import { AlertTriangle, Plus, Search, Bot, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DmcaPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">DMCA Notices</h1>
          <p className="text-muted-foreground">Generate, send, and track DMCA takedown notices</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Bot className="h-4 w-4" /> AI Generate</Button>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> New DMCA</Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Draft DMCA Notice</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Platform *</label>
                <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                  <option>YouTube</option>
                  <option>Facebook</option>
                  <option>Instagram</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Recipient Name</label>
                <Input placeholder="Channel/page owner name" />
              </div>
              <div>
                <label className="text-sm font-medium">Recipient Email</label>
                <Input type="email" placeholder="email@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Copyright Owner *</label>
                <Input defaultValue="Bainsla Music Pvt. Ltd." />
              </div>
              <div>
                <label className="text-sm font-medium">Original Work URL *</label>
                <Input placeholder="URL of your original content" />
              </div>
              <div>
                <label className="text-sm font-medium">Infringing Work URL *</label>
                <Input placeholder="URL of infringing content" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Original Work Description</label>
                <textarea className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm bg-background" placeholder="Describe your original work..." />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Notice Body</label>
                <textarea className="w-full min-h-[120px] rounded-md border px-3 py-2 text-sm bg-background" placeholder="DMCA notice content... (AI can generate this)" />
              </div>
              <div>
                <label className="text-sm font-medium">Signature Name *</label>
                <Input placeholder="Authorized person name" />
              </div>
              <div>
                <label className="text-sm font-medium">Signature Date</label>
                <Input type="date" />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <Button type="button">Save Draft</Button>
                <Button type="button" variant="outline" className="gap-2"><Bot className="h-4 w-4" /> AI Generate Notice</Button>
                <Button type="button" variant="outline" className="gap-2"><Send className="h-4 w-4" /> Send Notice</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6 text-center py-8">
          <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-medium mb-1">DMCA Notice Management</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Draft, review, and send DMCA takedown notices. AI can auto-generate legally compliant notices. Track delivery status, responses, and counter-notices.
          </p>
          <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Draft First DMCA Notice</Button>
        </CardContent>
      </Card>
    </div>
  );
}
