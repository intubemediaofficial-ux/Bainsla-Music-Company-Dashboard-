"use client";

import { BarChart3, TrendingUp, Music, Users, MonitorPlay, IndianRupee, Bot, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AnalyticsPage() {
  const kpis = [
    { label: "Total Revenue", value: "₹0", change: "+0%", color: "text-green-500" },
    { label: "Total Songs", value: "0", change: "+0", color: "text-blue-500" },
    { label: "Active Artists", value: "0", change: "+0", color: "text-purple-500" },
    { label: "YouTube Views", value: "0", change: "+0%", color: "text-red-500" },
    { label: "Revenue/Song Avg", value: "₹0", change: "—", color: "text-amber-500" },
    { label: "Copyright Claims Won", value: "0", change: "+0", color: "text-cyan-500" },
    { label: "Avg Release Time", value: "0d", change: "—", color: "text-orange-500" },
    { label: "Client Satisfaction", value: "—", change: "—", color: "text-emerald-500" },
  ];

  const reportCategories = [
    { title: "Revenue Analytics", description: "Platform-wise, song-wise, artist-wise revenue breakdown", icon: IndianRupee },
    { title: "Song Performance", description: "Streams, views, downloads, growth per song", icon: Music },
    { title: "Artist Analytics", description: "Artist profitability, output, engagement", icon: Users },
    { title: "YouTube Analytics", description: "Channel growth, CTR, retention, revenue", icon: MonitorPlay },
    { title: "Copyright Analytics", description: "Claims success rate, revenue recovery, risk", icon: BarChart3 },
    { title: "AI Predictions", description: "Revenue forecast, trend analysis, growth prediction", icon: Bot },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Business Intelligence</h1>
          <p className="text-muted-foreground">Revenue, song, artist, YouTube & copyright analytics with AI predictions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div><label className="text-xs text-muted-foreground">Period</label>
              <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                <option>This Month</option><option>Last Month</option><option>This Quarter</option><option>This Year</option><option>Custom</option>
              </select>
            </div>
            <div><label className="text-xs text-muted-foreground">From</label><Input type="date" /></div>
            <div><label className="text-xs text-muted-foreground">To</label><Input type="date" /></div>
            <div><label className="text-xs text-muted-foreground">Compare With</label>
              <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                <option>Previous Period</option><option>Same Period Last Year</option><option>None</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.change} vs prev</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Card key={cat.title} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <Icon className="h-8 w-8 mb-3 text-blue-500" />
                <h3 className="font-medium mb-1">{cat.title}</h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader><CardTitle>AI Insights</CardTitle></CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Bot className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">AI will analyze your data and provide revenue forecasts, growth predictions, risk alerts, and optimization suggestions.</p>
            <Button className="gap-2"><Bot className="h-4 w-4" /> Generate AI Insights</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
