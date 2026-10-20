import { getBookTheme } from "@/lib/book-theme";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: "h-14 w-11 text-[9px]",
  md: "h-20 w-16 text-[10px]",
  lg: "h-24 w-20 text-[11px]",
} as const;

interface BookCoverProps {
  title: string;
  subject: string;
  color: string;
  size?: keyof typeof SIZES;
  className?: string;
}

/** جلد کوچک کتاب درسی با رنگ موضوع */
export function BookCover({ title, subject, color, size = "md", className }: BookCoverProps) {
  const theme = getBookTheme(color);
  return (
    <div
      className={cn(
        "relative flex shrink-0 flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br p-1.5 text-white shadow-md",
        theme.gradient,
        SIZES[size],
        className
      )}
    >
      <span className="absolute inset-y-0 right-0 w-1 bg-white/25" aria-hidden />
      <span className="line-clamp-1 pr-1 text-[0.9em] font-medium leading-4 text-white/85">
        {subject}
      </span>
      <span className="line-clamp-3 pr-1 font-bold leading-snug">{title}</span>
    </div>
  );
}
