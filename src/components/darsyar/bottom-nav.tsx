"use client";

import { motion } from "framer-motion";
import { Bot, BookOpen, Home, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabKey = "home" | "grade" | "chat" | "more";

const TABS: { key: TabKey; label: string; icon: typeof Home; hue: string }[] = [
  { key: "home", label: "انتخاب پایه", icon: Home, hue: "text-violet-500" },
  { key: "grade", label: "درس من", icon: BookOpen, hue: "text-emerald-500" },
  { key: "chat", label: "راهنمای هوشمند", icon: Bot, hue: "text-fuchsia-500" },
  { key: "more", label: "بیشتر", icon: MoreHorizontal, hue: "text-amber-500" },
];

interface BottomNavProps {
  active: TabKey;
  onSelect: (key: TabKey) => void;
}

export function BottomNav({ active, onSelect }: BottomNavProps) {
  return (
    <nav aria-label="نویگیشن اصلی" className="pointer-events-none fixed inset-x-0 bottom-0 z-30">
      <div className="mx-auto max-w-lg px-3">
        <div
          className={cn(
            "pointer-events-auto flex items-stretch justify-between gap-1 rounded-full border border-white/70 bg-white/95 p-1.5 shadow-xl shadow-violet-500/10 backdrop-blur",
            "mb-[calc(env(safe-area-inset-bottom)+12px)]"
          )}
        >
          {TABS.map(({ key, label, icon: Icon, hue }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelect(key)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex min-w-[64px] flex-1 flex-col items-center gap-0.5 rounded-full px-2 py-1.5 text-[10px] font-bold transition-colors",
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-gradient-to-l from-violet-500 to-fuchsia-500 shadow-md shadow-violet-500/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-0.5">
                  <Icon
                    className={cn("h-5 w-5", !isActive && hue)}
                    aria-hidden
                  />
                  <span>{label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
