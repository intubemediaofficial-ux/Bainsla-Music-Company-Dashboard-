"use client";

import { useState } from "react";
import { MessageSquare, Plus, Search, Send, Paperclip, Mic, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  const chatThreads = [
    { id: "1", title: "Team General", type: "group", lastMessage: "No messages yet", unread: 0 },
    { id: "2", title: "Finance Team", type: "group", lastMessage: "No messages yet", unread: 0 },
    { id: "3", title: "Copyright Team", type: "group", lastMessage: "No messages yet", unread: 0 },
    { id: "4", title: "Artist Manager", type: "one-to-one", lastMessage: "No messages yet", unread: 0 },
  ];

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <div className="w-80 border rounded-lg flex flex-col">
        <div className="p-3 border-b">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Chats</h2>
            <Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search chats..." className="pl-9 h-8" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chatThreads.map((thread) => (
            <div key={thread.id} className="p-3 hover:bg-muted/50 cursor-pointer border-b">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {thread.type === "group" ? <Users className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{thread.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{thread.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 border rounded-lg flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-sm">Team General</p>
              <p className="text-xs text-muted-foreground">4 members</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">Info</Button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-medium mb-1">Internal Chat</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Team communication hub. Send messages, share files, create tasks from chat, and collaborate on songs, projects, and cases.
            </p>
          </div>
        </div>

        <div className="p-3 border-t">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm"><Paperclip className="h-4 w-4" /></Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button variant="ghost" size="sm"><Mic className="h-4 w-4" /></Button>
            <Button size="sm" className="gap-1"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
