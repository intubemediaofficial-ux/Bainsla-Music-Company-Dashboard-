"use client";

import { useState } from "react";
import { Building2, Plus, Wallet, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BankingPage() {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("bank");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Banking & Wallets</h1>
          <p className="text-muted-foreground">Manage bank accounts, wallets, and cash transactions</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2"><Plus className="h-4 w-4" /> Add Account</Button>
      </div>

      <div className="flex gap-2 border-b pb-2">
        <Button variant={activeTab === "bank" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("bank")}>Bank Accounts</Button>
        <Button variant={activeTab === "wallet" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("wallet")}>Wallets</Button>
        <Button variant={activeTab === "cash" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("cash")}>Cash Book</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Add {activeTab === "bank" ? "Bank Account" : activeTab === "wallet" ? "Wallet" : "Cash Account"}</CardTitle></CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTab === "bank" && (
                <>
                  <div><label className="text-sm font-medium">Bank Name *</label><Input placeholder="Bank name" /></div>
                  <div><label className="text-sm font-medium">Account Holder Name *</label><Input placeholder="Account holder" /></div>
                  <div><label className="text-sm font-medium">Account Number *</label><Input placeholder="Account number" /></div>
                  <div><label className="text-sm font-medium">IFSC Code *</label><Input placeholder="IFSC" /></div>
                  <div><label className="text-sm font-medium">Branch</label><Input placeholder="Branch name" /></div>
                  <div><label className="text-sm font-medium">Account Type</label>
                    <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                      <option>Current</option><option>Savings</option>
                    </select>
                  </div>
                  <div><label className="text-sm font-medium">UPI ID</label><Input placeholder="upi@bank" /></div>
                  <div><label className="text-sm font-medium">Opening Balance (₹)</label><Input type="number" placeholder="0.00" /></div>
                </>
              )}
              {activeTab === "wallet" && (
                <>
                  <div><label className="text-sm font-medium">Wallet Name *</label><Input placeholder="PhonePe, GPay, Paytm..." /></div>
                  <div><label className="text-sm font-medium">Wallet Type</label>
                    <select className="w-full h-9 rounded-md border px-3 text-sm bg-background">
                      <option>PhonePe</option><option>Google Pay</option><option>Paytm</option>
                      <option>Razorpay</option><option>PayPal</option><option>Other</option>
                    </select>
                  </div>
                  <div><label className="text-sm font-medium">Linked Mobile</label><Input placeholder="Mobile number" /></div>
                  <div><label className="text-sm font-medium">Opening Balance (₹)</label><Input type="number" placeholder="0.00" /></div>
                </>
              )}
              {activeTab === "cash" && (
                <>
                  <div><label className="text-sm font-medium">Cash Account Name *</label><Input placeholder="Office Cash, Petty Cash..." /></div>
                  <div><label className="text-sm font-medium">Opening Balance (₹)</label><Input type="number" placeholder="0.00" /></div>
                </>
              )}
              <div className="lg:col-span-3 flex gap-3">
                <Button type="button">Save Account</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6 text-center py-8">
          {activeTab === "bank" && <Building2 className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />}
          {activeTab === "wallet" && <Wallet className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />}
          {activeTab === "cash" && <CreditCard className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />}
          <h3 className="font-medium mb-1">
            {activeTab === "bank" && "Bank Accounts"}
            {activeTab === "wallet" && "Digital Wallets"}
            {activeTab === "cash" && "Cash Book"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {activeTab === "bank" && "Add company bank accounts to track incoming/outgoing transactions, reconcile statements, and link payments."}
            {activeTab === "wallet" && "Add digital wallets (PhonePe, GPay, Paytm, Razorpay, PayPal) to track online transactions."}
            {activeTab === "cash" && "Manage cash transactions — record cash in, cash out, transfers, and daily cash book entries."}
          </p>
          <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Add First {activeTab === "bank" ? "Bank Account" : activeTab === "wallet" ? "Wallet" : "Cash Entry"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
