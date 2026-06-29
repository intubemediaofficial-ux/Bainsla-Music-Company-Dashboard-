import { Music, Upload, CreditCard, FileText, MessageSquare, PenTool } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudioPortalPage() {
  const stats = [
    { label: "Assigned Songs", value: "0", color: "text-blue-500" },
    { label: "Recording Pending", value: "0", color: "text-amber-500" },
    { label: "Recording Completed", value: "0", color: "text-green-500" },
    { label: "Bills Pending", value: "0", color: "text-orange-500" },
    { label: "Payments Pending", value: "₹0", color: "text-red-500" },
    { label: "Payments Paid", value: "₹0", color: "text-green-500" },
    { label: "Agreements Pending", value: "0", color: "text-purple-500" },
    { label: "Files Uploaded", value: "0", color: "text-cyan-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Studio Portal</h1>
        <p className="text-muted-foreground">Manage assigned songs, upload recordings, submit bills & track payments</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Music className="h-8 w-8 mb-3 text-blue-500" />
            <h3 className="font-medium mb-1">Assigned Songs</h3>
            <p className="text-sm text-muted-foreground">View songs assigned for recording/mixing</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Upload className="h-8 w-8 mb-3 text-green-500" />
            <h3 className="font-medium mb-1">Upload Files</h3>
            <p className="text-sm text-muted-foreground">Upload raw audio, mixed, master files</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <FileText className="h-8 w-8 mb-3 text-amber-500" />
            <h3 className="font-medium mb-1">Submit Bill</h3>
            <p className="text-sm text-muted-foreground">Upload studio bills for payment</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <CreditCard className="h-8 w-8 mb-3 text-purple-500" />
            <h3 className="font-medium mb-1">Payments</h3>
            <p className="text-sm text-muted-foreground">Track payment status and receipts</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <PenTool className="h-8 w-8 mb-3 text-red-500" />
            <h3 className="font-medium mb-1">Agreements</h3>
            <p className="text-sm text-muted-foreground">View and sign studio agreements</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <MessageSquare className="h-8 w-8 mb-3 text-cyan-500" />
            <h3 className="font-medium mb-1">Chat</h3>
            <p className="text-sm text-muted-foreground">Communicate with company team</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button>View Songs</Button>
        <Button variant="outline">Upload File</Button>
        <Button variant="outline">Upload Bill</Button>
        <Button variant="outline">View Payment</Button>
        <Button variant="outline">Sign Agreement</Button>
        <Button variant="outline">Download Statement</Button>
      </div>
    </div>
  );
}
