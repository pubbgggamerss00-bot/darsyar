"use client";

import { Bot, BookOpen, Home, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabKey = "home" | "grade" | "chat" | "more";

const TABS: { key: TabKey; label: string; icon: typeof Home }[] = [
  { key: "home", label: "انتخاب پایه", icon: Home },
  { key: "grade", label: "درس من", icon: BookOpen },
  { key: "chat", label: "راهنمای هوشمند", icon: Bot },
  { key: "more", label: "بیشتر", icon: MoreHorizontal },
];

interface BottomNavProps {
  active: TabKey;
  onSelect: (key: TabKey) => void;
}

export function BottomNav({ active, onSelect }: BottomNavProps) {
  return (
    <nav
      aria-label="نویگیشن اصلی"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/80 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-between gap-1 px-3 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-w-[68px] flex-col items-center gap-1 rounded-2xl px-2 py-1.5 text-[11px] font-semibold transition-all",
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
              )}
            >
              <Icon className="h-5 w-5" aria-hidden />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
