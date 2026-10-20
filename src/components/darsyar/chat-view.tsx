"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toFa } from "@/lib/persian";
import { apiUrl } from "@/lib/api-url";

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

/** رنگ‌های پاستلی متنوع برای چیپ‌های پیشنهادی */
const SUGGESTION_STYLES = [
  "border-emerald-200 bg-emerald-50/70 text-emerald-700 hover:bg-emerald-100",
  "border-amber-200 bg-amber-50/70 text-amber-700 hover:bg-amber-100",
  "border-violet-200 bg-violet-50/70 text-violet-700 hover:bg-violet-100",
];

interface ChatViewProps {
  context: ChatContext | null;
  onClearContext: () => void;
  onBack: () => void;
}

function RobotAvatar({ size = 8 }: { size?: number }) {
  const px = size * 4;
  return (
    <span
      style={{ width: px, height: px }}
      className="relative flex shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-fuchsia-200/70"
    >
      <Image
        src="/images/robot-helper.png"
        alt="ربات دستیار درسیار"
        width={px - 6}
        height={px - 6}
        className="mix-blend-multiply"
      />
    </span>
  );
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
      const res = await fetch(apiUrl("/api/chat"), {
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
      <header className="sticky top-0 z-20 overflow-hidden rounded-b-[1.75rem] bg-gradient-to-l from-violet-600 via-fuchsia-500 to-fuchsia-400 text-white shadow-lg shadow-fuchsia-500/20">
        <span aria-hidden className="absolute -left-8 -top-10 h-28 w-28 rounded-full bg-white/10" />
        <span aria-hidden className="absolute right-10 top-6 h-2 w-2 animate-float-fast rounded-full bg-amber-200/90" />
        <span aria-hidden className="absolute left-1/4 bottom-2 h-1.5 w-1.5 animate-float rounded-full bg-white/70" />

        <div className="relative flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            aria-label="بازگشت"
            onClick={onBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition-colors hover:bg-white/25"
          >
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
          <span className="relative">
            <RobotAvatar size={11} />
            <span
              className="absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white"
              aria-label="آنلاین"
              role="img"
            />
          </span>
          <div className="flex-1">
            <h1 className="text-sm font-extrabold">راهنمای درسیار</h1>
            <p className="text-[10px] text-white/80">
              دستیار هوشمند پایه‌های هفتم تا نهم — پاسخ مطابق کتاب‌های درسی
            </p>
          </div>
        </div>

        {/* چیپ درس مرتبط */}
        {context && (
          <div className="relative flex items-center gap-2 px-4 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
              درس مرتبط: {context.subject ? `${context.subject} ` : ""}پایه {toFa(context.grade)}
              <button
                type="button"
                aria-label="حذف درس مرتبط"
                onClick={onClearContext}
                className="flex h-4 w-4 items-center justify-center rounded-full bg-white/30 hover:bg-white/50"
              >
                <X className="h-3 w-3" aria-hidden />
              </button>
            </span>
          </div>
        )}
      </header>

      {/* پیام‌ها */}
      <main className="thin-scrollbar flex-1 space-y-4 px-4 pb-32 pt-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn("flex items-end gap-2", m.role === "user" ? "justify-end" : "justify-start")}
          >
            {m.role === "assistant" && <RobotAvatar size={8} />}
            <div
              className={cn(
                "max-w-[82%] whitespace-pre-wrap px-4 py-3 text-[13px] leading-6",
                m.role === "user"
                  ? "rounded-2xl rounded-bl-md bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/25"
                  : "rounded-2xl rounded-br-md border border-slate-100 bg-white text-slate-700 shadow-sm"
              )}
            >
              {m.content}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex items-end gap-2">
            <RobotAvatar size={8} />
            <div className="flex items-center gap-1.5 rounded-2xl rounded-br-md border border-slate-100 bg-white px-4 py-3.5 shadow-sm">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-violet-500" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-amber-400" />
            </div>
          </div>
        )}

        {/* پیشنهادها */}
        {messages.length <= 1 && !sending && (
          <div className="space-y-2 pt-2">
            <p className="text-center text-[11px] text-slate-400">می‌توانی با این سوال‌ها شروع کنی:</p>
            {SUGGESTIONS.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className={cn(
                  "block w-full rounded-2xl border border-dashed px-4 py-2.5 text-right text-[13px] font-medium transition-colors",
                  SUGGESTION_STYLES[i % SUGGESTION_STYLES.length]
                )}
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
        className="fixed inset-x-0 bottom-0 z-30 border-t border-violet-100/70 bg-white/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-lg items-center gap-2 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={sending ? "درسیار در حال نوشتن است..." : "سوال درسی خودت را بنویس..."}
            disabled={sending}
            aria-label="متن سوال"
            className="flex-1 rounded-2xl border border-violet-100 bg-violet-50/40 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-fuchsia-300 focus:bg-white focus:ring-4 focus:ring-fuchsia-100 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            aria-label="ارسال سوال"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30 transition-all hover:from-violet-600 hover:to-fuchsia-600 active:scale-95 disabled:opacity-40"
          >
            <Send className="h-5 w-5 -scale-x-100" aria-hidden />
          </button>
        </div>
      </form>
    </div>
  );
}
