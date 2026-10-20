import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { GradeSummary } from "@/lib/app-types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const grades = await db.grade.findMany({
      orderBy: { number: "asc" },
      include: { _count: { select: { books: true } } },
    });

    const result: GradeSummary[] = grades.map((g) => ({
      id: g.id,
      number: g.number,
      name: g.name,
      subtitle: g.subtitle,
      bookCount: g._count.books,
    }));

    return NextResponse.json({ grades: result });
  } catch (error) {
    console.error("grades api error", error);
    return NextResponse.json({ error: "خطا در دریافت پایه‌ها" }, { status: 500 });
  }
}
