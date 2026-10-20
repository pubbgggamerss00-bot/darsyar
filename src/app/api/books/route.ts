import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import type { BookSummary, GradeWithBooks } from "@/lib/app-types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const gradeNumber = Number(request.nextUrl.searchParams.get("grade"));
    if (![7, 8, 9].includes(gradeNumber)) {
      return NextResponse.json({ error: "پایه نامعتبر است" }, { status: 400 });
    }

    const grade = await db.grade.findUnique({
      where: { number: gradeNumber },
      include: {
        books: {
          orderBy: { order: "asc" },
          include: {
            chapters: { orderBy: { order: "asc" }, include: { contents: true } },
          },
        },
      },
    });

    if (!grade) {
      return NextResponse.json({ error: "پایه پیدا نشد" }, { status: 404 });
    }

    const books: BookSummary[] = grade.books.map((b) => {
      const contents = b.chapters.flatMap((c) => c.contents);
      return {
        id: b.id,
        title: b.title,
        subject: b.subject,
        description: b.description,
        color: b.color,
        icon: b.icon,
        chapterCount: b.chapters.length,
        answerCount: contents.filter((c) => c.type === "answer").length,
        noteCount: contents.filter((c) => c.type === "note").length,
        examCount: contents.filter((c) => c.type === "exam").length,
      };
    });

    const result: GradeWithBooks = {
      id: grade.id,
      number: grade.number,
      name: grade.name,
      subtitle: grade.subtitle,
      books,
    };

    return NextResponse.json({ grade: result });
  } catch (error) {
    console.error("books api error", error);
    return NextResponse.json({ error: "خطا در دریافت کتاب‌ها" }, { status: 500 });
  }
}
