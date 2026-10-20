"use client";

import { motion } from "framer-motion";
import { Bell, Bot, ChevronLeft, Globe, Layers, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toFa } from "@/lib/persian";
import { getGradeTheme, getUnitLabel } from "@/lib/book-theme";
import { cn } from "@/lib/utils";
import type { GradeWithBooks } from "@/lib/app-types";
import { BookCover } from "./book-cover";
import { Skeleton } from "@/components/ui/skeleton";

interface GradeViewProps {
  grade: GradeWithBooks | null;
  loading: boolean;
  error: boolean;
  onOpenBook: (bookId: number) => void;
  onOpenChat: (ctx: { grade: number; subject?: string }) => void;
}

export function GradeView({ grade, loading, error, onOpenBook, onOpenChat }: GradeViewProps) {
  const { toast } = useToast();

  if (loading || !grade) {
    return (
      <div className="px-4 pt-4">
        <div className="mb-6 space-y-3">
          <Skeleton className="h-6 w-40 rounded-full" />
          <Skeleton className="h-10 w-64 rounded-xl" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
        {error && (
          <p className="mt-4 text-center text-sm text-rose-500">
            خطا در دریافت کتاب‌ها؛ دوباره تلاش کن.
          </p>
        )}
      </div>
    );
  }

  const gt = getGradeTheme(grade.number);
  const unitLabel = getUnitLabel(grade.books[0]?.subject ?? "");
  const totalChapters = grade.books.reduce((acc, b) => acc + b.chapterCount, 0);
  const totalItems = grade.books.reduce(
    (acc, b) => acc + b.answerCount + b.noteCount + b.examCount,
    0
  );

  const stats = [
    {
      icon: Globe,
      iconCls: "bg-violet-50 text-violet-500",
      value: grade.books.length,
      label: "کتاب درسی",
    },
    {
      icon: Layers,
      iconCls: "bg-emerald-50 text-emerald-500",
      value: totalChapters,
      label: `${unitLabel} آماده`,
    },
    {
      icon: Sparkles,
      iconCls: "bg-amber-50 text-amber-500",
      value: totalItems,
      label: "پاسخ و نکته",
    },
  ];

  return (
    <div>
      {/* هدر گرادیانی پایه */}
      <header
        className={cn(
          "relative overflow-hidden rounded-b-[2rem] bg-gradient-to-bl px-5 pb-12 pt-5 text-white shadow-lg",
          gt.gradient
        )}
      >
        {/* دایره‌های تزئینی شناور */}
        <span aria-hidden className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
        <span aria-hidden className="absolute left-12 top-14 h-14 w-14 animate-float rounded-full bg-white/15" />
        <span aria-hidden className="absolute -bottom-12 right-1/4 h-28 w-28 rounded-full bg-white/10" />
        <span aria-hidden className="absolute right-8 top-8 h-2.5 w-2.5 animate-float-fast rounded-full bg-white/60" />
        <span aria-hidden className="absolute left-1/3 bottom-6 h-2 w-2 animate-wiggle rounded-full bg-amber-200/80" />

        <div className="relative flex items-start justify-between">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs text-white/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-amber-200" aria-hidden />
              سلام، آماده یادگیری هستی؟
            </p>
            <h1 className="mt-2 text-2xl font-extrabold">{grade.name}</h1>
            <p className="mt-1 text-[13px] text-white/85">{grade.subtitle}</p>
          </div>
          <button
            type="button"
            aria-label="اعلان‌ها"
            onClick={() => toast({ title: "اعلان جدیدی ندارید" })}
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition-colors hover:bg-white/25"
          >
            <Bell className="h-5 w-5" aria-hidden />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber-300" aria-hidden />
          </button>
        </div>
      </header>

      <main className="-mt-8 px-4 pb-8">
        {/* کارت‌های آمار شیشه‌ای */}
        <section aria-label="آمار پایه" className="mb-6 grid grid-cols-3 gap-2">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, type: "spring", stiffness: 260, damping: 22 }}
                className="flex flex-col items-center gap-1 rounded-2xl border border-white/70 bg-white/90 p-3 text-center shadow-md shadow-violet-500/5 backdrop-blur"
              >
                <span className={cn("flex h-8 w-8 items-center justify-center rounded-xl", s.iconCls)}>
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-lg font-extrabold text-slate-800">{toFa(s.value)}</span>
                <span className="text-[10px] text-slate-400">{s.label}</span>
              </motion.div>
            );
          })}
        </section>

        {/* لیست کتاب‌ها */}
        <section aria-labelledby="books-title">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 id="books-title" className="text-base font-extrabold text-slate-800">
                کتاب‌های {grade.name}
              </h2>
              <p className="text-xs text-slate-400">کتاب‌های رسمی درسی را انتخاب کن</p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold",
                gt.soft,
                gt.text
              )}
            >
              {toFa(grade.books.length)} کتاب
            </span>
          </div>

          <div className="space-y-3">
            {grade.books.map((b, i) => (
              <motion.button
                key={b.id}
                type="button"
                onClick={() => onOpenBook(b.id)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, type: "spring", stiffness: 280, damping: 24 }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-right shadow-sm transition-shadow hover:shadow-md hover:shadow-violet-500/10"
              >
                <BookCover title={b.title} subject={b.subject} color={b.color} />
                <span className="flex-1">
                  <span className="block text-[15px] font-bold text-slate-800">{b.title}</span>
                  <span className="mt-0.5 block text-xs leading-5 text-slate-400">
                    {b.description}
                  </span>
                  <span className="mt-1.5 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                      {toFa(b.answerCount)} جواب سوال
                    </span>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600">
                      {toFa(b.noteCount)} نکته
                    </span>
                    <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-600">
                      {toFa(b.examCount)} سوال امتحانی
                    </span>
                  </span>
                </span>
                <ChevronLeft
                  className="h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-violet-500"
                  aria-hidden
                />
              </motion.button>
            ))}
          </div>
        </section>

        {/* دستیار هوشمند */}
        <motion.button
          type="button"
          onClick={() => onOpenChat({ grade: grade.number })}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="relative mt-6 flex w-full items-center justify-between overflow-hidden rounded-3xl bg-gradient-to-l from-violet-600 via-fuchsia-500 to-fuchsia-400 p-4 text-right text-white shadow-lg shadow-fuchsia-500/25"
        >
          <span aria-hidden className="absolute -left-5 -top-8 h-24 w-24 rounded-full bg-white/10" />
          <span aria-hidden className="absolute -bottom-8 right-1/3 h-16 w-16 rounded-full bg-white/10" />
          <span className="relative flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <Bot className="h-6 w-6" aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-extrabold">سوالی داری؟ از درسیار بپرس</span>
              <span className="block text-xs text-white/80">
                دستیار هوشمند مخصوص پایه {toFa(grade.number)}
              </span>
            </span>
          </span>
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </span>
        </motion.button>
      </main>
    </div>
  );
}
