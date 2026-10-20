import { GradeData } from "./types";
import { grade9BooksPart1 } from "./grade9-part1";
import { grade9BooksPart2 } from "./grade9-part2";

export const grade9Data: GradeData = {
  number: 9,
  name: "پایه نهم",
  subtitle: "آماده‌سازی برای آینده",
  books: [...grade9BooksPart1, ...grade9BooksPart2],
};
