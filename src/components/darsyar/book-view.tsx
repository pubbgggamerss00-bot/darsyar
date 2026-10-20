"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  FileQuestion,
  Layers,
  Lightbulb,
  MessageCircleQuestion,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toFa } from "@/lib/persian";
import { getAllUnitsLabel, getBookTheme, getUnitLabel } from "@/lib/book-theme";
import type { BookDetail, ContentItem } from "@/lib/app-types";
import { BookCover } from "./book-cover";
import { Skeleton } from "@/components/ui/skeleton";

type TabKey = "answer" | "note" | "exam";

const TAB_META: Record<
  TabKey,
  {
    label: string;
    icon: typeof Lightbulb;
    pillCls: string;
    badgeCls: string;
    accentCls: string;
    chipCls: string;
  }
> = {
  answer: {
    label: "جواب سوالات",
    icon: MessageCircleQuestion,
    pillCls: "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md shadow-emerald-500/30",
    badgeCls: "bg-emerald-50 text-emerald-600",
    accentCls: "border-r-emerald-400",
    chipCls: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
  },
  note: {
    label: "نکات مهم",
    icon: Lightbulb,
    pillCls: "bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-amber-500/30",
    badgeCls: "bg-amber-50 text-amber-600",
    accentCls: "border-r-amber-400",
    chipCls: "bg-amber-50 text-amber-600 hover:bg-amber-100",
  },
  exam: {
    label: "سوالات امتحانی",
    icon: FileQuestion,
    pillCls: "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md shadow-violet-500/30",
    badgeCls: "bg-violet-50 text-violet-600",
    accentCls: "border-r-violet-400",
    chipCls: "bg-violet-50 text-violet-600 hover:bg-violet-100",
  },
};

function ContentCard({ item, tab }: { item: ContentItem; tab: TabKey }) {
  const meta = TAB_META[tab];
  const Icon = meta.icon;
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={cn(
        "rounded-2xl border border-r-4 border-slate-100 bg-white p-4 shadow-sm",
        meta.accentCls
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold",
            meta.badgeCls
          )}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
          {tab === "answer" ? "جواب سوال" : tab === "note" ? "نکته مهم" : "سوال امتحانی"}
        </span>
        {item.pageRef && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
            {item.pageRef}
          </span>
        )}
      </div>

      <h4 className="text-sm font-bold leading-6 text-slate-800">{item.title}</h4>

      {tab === "exam" ? (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
              meta.chipCls
            )}
            aria-expanded={open}
          >
            {open ? "بستن پاسخ" : "مشاهده پاسخ تشریحی"}
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
              aria-hidden
            />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="exam-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="thin-scrollbar mt-3 max-h-72 overflow-y-auto whitespace-pre-wrap rounded-xl bg-violet-50/60 p-3 text-[13px] leading-6 text-slate-700">
                  {item.body}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <p className="mt-1.5 whitespace-pre-wrap text-[13px] leading-6 text-slate-600">
          {item.body}
        </p>
      )}
    </motion.article>
  );
}

interface BookViewProps {
  book: BookDetail | null;
  loading: boolean;
  error: boolean;
  onBack: () => void;
  onOpenChat: () => void;
}

export function BookView({ book, loading, error, onBack, onOpenChat }: BookViewProps) {
  const [chapter, setChapter] = useState<number | "all">("all");
  const [tab, setTab] = useState<TabKey>("answer");

  if (loading || !book) {
    return (
      <div className="px-4 pt-4">
        <Skeleton className="mb-4 h-40 w-full rounded-3xl" />
        <Skeleton className="mb-4 h-14 w-full rounded-2xl" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
        {error && (
          <p className="mt-4 text-center text-sm text-rose-500">
            خطا در دریافت کتاب؛ دوباره تلاش کن.
          </p>
        )}
      </div>
    );
  }

  const theme = getBookTheme(book.color);
  const unitLabel = getUnitLabel(book.subject);
  const allUnitsLabel = getAllUnitsLabel(book.subject);
  const visibleChapters =
    chapter === "all" ? book.chapters : book.chapters.filter((c) => c.number === chapter);

  const countOf = (t: TabKey) =>
    t === "answer" ? book.answerCount : t === "note" ? book.noteCount : book.examCount;

  const isEmptyTab = visibleChapters.every(
    (c) => !c.contents.some((i) => i.type === tab)
  );

  return (
    <div>
      {/* هدر کتاب */}
      <header
        className={cn(
          "relative overflow-hidden rounded-b-[2rem] bg-gradient-to-bl p-5 pb-14 text-white shadow-lg",
          theme.gradient
        )}
      >
        {/* دایره‌های تزئینی */}
        <span aria-hidden className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
        <span aria-hidden className="absolute left-14 top-16 h-12 w-12 animate-float rounded-full bg-white/15" />
        <span aria-hidden className="absolute -bottom-10 right-1/3 h-24 w-24 rounded-full bg-white/10" />
        <span aria-hidden className="absolute right-6 bottom-10 h-2 w-2 animate-float-fast rounded-full bg-white/70" />

        <div className="relative flex items-center gap-3">
          <button
            type="button"
            aria-label="بازگشت"
            onClick={onBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition-colors hover:bg-white/25"
          >
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
          <div className="flex-1">
            <p className="text-xs text-white/80">{book.gradeName}</p>
            <h1 className="text-xl font-extrabold">{book.title}</h1>
          </div>
          <BookCover
            title={book.title}
            subject={book.subject}
            color={book.color}
            size="sm"
            className="shadow-lg ring-2 ring-white/40"
          />
        </div>
        <p className="relative mt-2.5 text-[13px] leading-6 text-white/85">{book.description}</p>
      </header>

      <main className="-mt-8 px-4 pb-8">
        {/* آمار کتاب */}
        <section
          aria-label="آمار کتاب"
          className="mb-5 grid grid-cols-4 divide-x divide-x-reverse divide-slate-100 rounded-2xl border border-white/70 bg-white/90 p-3 shadow-md shadow-violet-500/5 backdrop-blur"
        >
          <div className="flex flex-col items-center gap-0.5 px-1 text-center">
            <Layers className="h-4 w-4 text-slate-400" aria-hidden />
            <span className="text-base font-extrabold text-slate-800">{toFa(book.chapterCount)}</span>
            <span className="text-[10px] text-slate-400">{unitLabel}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 px-1 text-center">
            <MessageCircleQuestion className="h-4 w-4 text-emerald-500" aria-hidden />
            <span className="text-base font-extrabold text-slate-800">{toFa(book.answerCount)}</span>
            <span className="text-[10px] text-slate-400">جواب سوال</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 px-1 text-center">
            <Lightbulb className="h-4 w-4 text-amber-500" aria-hidden />
            <span className="text-base font-extrabold text-slate-800">{toFa(book.noteCount)}</span>
            <span className="text-[10px] text-slate-400">نکته مهم</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 px-1 text-center">
            <FileQuestion className="h-4 w-4 text-violet-500" aria-hidden />
            <span className="text-base font-extrabold text-slate-800">{toFa(book.examCount)}</span>
            <span className="text-[10px] text-slate-400">سوال امتحانی</span>
          </div>
        </section>

        {/* انتخاب درس/فصل/کارگاه */}
        <section aria-label={`انتخاب ${unitLabel}`} className="mb-4">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setChapter("all")}
              className={cn(
                "shrink-0 rounded-2xl border px-4 py-2 text-xs font-bold transition-all",
                chapter === "all"
                  ? cn("border-transparent bg-gradient-to-l text-white shadow-md", theme.gradient)
                  : "border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:text-violet-500"
              )}
            >
              {allUnitsLabel}
            </button>
            {book.chapters.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setChapter(c.number)}
                className={cn(
                  "shrink-0 rounded-2xl border px-3.5 py-1.5 text-right transition-all",
                  chapter === c.number
                    ? cn("border-transparent bg-gradient-to-l text-white shadow-md", theme.gradient)
                    : "border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:text-violet-500"
                )}
              >
                <span className="block text-[10px] opacity-75">
                  {unitLabel} {toFa(c.number)}
                </span>
                <span className="block max-w-[140px] truncate text-xs font-bold">{c.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* تب‌های محتوا با قرص لغزان */}
        <section aria-label="نوع محتوا" className="mb-5">
          <div className="grid grid-cols-3 gap-1 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm">
            {(Object.keys(TAB_META) as TabKey[]).map((t) => {
              const meta = TAB_META[t];
              const Icon = meta.icon;
              const isActive = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  aria-pressed={isActive}
                  className="relative flex flex-col items-center gap-0.5 rounded-xl px-1.5 py-2 text-[11px] font-bold transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="book-tab-pill"
                      className={cn("absolute inset-0 rounded-xl", meta.pillCls)}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      aria-hidden
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 flex flex-col items-center gap-0.5",
                      isActive ? "text-white" : "text-slate-500"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                    {meta.label}
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px]",
                        isActive ? "bg-white/20 text-white" : meta.badgeCls
                      )}
                    >
                      {toFa(countOf(t))}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* محتوا */}
        {isEmptyTab ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">فعلاً محتوایی در این بخش ثبت نشده است.</p>
          </div>
        ) : (
          visibleChapters.map((c) => {
            const items = c.contents.filter((i) => i.type === tab);
            if (items.length === 0) return null;
            return (
              <section key={c.id} className="mb-6" aria-label={`${unitLabel} ${toFa(c.number)}`}>
                <div
                  className={cn(
                    "mb-2.5 flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2",
                    theme.soft,
                    theme.softBorder
                  )}
                >
                  <h3 className="text-sm font-bold text-slate-700">
                    <span className={theme.text}>
                      {unitLabel} {toFa(c.number)}:
                    </span>{" "}
                    {c.title}
                  </h3>
                  <span className="shrink-0 text-[10px] text-slate-400">صفحات {c.pages}</span>
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <ContentCard key={item.id} item={item} tab={tab} />
                  ))}
                </div>
              </section>
            );
          })
        )}

        {/* دستیار هوشمند */}
        <button
          type="button"
          onClick={onOpenChat}
          className="relative mt-2 flex w-full items-center justify-between overflow-hidden rounded-3xl bg-gradient-to-l from-violet-600 via-fuchsia-500 to-fuchsia-400 p-4 text-right text-white shadow-lg shadow-fuchsia-500/25 transition-transform hover:-translate-y-0.5"
        >
          <span aria-hidden className="absolute -left-5 -top-8 h-24 w-24 rounded-full bg-white/10" />
          <span aria-hidden className="absolute -bottom-8 right-1/3 h-16 w-16 rounded-full bg-white/10" />
          <span className="relative flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <Bot className="h-6 w-6" aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-extrabold">جواب سوالت را پیدا نکردی؟</span>
              <span className="block text-xs text-white/80">
                همین سوال را از دستیار هوشمند درسیار بپرس
              </span>
            </span>
          </span>
          <span className="relative rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-violet-600 shadow-sm">
            بپرس
          </span>
        </button>
      </main>
    </div>
  );
}
