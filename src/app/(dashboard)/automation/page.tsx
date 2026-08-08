"use client";

import { useCallback, useEffect, useState } from "react";
import { Clock, Loader2, Play, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/format";

type Outcome = {
  ruleName: string;
  triggered: number;
  notified: number;
  message: string;
};

type LogRow = {
  id: string;
  triggerData: string | null;
  actionData: string | null;
  status: string;
  error: string | null;
  executedAt: string;
};

const BUILT_IN_CHECKS = [
  {
    check: "INVOICE_DUE_REMINDER",
    title: "Invoice Due Reminder",
    description: "Notify admins for invoices due within 3 days",
    trigger: "Schedule",
  },
  {
    check: "OVERDUE_INVOICE_ALERT",
    title: "Overdue Invoice Alert",
    description: "Mark invoices overdue and alert admins",
    trigger: "Condition",
  },
  {
    check: "PENDING_PAYMENT_ALERT",
    title: "Artist Payment Alert",
    description: "Alert when a payout is pending more than 7 days",
    trigger: "Condition",
  },
  {
    check: "SONG_WITHOUT_AGREEMENT",
    title: "Agreement Missing Alert",
    description: "Alert for songs with no signed agreement",
    trigger: "Event",
  },
  {
    check: "STALE_COPYRIGHT_CASE",
    title: "Copyright Follow-up",
    description: "Reminder when a case has no update for 7 days",
    trigger: "Schedule",
  },
  {
    check: "TASK_OVERDUE",
    title: "Overdue Task Reminder",
    description: "Notify assignees about tasks past their due date",
    trigger: "Schedule",
  },
  {
    check: "HIGH_RISK_AI_MATCH",
    title: "High Risk Match Alert",
    description: "Alert on high/critical AI copyright matches pending review",
    trigger: "AI",
  },
  {
    check: "GST_FILING_REMINDER",
    title: "GST Monthly Reminder",
    description: "Reminder when last month's GST entries are unfiled",
    trigger: "Monthly",
  },
];

export default function AutomationPage() {
  const [logs, setLogs] = useState<LogRow[]>([]);
  const [outcomes, setOutcomes] = useState<Outcome[] | null>(null);
  const [running, setRunning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadLogs = useCallback(async () => {
    const res = await fetch("/api/automation/logs", { cache: "no-store" });
    if (res.ok) setLogs((await res.json()) as LogRow[]);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => void loadLogs(), 0);
    return () => clearTimeout(timer);
  }, [loadLogs]);

  async function run(check?: string) {
    setRunning(check ?? "all");
    setError(null);
    try {
      const res = await fetch("/api/automation/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(check ? { check } : {}),
      });
      if (!res.ok) throw new Error("Automation run failed");
      const data = (await res.json()) as { outcomes: Outcome[] };
      setOutcomes(data.outcomes);
      await loadLogs();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setRunning(null);
    }
  }

  const triggeredToday = logs.filter(
    (log) => new Date(log.executedAt).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Automation Engine</h1>
          <p className="text-muted-foreground">
            Reminders, alerts and background checks running on live company data
          </p>
        </div>
        <Button className="gap-2" disabled={running !== null} onClick={() => void run()}>
          {running === "all" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          Run All Automations
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Built-in Rules</p>
            <p className="text-2xl font-bold text-green-500">{BUILT_IN_CHECKS.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Runs Today</p>
            <p className="text-2xl font-bold text-blue-500">{triggeredToday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Items Flagged (last run)</p>
            <p className="text-2xl font-bold text-amber-500">
              {outcomes?.reduce((sum, o) => sum + o.triggered, 0) ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Notifications Sent</p>
            <p className="text-2xl font-bold text-purple-500">
              {outcomes?.reduce((sum, o) => sum + o.notified, 0) ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {BUILT_IN_CHECKS.map((rule) => {
              const outcome = outcomes?.find((o) => o.ruleName === rule.title);
              return (
                <div
                  key={rule.check}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">{rule.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {outcome ? outcome.message : rule.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{rule.trigger}</Badge>
                    {outcome && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-500"
                      >
                        {outcome.triggered} flagged
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`Run ${rule.title}`}
                      disabled={running !== null}
                      onClick={() => void run(rule.check)}
                    >
                      {running === rule.check ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Play className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4" /> Job History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No automation runs yet. Press “Run All Automations” to execute every check now.
            </p>
          ) : (
            <div className="space-y-2">
              {logs.slice(0, 25).map((log) => (
                <div
                  key={log.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-2 text-xs"
                >
                  <span className="font-medium">{log.triggerData}</span>
                  <span className="text-muted-foreground">
                    {log.error ?? log.actionData}
                  </span>
                  <span className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={
                        log.status === "success"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }
                    >
                      {log.status}
                    </Badge>
                    <span className="text-muted-foreground">
                      {formatDateTime(log.executedAt)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
