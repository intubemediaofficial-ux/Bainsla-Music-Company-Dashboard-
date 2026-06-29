"use client";

import { useState } from "react";
import { Clock, MapPin, Camera, QrCode, Users, Calendar, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AttendancePage() {
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Attendance System</h1>
          <p className="text-muted-foreground">Staff check-in/out, GPS tracking, QR attendance & leave management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Calendar className="h-4 w-4" /> History</Button>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Present Today</p><p className="text-2xl font-bold text-green-500">0</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Absent Today</p><p className="text-2xl font-bold text-red-500">0</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">On Leave</p><p className="text-2xl font-bold text-amber-500">0</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Late Today</p><p className="text-2xl font-bold text-orange-500">0</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Quick Check-In</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-center p-6 border rounded-lg">
                <Clock className="h-10 w-10 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">{new Date().toLocaleTimeString()}</p>
                <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                <Badge variant={checkedIn ? "secondary" : "outline"} className="mt-2">
                  {checkedIn ? "Checked In" : "Not Checked In"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => setCheckedIn(true)} disabled={checkedIn} className="gap-2"><Clock className="h-4 w-4" /> Check In</Button>
                <Button onClick={() => setCheckedIn(false)} disabled={!checkedIn} variant="outline" className="gap-2"><Clock className="h-4 w-4" /> Check Out</Button>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Check-in Methods</h4>
              <Button variant="outline" className="w-full justify-start gap-2"><MapPin className="h-4 w-4" /> GPS Check-In</Button>
              <Button variant="outline" className="w-full justify-start gap-2"><QrCode className="h-4 w-4" /> QR Code Scan</Button>
              <Button variant="outline" className="w-full justify-start gap-2"><Camera className="h-4 w-4" /> Selfie Check-In</Button>
              <Button variant="outline" className="w-full justify-start gap-2"><Users className="h-4 w-4" /> Admin Mark Attendance</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Today&apos;s Attendance</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-6">No attendance records for today. Staff will appear here after checking in.</p>
        </CardContent>
      </Card>

      <div className="flex gap-2 flex-wrap">
        <Button variant="outline">Apply Leave</Button>
        <Button variant="outline">Request Correction</Button>
        <Button variant="outline">View Monthly Report</Button>
        <Button variant="outline">Manage Holidays</Button>
        <Button variant="outline">Shift Settings</Button>
      </div>
    </div>
  );
}
