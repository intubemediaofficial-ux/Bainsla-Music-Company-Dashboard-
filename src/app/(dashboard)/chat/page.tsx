"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader2, MessageSquare, Plus, Search, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Thread = {
  id: string;
  threadTitle: string | null;
  threadType: string;
  participants: { id: string; userId: string }[];
  messages: { id: string; messageText: string | null; createdAt: string }[];
};

type Message = {
  id: string;
  messageText: string | null;
  createdAt: string;
  senderId: string;
  sender?: { id: string; name: string } | null;
};

const POLL_INTERVAL_MS = 5000;

export default function ChatPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadThreads = useCallback(async () => {
    const res = await fetch("/api/chat", { cache: "no-store" });
    if (!res.ok) {
      setError("Could not load chats");
      setLoading(false);
      return;
    }
    const data = (await res.json()) as Thread[];
    setThreads(data);
    setActiveId((current) => current ?? data[0]?.id ?? null);
    setLoading(false);
  }, []);

  const loadMessages = useCallback(async (threadId: string) => {
    const res = await fetch(`/api/chat/${threadId}/messages`, { cache: "no-store" });
    if (res.ok) setMessages((await res.json()) as Message[]);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => void loadThreads(), 0);
    return () => clearTimeout(timer);
  }, [loadThreads]);

  useEffect(() => {
    if (!activeId) return;
    const initial = setTimeout(() => void loadMessages(activeId), 0);
    const timer = setInterval(() => void loadMessages(activeId), POLL_INTERVAL_MS);
    return () => {
      clearTimeout(initial);
      clearInterval(timer);
    };
  }, [activeId, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const visibleThreads = useMemo(
    () =>
      threads.filter((thread) =>
        (thread.threadTitle ?? "").toLowerCase().includes(query.toLowerCase())
      ),
    [threads, query]
  );

  const activeThread = threads.find((thread) => thread.id === activeId) ?? null;

  async function createThread() {
    const title = window.prompt("Chat name (e.g. Finance Team)");
    if (!title) return;
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadTitle: title, threadType: "GROUP" }),
    });
    if (!res.ok) {
      setError("Could not create chat");
      return;
    }
    const thread = (await res.json()) as Thread;
    await loadThreads();
    setActiveId(thread.id);
  }

  async function send() {
    if (!activeId || !draft.trim()) return;
    setSending(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "send_message",
        threadId: activeId,
        messageText: draft.trim(),
      }),
    });
    setSending(false);
    if (!res.ok) {
      setError("Message could not be sent");
      return;
    }
    setDraft("");
    await loadMessages(activeId);
    await loadThreads();
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <div className="flex w-80 flex-col rounded-lg border">
        <div className="border-b p-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Chats</h2>
            <Button
              variant="ghost"
              size="sm"
              aria-label="New chat"
              onClick={() => void createThread()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              className="h-8 pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </div>
          ) : visibleThreads.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No chats yet. Create one with the + button.
            </p>
          ) : (
            visibleThreads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                onClick={() => setActiveId(thread.id)}
                className={`w-full border-b p-3 text-left hover:bg-muted/50 ${
                  thread.id === activeId ? "bg-muted/60" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {thread.threadType === "GROUP" ? (
                      <Users className="h-4 w-4" />
                    ) : (
                      <MessageSquare className="h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {thread.threadTitle ?? "Untitled chat"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {thread.messages[0]?.messageText ?? "No messages yet"}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-lg border">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">
                {activeThread?.threadTitle ?? "Select a chat"}
              </p>
              <p className="text-xs text-muted-foreground">
                {activeThread
                  ? `${activeThread.participants.length} member(s)`
                  : "Internal team chat"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          {!activeThread ? (
            <div className="flex h-full items-center justify-center text-center">
              <div>
                <MessageSquare className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-1 font-medium">Internal Chat</h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Create a chat to start team communication about songs, projects and
                  cases.
                </p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No messages yet. Say hello.
            </p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="rounded-lg border p-3">
                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {message.sender?.name ?? "Unknown"}
                  </span>
                  <span>{new Date(message.createdAt).toLocaleString("en-IN")}</span>
                </div>
                <p className="text-sm">{message.messageText}</p>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t p-3">
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
          >
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={activeThread ? "Type a message..." : "Select a chat first"}
              disabled={!activeThread}
              className="flex-1"
            />
            <Button
              type="submit"
              size="sm"
              className="gap-1"
              disabled={!activeThread || sending || !draft.trim()}
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
