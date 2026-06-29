import { FileText, CreditCard, FolderOpen, MessageSquare, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClientPortalPage() {
  const stats = [
    { label: "Active Projects", value: "0", color: "text-blue-500" },
    { label: "Pending Invoices", value: "0", color: "text-amber-500" },
    { label: "Paid Amount", value: "₹0", color: "text-green-500" },
    { label: "Pending Amount", value: "₹0", color: "text-red-500" },
    { label: "Open Tickets", value: "0", color: "text-purple-500" },
    { label: "Uploaded Files", value: "0", color: "text-cyan-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Client Portal</h1>
        <p className="text-muted-foreground">View your projects, invoices, payments, and files</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
            <FileText className="h-8 w-8 mb-3 text-blue-500" />
            <h3 className="font-medium mb-1">My Invoices</h3>
            <p className="text-sm text-muted-foreground">View and download invoices</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <CreditCard className="h-8 w-8 mb-3 text-green-500" />
            <h3 className="font-medium mb-1">Payments</h3>
            <p className="text-sm text-muted-foreground">Payment history and pay now</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <FolderOpen className="h-8 w-8 mb-3 text-purple-500" />
            <h3 className="font-medium mb-1">My Files</h3>
            <p className="text-sm text-muted-foreground">Uploaded documents and deliverables</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <MessageSquare className="h-8 w-8 mb-3 text-amber-500" />
            <h3 className="font-medium mb-1">Support Chat</h3>
            <p className="text-sm text-muted-foreground">Chat with your account manager</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Bell className="h-8 w-8 mb-3 text-red-500" />
            <h3 className="font-medium mb-1">Notifications</h3>
            <p className="text-sm text-muted-foreground">Updates on projects and payments</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button>Create Request</Button>
        <Button variant="outline">View Project Status</Button>
        <Button variant="outline">Download Receipt</Button>
        <Button variant="outline">Raise Support Ticket</Button>
      </div>
    </div>
  );
}
