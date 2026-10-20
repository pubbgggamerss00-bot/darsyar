"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { HomeView } from "@/components/darsyar/home-view";
import { GradeView } from "@/components/darsyar/grade-view";
import { BookView } from "@/components/darsyar/book-view";
import { ChatView, type ChatContext } from "@/components/darsyar/chat-view";
import { BottomNav, type TabKey } from "@/components/darsyar/bottom-nav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { BookDetail, GradeSummary, GradeWithBooks } from "@/lib/app-types";

type View = "home" | "grade" | "book" | "chat";

export default function DarsyarApp() {
  const [view, setView] = useState<View>("home");
  const [grades, setGrades] = useState<GradeSummary[] | null>(null);
  const [gradesError, setGradesError] = useState(false);
  const [grade, setGrade] = useState<GradeWithBooks | null>(null);
  const [gradeLoading, setGradeLoading] = useState(false);
  const [gradeError, setGradeError] = useState(false);
  const [book, setBook] = useState<BookDetail | null>(null);
  const [bookLoading, setBookLoading] = useState(false);
  const [bookError, setBookError] = useState(false);
  const [chatContext, setChatContext] = useState<ChatContext | null>(null);
  const [lastGrade, setLastGrade] = useState<number | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/grades")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setGrades(d.grades ?? []);
      })
      .catch(() => {
        if (!cancelled) setGradesError(true);
      });
    try {
      const saved = Number(window.localStorage.getItem("darsyar-grade"));
      if ([7, 8, 9].includes(saved)) setLastGrade(saved);
    } catch {
      /* دسترسی به localStorage ممکن نیست */
    }
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view, book?.id]);

  const openGrade = useCallback(
    async (n: number) => {
      setView("grade");
      if (grade?.number === n) return;
      setGradeLoading(true);
      setGradeError(false);
      setGrade(null);
      try {
        const res = await fetch(`/api/books?grade=${n}`);
        const d = await res.json();
        if (d.grade) {
          setGrade(d.grade);
          try {
            window.localStorage.setItem("darsyar-grade", String(n));
          } catch {
            /* ignore */
          }
          setLastGrade(n);
        } else {
          setGradeError(true);
        }
      } catch {
        setGradeError(true);
      } finally {
        setGradeLoading(false);
      }
    },
    [grade?.number]
  );

  const openBook = useCallback(async (id: number) => {
    setView("book");
    setBookLoading(true);
    setBookError(false);
    setBook(null);
    try {
      const res = await fetch(`/api/books/${id}`);
      const d = await res.json();
      if (d.book) setBook(d.book);
      else setBookError(true);
    } catch {
      setBookError(true);
    } finally {
      setBookLoading(false);
    }
  }, []);

  const openChat = useCallback((ctx?: ChatContext) => {
    if (ctx) setChatContext(ctx);
    setView("chat");
  }, []);

  const handleTab = useCallback(
    (key: TabKey) => {
      if (key === "home") {
        setView("home");
      } else if (key === "grade") {
        if (lastGrade) {
          openGrade(lastGrade);
        } else {
          toast({ title: "اول پایه تحصیلی‌ات را انتخاب کن" });
          setView("home");
        }
      } else if (key === "chat") {
        openChat();
      } else {
        setMoreOpen(true);
      }
    },
    [lastGrade, openGrade, openChat, toast]
  );

  const activeTab: TabKey =
    view === "chat" ? "chat" : view === "grade" || view === "book" ? "grade" : "home";

  return (
    <div className="min-h-screen bg-[#f4f8ff]">
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col bg-white shadow-sm sm:border-x sm:border-slate-100">
        <div className="flex-1 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${view}-${grade?.number ?? 0}-${book?.id ?? 0}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {view === "home" && (
                <HomeView
                  grades={grades}
                  gradesError={gradesError}
                  lastGrade={lastGrade}
                  onOpenGrade={openGrade}
                  onOpenChat={() => openChat()}
                  onMore={() => setMoreOpen(true)}
                />
              )}
              {view === "grade" && (
                <GradeView
                  grade={grade}
                  loading={gradeLoading}
                  error={gradeError}
                  onOpenBook={openBook}
                  onOpenChat={(ctx) => openChat(ctx)}
                />
              )}
              {view === "book" && (
                <BookView
                  book={book}
                  loading={bookLoading}
                  error={bookError}
                  onBack={() => setView("grade")}
                  onOpenChat={() =>
                    openChat(
                      book
                        ? { grade: book.gradeNumber, subject: book.subject }
                        : undefined
                    )
                  }
                />
              )}
              {view === "chat" && (
                <ChatView
                  context={chatContext}
                  onClearContext={() => setChatContext(null)}
                  onBack={() => setView("home")}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {view !== "chat" && <BottomNav active={activeTab} onSelect={handleTab} />}
      </div>

      {/* منوی بیشتر */}
      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="text-right">
            <SheetTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-500" aria-hidden />
              درسیار من
            </SheetTitle>
            <SheetDescription>
              همراه تحصیلی پایه‌های هفتم تا نهم؛ جواب سوالات، نکات مهم و سوالات امتحانی همه کتاب‌های
              درسی به‌همراه دستیار هوشمند.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-2 pb-4">
            <button
              type="button"
              onClick={() => {
                setMoreOpen(false);
                openChat();
              }}
              className="flex w-full items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5 text-right transition-colors hover:bg-blue-50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Bot className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-bold text-slate-800">راهنمای درسیار</span>
                <span className="block text-xs text-slate-400">
                  سوال درسی خودت را از هوش مصنوعی بپرس
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMoreOpen(false);
                setView("home");
              }}
              className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 text-right transition-colors hover:bg-slate-50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <BookOpen className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-bold text-slate-800">انتخاب پایه تحصیلی</span>
                <span className="block text-xs text-slate-400">
                  پایه هفتم، هشتم یا نهم را انتخاب کن
                </span>
              </span>
            </button>
            <p className="pt-2 text-center text-[11px] text-slate-400">
              درسیار من — نسخه ۱٫۰٫۰
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
