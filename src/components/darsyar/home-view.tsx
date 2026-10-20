"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  ChevronLeft,
  GraduationCap,
  Menu,
  MessageCircleQuestion,
  Sparkles,
  Star,
  Wand2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toFa } from "@/lib/persian";
import { getGradeTheme } from "@/lib/book-theme";
import { cn } from "@/lib/utils";
import type { GradeSummary } from "@/lib/app-types";
import { Skeleton } from "@/components/ui/skeleton";

const GRADE_META: Record<number, { icon: typeof BookOpen }> = {
  7: { icon: BookOpen },
  8: { icon: GraduationCap },
  9: { icon: Wand2 },
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
  const lastGradeTheme = lastGradeInfo ? getGradeTheme(lastGradeInfo.number) : null;

  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-violet-100/60 bg-white/80 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            aria-label="اعلان‌ها"
            onClick={() => toast({ title: "اعلان جدیدی ندارید" })}
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-100 bg-white text-slate-500 shadow-sm transition-colors hover:text-violet-600"
          >
            <Bell className="h-5 w-5" aria-hidden />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500" aria-hidden />
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/30">
                <BookOpen className="h-4 w-4" aria-hidden />
              </span>
              <h1 className="bg-gradient-to-l from-violet-600 via-fuchsia-600 to-orange-500 bg-clip-text text-lg font-extrabold text-transparent">
                درسیار من
              </h1>
            </div>
            <p className="text-[11px] text-slate-400">همراه تحصیلی پایه‌های هفتم تا نهم</p>
          </div>

          <button
            type="button"
            aria-label="منو"
            onClick={onMore}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-100 bg-white text-slate-500 shadow-sm transition-colors hover:text-violet-600"
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
        {lastGradeInfo && lastGradeTheme && (
          <motion.button
            type="button"
            onClick={() => onOpenGrade(lastGradeInfo.number)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className={cn(
              "relative flex w-full items-center justify-between overflow-hidden rounded-3xl bg-gradient-to-l p-4 text-right text-white shadow-lg",
              lastGradeTheme.gradient,
              lastGradeTheme.shadow
            )}
          >
            <span aria-hidden className="absolute -left-4 -top-6 h-20 w-20 rounded-full bg-white/15" />
            <span aria-hidden className="absolute -bottom-8 left-16 h-14 w-14 rounded-full bg-white/10" />
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <GraduationCap className="h-6 w-6" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-extrabold">
                  ادامه تحصیل در {lastGradeInfo.name}
                </span>
                <span className="block text-xs text-white/80">
                  {toFa(lastGradeInfo.bookCount)} کتاب درسی آماده مطالعه
                </span>
              </span>
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </span>
          </motion.button>
        )}

        {/* هیرو */}
        <motion.section
          aria-label="معرفی درسیار"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="animate-shimmer relative overflow-hidden rounded-3xl bg-gradient-to-l from-violet-600 via-fuchsia-500 to-amber-400 p-5 text-white shadow-xl shadow-fuchsia-500/20"
        >
          {/* ستاره‌های شناور */}
          <Sparkles aria-hidden className="absolute left-4 top-4 h-5 w-5 animate-float text-amber-200/90" />
          <Star aria-hidden className="absolute left-16 top-10 h-3.5 w-3.5 animate-float-fast text-white/80" />
          <Star aria-hidden className="absolute bottom-5 left-1/3 h-3 w-3 animate-wiggle text-amber-200/90" />
          <span aria-hidden className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-white/15" />
          <span aria-hidden className="absolute -top-8 right-1/3 h-16 w-16 rounded-full bg-white/10" />

          <div className="relative flex items-center gap-2">
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-extrabold leading-8 drop-shadow-sm">
                ماجراجویی یادگیری رو شروع کن!
              </h2>
              <p className="text-[13px] leading-6 text-white/85">
                پایه تحصیلی‌ات را انتخاب کن و به جواب سوالات، نکات مهم و سوالات امتحانی همه کتاب‌ها
                دسترسی داشته باشی
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                رایگان و بدون تبلیغ
              </span>
            </div>
            <span className="relative shrink-0 rounded-full bg-white/90 p-2 shadow-lg">
              <Image
                src="/images/hero-study.png"
                alt="کلاه فارغ‌التحصیلی روی کتاب‌ها"
                width={96}
                height={96}
                priority
                className="animate-float-slow mix-blend-multiply"
              />
            </span>
          </div>
        </motion.section>

        {/* انتخاب پایه */}
        <section aria-labelledby="grades-title">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-500/30">
              <BookOpen className="h-4.5 w-4.5" aria-hidden />
            </span>
            <h2 id="grades-title" className="text-base font-extrabold text-slate-800">
              پایه‌ات را انتخاب کن
            </h2>
          </div>

          <div className="space-y-3.5">
            {grades === null &&
              [1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full rounded-3xl" />)}

            {grades?.map((g, i) => {
              const meta = GRADE_META[g.number] ?? GRADE_META[7];
              const gt = getGradeTheme(g.number);
              const Icon = meta.icon;
              return (
                <motion.button
                  key={g.id}
                  type="button"
                  onClick={() => onOpenGrade(g.number)}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.08 * i, type: "spring", stiffness: 260, damping: 20 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`ورود به ${g.name}`}
                  className={cn(
                    "group relative flex w-full items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-l p-4 text-right text-white shadow-lg transition-shadow",
                    gt.gradient,
                    gt.shadow
                  )}
                >
                  <span aria-hidden className="absolute -left-3 -bottom-7 select-none text-8xl font-black text-white/15">
                    {toFa(g.number)}
                  </span>
                  <span aria-hidden className="absolute -top-5 left-1/4 h-14 w-14 rounded-full bg-white/15" />
                  <span
                    aria-hidden
                    className="absolute left-6 top-3 h-2 w-2 animate-float-fast rounded-full bg-white/60"
                  />
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                    <Icon className="h-7 w-7" aria-hidden />
                  </span>
                  <span className="relative flex-1">
                    <span className="block text-lg font-extrabold">{g.name}</span>
                    <span className="mt-0.5 block text-xs text-white/80">{g.subtitle}</span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold backdrop-blur">
                        {toFa(g.bookCount)} کتاب درسی
                      </span>
                      <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold backdrop-blur">
                        جواب و نکته کامل
                      </span>
                    </span>
                  </span>
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:-translate-x-1">
                    <ChevronLeft className="h-5 w-5" aria-hidden />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* دستیار هوشمند */}
        <motion.section
          aria-label="دستیار هوشمند"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-l from-violet-50 via-fuchsia-50/70 to-amber-50/60 p-5 shadow-sm"
        >
          <span aria-hidden className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-fuchsia-200/40 blur-xl" />
          <Sparkles
            aria-hidden
            className="absolute left-5 top-4 h-4 w-4 animate-float text-amber-400/70"
          />
          <div className="relative flex items-center gap-2">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-1.5">
                <MessageCircleQuestion className="h-5 w-5 text-violet-500" aria-hidden />
                <h3 className="text-base font-extrabold text-slate-800">نیاز به کمک داری؟</h3>
              </div>
              <p className="text-[13px] leading-6 text-slate-500">
                اگر جواب سوالت را در بخش کمک درسی پیدا نکردی، همین‌جا از دستیار هوشمند بپرس؛ پاسخ
                مناسب پایه‌های هفتم تا نهم می‌گیری.
              </p>
              <motion.button
                type="button"
                onClick={onOpenChat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-l from-violet-600 to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/30"
              >
                راهنمای درسیار
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>
            <span className="relative shrink-0 rounded-full bg-white p-1.5 shadow-md">
              <Image
                src="/images/robot-helper.png"
                alt="ربات دستیار درسیار"
                width={88}
                height={88}
                className="animate-float mix-blend-multiply"
              />
            </span>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
