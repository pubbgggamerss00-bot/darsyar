import { PrismaClient } from "@prisma/client";
import { grade7Data } from "../src/data/grade7";
import { grade8Data } from "../src/data/grade8";
import { grade9Data } from "../src/data/grade9";

const prisma = new PrismaClient();

async function main() {
  console.log("پاک کردن داده‌های قبلی...");
  await prisma.content.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.book.deleteMany();
  await prisma.grade.deleteMany();

  const gradesData = [grade7Data, grade8Data, grade9Data];

  for (const g of gradesData) {
    const grade = await prisma.grade.create({
      data: { number: g.number, name: g.name, subtitle: g.subtitle },
    });

    for (let bi = 0; bi < g.books.length; bi++) {
      const b = g.books[bi];
      const book = await prisma.book.create({
        data: {
          gradeId: grade.id,
          title: b.title,
          subject: b.subject,
          description: b.description,
          color: b.color,
          icon: b.icon,
          order: bi + 1,
        },
      });

      for (let ci = 0; ci < b.chapters.length; ci++) {
        const c = b.chapters[ci];
        const chapter = await prisma.chapter.create({
          data: {
            bookId: book.id,
            number: c.number,
            title: c.title,
            pages: c.pages,
            order: ci + 1,
          },
        });

        for (let ii = 0; ii < c.contents.length; ii++) {
          const item = c.contents[ii];
          await prisma.content.create({
            data: {
              chapterId: chapter.id,
              type: item.type,
              title: item.title,
              body: item.body,
              pageRef: item.pageRef ?? null,
              order: ii + 1,
            },
          });
        }
      }
    }
    console.log(`پایه ${g.number} با ${g.books.length} کتاب ذخیره شد.`);
  }

  const counts = {
    grades: await prisma.grade.count(),
    books: await prisma.book.count(),
    chapters: await prisma.chapter.count(),
    contents: await prisma.content.count(),
  };
  console.log("Seed کامل شد:", JSON.stringify(counts));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
