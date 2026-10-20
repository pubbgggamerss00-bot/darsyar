import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();
async function main() {
  const grades = await p.grade.findMany({
    select: { number: true, _count: { select: { books: true } } },
  });
  const books = await p.book.count();
  const chapters = await p.chapter.count();
  const contents = await p.content.count();
  console.log(JSON.stringify({ grades, books, chapters, contents }));
}
main()
  .then(() => p.$disconnect())
  .catch((e) => {
    console.error("ERR", String(e).slice(0, 200));
    p.$disconnect();
    process.exit(1);
  });
