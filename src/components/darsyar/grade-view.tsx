"use client";

import { Bell, Bot, ChevronLeft, Globe, Layers, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toFa } from "@/lib/persian";
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

  const totalChapters = grade.books.reduce((acc, b) => acc + b.chapterCount, 0);
  const totalItems = grade.books.reduce(
    (acc, b) => acc + b.answerCount + b.noteCount + b.examCount,
    0
  );

  return (
    <div>
      {/* هدر گرادیانی */}
      <header className="rounded-b-[2rem] bg-gradient-to-bl from-blue-600 via-blue-500 to-sky-500 px-5 pb-12 pt-5 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-white/85">سلام، آماده یادگیری هستی؟</p>
            <h1 className="mt-1 text-2xl font-extrabold">{grade.name}</h1>
            <p className="mt-1 text-[13px] text-white/80">{grade.subtitle}</p>
          </div>
          <button
            type="button"
            aria-label="اعلان‌ها"
            onClick={() => toast({ title: "اعلان جدیدی ندارید" })}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur transition-colors hover:bg-white/25"
          >
            <Bell className="h-5 w-5" aria-hidden />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber-300" aria-hidden />
          </button>
        </div>
      </header>

      <main className="-mt-8 px-4 pb-8">
        {/* کارت آمار */}
        <section
          aria-label="آمار پایه"
          className="mb-6 grid grid-cols-3 divide-x divide-x-reverse divide-slate-100 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <div className="flex flex-col items-center gap-1 px-1 text-center">
            <Globe className="h-5 w-5 text-blue-500" aria-hidden />
            <span className="text-lg font-extrabold text-slate-800">{toFa(grade.books.length)}</span>
            <span className="text-[11px] text-slate-400">کتاب درسی</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-1 text-center">
            <Layers className="h-5 w-5 text-emerald-500" aria-hidden />
            <span className="text-lg font-extrabold text-slate-800">{toFa(totalChapters)}</span>
            <span className="text-[11px] text-slate-400">فصل آماده</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-1 text-center">
            <Sparkles className="h-5 w-5 text-amber-500" aria-hidden />
            <span className="text-lg font-extrabold text-slate-800">{toFa(totalItems)}</span>
            <span className="text-[11px] text-slate-400">پاسخ و نکته</span>
          </div>
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
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
              {toFa(grade.books.length)} کتاب
            </span>
          </div>

          <div className="space-y-3">
            {grade.books.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => onOpenBook(b.id)}
                className="group flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-right shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
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
                <ChevronLeft className="h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-blue-500" aria-hidden />
              </button>
            ))}
          </div>
        </section>

        {/* دستیار هوشمند */}
        <button
          type="button"
          onClick={() => onOpenChat({ grade: grade.number })}
          className="mt-6 flex w-full items-center justify-between rounded-2xl border border-blue-100 bg-gradient-to-l from-sky-50 to-white p-4 text-right transition-shadow hover:shadow-md"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <Bot className="h-6 w-6" aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-bold text-slate-800">سوالی داری؟ از درسیار بپرس</span>
              <span className="block text-xs text-slate-400">دستیار هوشمند مخصوص پایه {toFa(grade.number)}</span>
            </span>
          </span>
          <ChevronLeft className="h-5 w-5 text-blue-400" aria-hidden />
        </button>
      </main>
    </div>
  );
}
