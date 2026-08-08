"use client";

import { useCallback, useEffect, useState } from "react";
import { Clock, LogIn, LogOut, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDateTime } from "@/lib/format";

type Record = {
  id: string;
  attendanceDate: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  checkInLatitude: number | null;
  checkInLongitude: number | null;
  workingMinutes: number | null;
  status: string;
};

function position(): Promise<{ latitude?: number; longitude?: number; accuracy?: number }> {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    return Promise.resolve({});
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
      () => resolve({}),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });
}

function formatMinutes(minutes: number | null): string {
  if (minutes === null) return "—";
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export default function AttendancePage() {
  const [today, setToday] = useState<Record | null>(null);
  const [records, setRecords] = useState<Record[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/attendance", { cache: "no-store" });
    if (!res.ok) {
      setError("Could not load attendance");
      return;
    }
    const data = (await res.json()) as { today: Record | null; records: Record[] };
    setToday(data.today);
    setRecords(data.records);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);

  async function submit(method: "POST" | "PUT") {
    setBusy(true);
    setError(null);
    setMessage(null);
    const coords = await position();
    const res = await fetch("/api/attendance", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coords),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Request failed");
      return;
    }
    setMessage(
      method === "POST"
        ? coords.latitude
          ? "Checked in with GPS location saved."
          : "Checked in (location permission not granted)."
        : "Checked out successfully."
    );
    await load();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Attendance</h1>
        <p className="text-muted-foreground">
          GPS-based check-in / check-out with working hours
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}
      {message && (
        <div className="rounded-md border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-600">
          {message}
        </div>
      )}

      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Today</p>
            <p className="text-lg font-semibold">
              {today?.checkInTime
                ? `Checked in at ${new Date(today.checkInTime).toLocaleTimeString("en-IN")}`
                : "Not checked in yet"}
            </p>
            {today?.checkOutTime && (
              <p className="text-sm text-muted-foreground">
                Checked out at{" "}
                {new Date(today.checkOutTime).toLocaleTimeString("en-IN")} ·{" "}
                {formatMinutes(today.workingMinutes)} worked
              </p>
            )}
            {today?.checkInLatitude != null && (
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {today.checkInLatitude.toFixed(5)}, {today.checkInLongitude?.toFixed(5)}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              className="gap-2"
              disabled={busy || Boolean(today)}
              onClick={() => void submit("POST")}
            >
              <LogIn className="h-4 w-4" /> Check In
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              disabled={busy || !today || Boolean(today?.checkOutTime)}
              onClick={() => void submit("PUT")}
            >
              <LogOut className="h-4 w-4" /> Check Out
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4" /> My Attendance History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {records.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No attendance records yet.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Date</th>
                  <th className="p-3 text-left font-medium">Check In</th>
                  <th className="p-3 text-left font-medium">Check Out</th>
                  <th className="p-3 text-left font-medium">Worked</th>
                  <th className="p-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-b">
                    <td className="p-3">{formatDate(record.attendanceDate)}</td>
                    <td className="p-3 text-muted-foreground">
                      {record.checkInTime ? formatDateTime(record.checkInTime) : "—"}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {record.checkOutTime ? formatDateTime(record.checkOutTime) : "—"}
                    </td>
                    <td className="p-3">{formatMinutes(record.workingMinutes)}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-[10px]">
                        {record.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
