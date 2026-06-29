import { Music, FileText, CreditCard, Upload, Bell, PenTool } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ArtistPortalPage() {
  const stats = [
    { label: "Total Songs", value: "0", color: "text-blue-500" },
    { label: "Released Songs", value: "0", color: "text-green-500" },
    { label: "Pending Releases", value: "0", color: "text-amber-500" },
    { label: "Pending Agreements", value: "0", color: "text-orange-500" },
    { label: "Pending Payments", value: "₹0", color: "text-red-500" },
    { label: "Paid Amount", value: "₹0", color: "text-green-500" },
    { label: "Royalty Earned", value: "₹0", color: "text-purple-500" },
    { label: "Notifications", value: "0", color: "text-cyan-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Artist Portal</h1>
        <p className="text-muted-foreground">View your songs, agreements, payments, and royalty statements</p>
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
            <h3 className="font-medium mb-1">My Songs</h3>
            <p className="text-sm text-muted-foreground">View songs, release status, platform links</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <FileText className="h-8 w-8 mb-3 text-amber-500" />
            <h3 className="font-medium mb-1">My Agreements</h3>
            <p className="text-sm text-muted-foreground">View and sign agreements digitally</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <CreditCard className="h-8 w-8 mb-3 text-green-500" />
            <h3 className="font-medium mb-1">My Payments</h3>
            <p className="text-sm text-muted-foreground">Payment history, pending, and receipts</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Upload className="h-8 w-8 mb-3 text-purple-500" />
            <h3 className="font-medium mb-1">Upload Documents</h3>
            <p className="text-sm text-muted-foreground">ID proof, bank details, photos</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <PenTool className="h-8 w-8 mb-3 text-red-500" />
            <h3 className="font-medium mb-1">Digital Signature</h3>
            <p className="text-sm text-muted-foreground">Sign agreements digitally</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Bell className="h-8 w-8 mb-3 text-cyan-500" />
            <h3 className="font-medium mb-1">Notifications</h3>
            <p className="text-sm text-muted-foreground">Release updates, payment alerts</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button>View Songs</Button>
        <Button variant="outline">View Agreements</Button>
        <Button variant="outline">Upload Documents</Button>
        <Button variant="outline">Update Bank Details</Button>
        <Button variant="outline">Download Statement</Button>
        <Button variant="outline">Contact Company</Button>
      </div>
    </div>
  );
}
