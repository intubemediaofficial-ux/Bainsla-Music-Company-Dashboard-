"use client";

import { Zap, Plus, Clock, Bell, Bot, Play, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AutomationPage() {
  const automationRules = [
    { title: "Invoice Due Reminder", description: "Send reminder 3 days before invoice due date", trigger: "Schedule", status: "active" },
    { title: "Artist Payment Alert", description: "Notify when artist payment is pending > 7 days", trigger: "Condition", status: "active" },
    { title: "Agreement Missing Alert", description: "Alert when song has no signed agreement", trigger: "Event", status: "active" },
    { title: "Copyright Follow-up", description: "Reminder if copyright case has no update for 7 days", trigger: "Schedule", status: "active" },
    { title: "Release Checklist Check", description: "Verify all requirements before release date", trigger: "Schedule", status: "active" },
    { title: "Daily Finance Summary", description: "Auto-generate daily income/expense summary", trigger: "Daily", status: "active" },
    { title: "YouTube SEO Alert", description: "Alert if release date < 3 days and no SEO ready", trigger: "Condition", status: "active" },
    { title: "GST Monthly Reminder", description: "Monthly GST filing reminder", trigger: "Monthly", status: "active" },
    { title: "Revenue Drop Alert", description: "AI alert when platform revenue drops > 20%", trigger: "AI", status: "active" },
    { title: "Duplicate Transaction Check", description: "Detect and flag duplicate financial entries", trigger: "Event", status: "active" },
    { title: "Monthly Report Generation", description: "Auto-generate monthly finance & performance report", trigger: "Monthly", status: "active" },
    { title: "New Song Checklist", description: "Auto-create task checklist when new song is added", trigger: "Event", status: "active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Automation Engine</h1>
          <p className="text-muted-foreground">Workflow automation, reminders, background jobs & AI alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Settings className="h-4 w-4" /> Settings</Button>
          <Button className="gap-2"><Plus className="h-4 w-4" /> New Automation</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Active Rules</p><p className="text-2xl font-bold text-green-500">{automationRules.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Triggered Today</p><p className="text-2xl font-bold text-blue-500">0</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Pending Actions</p><p className="text-2xl font-bold text-amber-500">0</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">AI Alerts</p><p className="text-2xl font-bold text-purple-500">0</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Automation Rules</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {automationRules.map((rule) => (
              <div key={rule.title} className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium text-sm">{rule.title}</p>
                    <p className="text-xs text-muted-foreground">{rule.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{rule.trigger}</Badge>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500">{rule.status}</Badge>
                  <Button variant="ghost" size="sm"><Play className="h-3 w-3" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" className="gap-2"><Bot className="h-4 w-4" /> AI Smart Suggestions</Button>
        <Button variant="outline" className="gap-2"><Clock className="h-4 w-4" /> View Job History</Button>
        <Button variant="outline" className="gap-2"><Bell className="h-4 w-4" /> Notification Templates</Button>
      </div>
    </div>
  );
}
