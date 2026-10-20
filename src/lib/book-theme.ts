import {
  BookOpen,
  Calculator,
  FlaskConical,
  Globe,
  Languages,
  MessageCircle,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface BookTheme {
  /** گرادیان جلد / هدر */
  gradient: string;
  /** پس‌زمینه ملایم */
  soft: string;
  /** رنگ متن */
  text: string;
  /** حاشیه ملایم */
  softBorder: string;
}

const THEMES: Record<string, BookTheme> = {
  blue: {
    gradient: "from-sky-400 to-blue-600",
    soft: "bg-blue-50",
    text: "text-blue-600",
    softBorder: "border-blue-100",
  },
  green: {
    gradient: "from-emerald-400 to-green-600",
    soft: "bg-emerald-50",
    text: "text-emerald-600",
    softBorder: "border-emerald-100",
  },
  purple: {
    gradient: "from-violet-400 to-purple-600",
    soft: "bg-purple-50",
    text: "text-purple-600",
    softBorder: "border-purple-100",
  },
  orange: {
    gradient: "from-amber-400 to-orange-500",
    soft: "bg-orange-50",
    text: "text-orange-600",
    softBorder: "border-orange-100",
  },
  teal: {
    gradient: "from-teal-400 to-cyan-600",
    soft: "bg-teal-50",
    text: "text-teal-600",
    softBorder: "border-teal-100",
  },
  pink: {
    gradient: "from-pink-400 to-rose-500",
    soft: "bg-rose-50",
    text: "text-rose-600",
    softBorder: "border-rose-100",
  },
  amber: {
    gradient: "from-yellow-400 to-amber-500",
    soft: "bg-amber-50",
    text: "text-amber-600",
    softBorder: "border-amber-100",
  },
  red: {
    gradient: "from-red-400 to-rose-600",
    soft: "bg-red-50",
    text: "text-red-600",
    softBorder: "border-red-100",
  },
};

export function getBookTheme(color: string): BookTheme {
  return THEMES[color] ?? THEMES.blue;
}

/** تم گرادیانی هر پایه تحصیلی */
export interface GradeTheme {
  /** گرادیان هدر و کارت پایه */
  gradient: string;
  /** پس‌زمینه ملایم */
  soft: string;
  /** رنگ متن */
  text: string;
  /** سایه رنگی کارت */
  shadow: string;
}

const GRADE_THEMES: Record<number, GradeTheme> = {
  7: {
    gradient: "from-emerald-400 via-teal-400 to-cyan-500",
    soft: "bg-emerald-50",
    text: "text-emerald-600",
    shadow: "shadow-emerald-500/30",
  },
  8: {
    gradient: "from-amber-400 via-orange-400 to-orange-500",
    soft: "bg-amber-50",
    text: "text-amber-600",
    shadow: "shadow-amber-500/30",
  },
  9: {
    gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
    soft: "bg-violet-50",
    text: "text-violet-600",
    shadow: "shadow-fuchsia-500/30",
  },
};

export function getGradeTheme(grade: number): GradeTheme {
  return GRADE_THEMES[grade] ?? GRADE_THEMES[9];
}

/**
 * برچسب واحد هر کتاب درسی بر اساس موضوع:
 * «درس» برای فارسی/عربی/انگلیسی/پیام‌های آسمان/مطالعات اجتماعی،
 * «فصل» برای ریاضی/علوم تجربی، «کارگاه» برای کار و فناوری.
 */
export type UnitLabel = "درس" | "فصل" | "کارگاه";

export function getUnitLabel(subject: string): UnitLabel {
  if (subject.includes("کار") && subject.includes("فناوری")) return "کارگاه";
  if (subject.includes("فارسی") || subject.includes("عربی") || subject.includes("انگلیسی"))
    return "درس";
  if (subject.includes("آسمان") || subject.includes("مطالعات")) return "درس";
  return "فصل";
}

/** برچسب «همه واحدها» برای چیپ انتخاب همه */
export function getAllUnitsLabel(subject: string): string {
  const unit = getUnitLabel(subject);
  return `همه ${unit}‌ها`;
}

const ICONS: Record<string, LucideIcon> = {
  calculator: Calculator,
  flask: FlaskConical,
  book: BookOpen,
  globe: Globe,
  languages: Languages,
  message: MessageCircle,
  sparkles: Sparkles,
  wrench: Wrench,
};

export function getBookIcon(icon: string): LucideIcon {
  return ICONS[icon] ?? BookOpen;
}
