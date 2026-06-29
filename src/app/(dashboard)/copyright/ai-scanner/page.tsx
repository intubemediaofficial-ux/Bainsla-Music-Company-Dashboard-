"use client";

import { Bot, Search, Play, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AiScannerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Copyright Scanner</h1>
          <p className="text-muted-foreground">Detect unauthorized usage of your content using AI</p>
        </div>
        <Button className="gap-2"><Play className="h-4 w-4" /> Run Full Scan</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">YouTube Scan</h3>
            <p className="text-sm text-muted-foreground mb-3">Scan for re-uploads, shorts, and unauthorized copies on YouTube</p>
            <Button variant="outline" size="sm" className="gap-2"><Search className="h-3 w-3" /> Scan YouTube</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Audio Fingerprint</h3>
            <p className="text-sm text-muted-foreground mb-3">Match audio fingerprints across streaming platforms</p>
            <Button variant="outline" size="sm" className="gap-2"><Search className="h-3 w-3" /> Scan Audio</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Social Media Scan</h3>
            <p className="text-sm text-muted-foreground mb-3">Detect reels, stories, and posts using your content</p>
            <Button variant="outline" size="sm" className="gap-2"><Search className="h-3 w-3" /> Scan Social</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Scan Configuration</CardTitle></CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Scan Target</label>
              <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                <option>All Songs</option>
                <option>Specific Song</option>
                <option>Specific Artist</option>
                <option>Recent Releases (30 days)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Platform</label>
              <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                <option>All Platforms</option>
                <option>YouTube</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Spotify</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Minimum Similarity %</label>
              <Input type="number" defaultValue="80" min="50" max="100" />
            </div>
            <div>
              <label className="text-sm font-medium">Risk Level Filter</label>
              <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                <option>All</option>
                <option>High Risk Only</option>
                <option>Medium & High</option>
              </select>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <Button type="button" className="gap-2"><Play className="h-4 w-4" /> Start Scan</Button>
              <Button type="button" variant="outline">Schedule Daily Scan</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Scan Results</CardTitle></CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Bot className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-medium mb-1">No Scan Results Yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Run your first scan to detect unauthorized copies of your content across platforms. AI will compare audio fingerprints, video content, and metadata.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
