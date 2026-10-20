"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bot, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toFa } from "@/lib/persian";

export interface ChatContext {
  grade: number;
  subject?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME =
  "سلام! من راهنمای درسیار هستم.\nهر سوال درسی از پایه‌های هفتم تا نهم داری بپرس؛ اگر جواب سوالت را در بخش کمک درسی پیدا نکردی، همین‌جا از من بپرس.";

const SUGGESTIONS = [
  "معادله ساده x + ۵ = ۱۲ را چطور حل کنم؟",
  "برای امتحان علوم چطور بهتر درس بخوانم؟",
  "قواعد عربی پایه هفتم را ساده توضیح بده",
];

interface ChatViewProps {
  context: ChatContext | null;
  onClearContext: () => void;
  onBack: () => void;
}

export function ChatView({ context, onClearContext, onBack }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || sending) return;

    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
          context: context ?? undefined,
        }),
      });
      const d = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            d.reply ??
            "متاسفم، الان نتوانستم پاسخ بدهم. کمی بعد دوباره تلاش کن.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "ارتباط برقرار نشد؛ اتصال اینترنت را بررسی کن و دوباره تلاش کن.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* هدر چت */}
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            aria-label="بازگشت"
            onClick={onBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/25">
            <Bot className="h-6 w-6" aria-hidden />
          </span>
          <div className="flex-1">
            <h1 className="text-sm font-extrabold text-slate-800">راهنمای درسیار</h1>
            <p className="text-[10px] text-slate-400">
              دستیار هوشمند پایه‌های هفتم تا نهم — پاسخ مطابق کتاب‌های درسی
            </p>
          </div>
        </div>

        {/* چیپ درس مرتبط */}
        {context && (
          <div className="flex items-center gap-2 px-4 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
              درس مرتبط: {context.subject ? `${context.subject} ` : ""}پایه {toFa(context.grade)}
              <button
                type="button"
                aria-label="حذف درس مرتبط"
                onClick={onClearContext}
                className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
              >
                <X className="h-3 w-3" aria-hidden />
              </button>
            </span>
          </div>
        )}
      </header>

      {/* پیام‌ها */}
      <main className="flex-1 space-y-4 px-4 pb-32 pt-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn("flex items-end gap-2", m.role === "user" ? "justify-end" : "justify-start")}
          >
            {m.role === "assistant" && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <Bot className="h-4.5 w-4.5" aria-hidden />
              </span>
            )}
            <div
              className={cn(
                "max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[13px] leading-6",
                m.role === "user"
                  ? "rounded-bl-md bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                  : "rounded-br-md border border-slate-100 bg-white text-slate-700 shadow-sm"
              )}
            >
              {m.content}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex items-end gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
              <Bot className="h-4.5 w-4.5" aria-hidden />
            </span>
            <div className="flex items-center gap-1 rounded-2xl rounded-br-md border border-slate-100 bg-white px-4 py-3.5 shadow-sm">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-blue-500" />
            </div>
          </div>
        )}

        {/* پیشنهادها */}
        {messages.length <= 1 && !sending && (
          <div className="space-y-2 pt-2">
            <p className="text-center text-[11px] text-slate-400">می‌توانی با این سوال‌ها شروع کنی:</p>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="block w-full rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 px-4 py-2.5 text-right text-[13px] font-medium text-blue-600 transition-colors hover:bg-blue-50"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      {/* ورودی پیام */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-lg items-center gap-2 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={sending ? "درسیار در حال نوشتن است..." : "سوال درسی خودت را بنویس..."}
            disabled={sending}
            aria-label="متن سوال"
            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            aria-label="ارسال سوال"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700 disabled:opacity-40"
          >
            <Send className="h-5 w-5 -scale-x-100" aria-hidden />
          </button>
        </div>
      </form>
    </div>
  );
}
