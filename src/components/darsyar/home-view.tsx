"use client";

import Image from "next/image";
import {
  Bell,
  BookOpen,
  ChevronLeft,
  FileText,
  GraduationCap,
  Menu,
  MessageCircleQuestion,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toFa } from "@/lib/persian";
import { getBookTheme } from "@/lib/book-theme";
import type { GradeSummary } from "@/lib/app-types";
import { Skeleton } from "@/components/ui/skeleton";

const GRADE_META: Record<number, { color: string; icon: typeof BookOpen }> = {
  7: { color: "blue", icon: BookOpen },
  8: { color: "green", icon: GraduationCap },
  9: { color: "purple", icon: FileText },
};

interface HomeViewProps {
  grades: GradeSummary[] | null;
  gradesError: boolean;
  lastGrade: number | null;
  onOpenGrade: (grade: number) => void;
  onOpenChat: () => void;
  onMore: () => void;
}

export function HomeView({
  grades,
  gradesError,
  lastGrade,
  onOpenGrade,
  onOpenChat,
  onMore,
}: HomeViewProps) {
  const { toast } = useToast();
  const lastGradeInfo = grades?.find((g) => g.number === lastGrade);

  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            aria-label="اعلان‌ها"
            onClick={() => toast({ title: "اعلان جدیدی ندارید" })}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:text-blue-600"
          >
            <Bell className="h-5 w-5" aria-hidden />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500" aria-hidden />
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <BookOpen className="h-6 w-6 text-green-500" aria-hidden />
              <h1 className="text-lg font-extrabold text-slate-800">درسیار من</h1>
            </div>
            <p className="text-[11px] text-slate-400">همراه تحصیلی پایه‌های هفتم تا نهم</p>
          </div>

          <button
            type="button"
            aria-label="منو"
            onClick={onMore}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:text-blue-600"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </header>

      <main className="space-y-6 px-4 pb-8 pt-4">
        {gradesError && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-center text-sm text-rose-600">
            خطا در دریافت اطلاعات؛ لطفاً صفحه را دوباره بارگذاری کنید.
          </div>
        )}

        {/* ادامه تحصیل */}
        {lastGradeInfo && (
          <button
            type="button"
            onClick={() => onOpenGrade(lastGradeInfo.number)}
            className="flex w-full items-center justify-between rounded-2xl border border-emerald-100 bg-gradient-to-l from-emerald-50 to-white p-4 text-right transition-shadow hover:shadow-md"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <GraduationCap className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-bold text-slate-800">
                  ادامه تحصیل در {lastGradeInfo.name}
                </span>
                <span className="block text-xs text-slate-400">
                  {toFa(lastGradeInfo.bookCount)} کتاب درسی آماده مطالعه
                </span>
              </span>
            </span>
            <ChevronLeft className="h-5 w-5 text-emerald-500" aria-hidden />
          </button>
        )}

        {/* هیرو */}
        <section
          aria-label="معرفی درسیار"
          className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-l from-blue-50 via-sky-50 to-white p-5"
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-extrabold leading-8 text-blue-700">
                پایه تحصیلی خود را انتخاب کنید
              </h2>
              <p className="text-[13px] leading-6 text-slate-500">
                برای شروع یادگیری، پایه مورد نظر خود را انتخاب کنید و به جواب سوالات، نکات مهم و
                سوالات امتحانی دسترسی داشته باشید
              </p>
            </div>
            <Image
              src="/images/hero-study.png"
              alt="کلاه فارغ‌التحصیلی روی کتاب‌ها"
              width={104}
              height={104}
              priority
              className="mix-blend-multiply"
            />
          </div>
        </section>

        {/* انتخاب پایه */}
        <section aria-labelledby="grades-title">
          <div className="mb-3 flex items-center justify-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" aria-hidden />
            <h2 id="grades-title" className="text-base font-bold text-slate-800">
              انتخاب پایه
            </h2>
          </div>

          <div className="space-y-3">
            {grades === null &&
              [1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}

            {grades?.map((g) => {
              const meta = GRADE_META[g.number] ?? GRADE_META[7];
              const theme = getBookTheme(meta.color);
              const Icon = meta.icon;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => onOpenGrade(g.number)}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-right shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md ${theme.gradient}`}
                  >
                    <Icon className="h-7 w-7" aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-bold text-slate-800">{g.name}</span>
                    <span className="mt-0.5 block text-[13px] text-slate-400">{g.subtitle}</span>
                    <span
                      className={`mt-2 block h-1 w-12 rounded-full bg-gradient-to-l ${theme.gradient}`}
                      aria-hidden
                    />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${theme.soft} ${theme.text}`}
                  >
                    پایه {toFa(g.number)}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* دستیار هوشمند */}
        <section
          aria-label="دستیار هوشمند"
          className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-l from-sky-50 to-white p-5"
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-1.5">
                <MessageCircleQuestion className="h-5 w-5 text-blue-500" aria-hidden />
                <h3 className="text-base font-extrabold text-slate-800">نیاز به کمک داری؟</h3>
              </div>
              <p className="text-[13px] leading-6 text-slate-500">
                اگر جواب سوالت را در بخش کمک درسی پیدا نکردی، همین‌جا از دستیار هوشمند بپرس؛ پاسخ
                مناسب پایه‌های هفتم تا نهم می‌گیری.
              </p>
              <button
                type="button"
                onClick={onOpenChat}
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
              >
                راهنمای درسیار
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <Image
              src="/images/robot-helper.png"
              alt="ربات دستیار درسیار"
              width={96}
              height={96}
              className="mix-blend-multiply"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
