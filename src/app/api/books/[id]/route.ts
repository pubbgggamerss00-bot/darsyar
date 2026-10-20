import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { BookDetail } from "@/lib/app-types";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookId = Number(id);
    if (Number.isNaN(bookId)) {
      return NextResponse.json({ error: "شناسه نامعتبر است" }, { status: 400 });
    }

    const book = await db.book.findUnique({
      where: { id: bookId },
      include: {
        grade: true,
        chapters: {
          orderBy: { order: "asc" },
          include: { contents: { orderBy: { order: "asc" } } },
        },
      },
    });

    if (!book) {
      return NextResponse.json({ error: "کتاب پیدا نشد" }, { status: 404 });
    }

    const allContents = book.chapters.flatMap((c) => c.contents);

    const result: BookDetail = {
      id: book.id,
      title: book.title,
      subject: book.subject,
      description: book.description,
      color: book.color,
      icon: book.icon,
      gradeNumber: book.grade.number,
      gradeName: book.grade.name,
      chapterCount: book.chapters.length,
      answerCount: allContents.filter((c) => c.type === "answer").length,
      noteCount: allContents.filter((c) => c.type === "note").length,
      examCount: allContents.filter((c) => c.type === "exam").length,
      chapters: book.chapters.map((ch) => ({
        id: ch.id,
        number: ch.number,
        title: ch.title,
        pages: ch.pages,
        contents: ch.contents.map((ct) => ({
          id: ct.id,
          type: ct.type as "answer" | "note" | "exam",
          title: ct.title,
          body: ct.body,
          pageRef: ct.pageRef,
        })),
      })),
    };

    return NextResponse.json({ book: result });
  } catch (error) {
    console.error("book detail api error", error);
    return NextResponse.json({ error: "خطا در دریافت کتاب" }, { status: 500 });
  }
}
