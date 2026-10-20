import { GradeData } from "./types";
import { grade8BooksPart1 } from "./grade8-part1";
import { grade8BooksPart2 } from "./grade8-part2";

export const grade8Data: GradeData = {
  number: 8,
  name: "پایه هشتم",
  subtitle: "تنظیم دانش و مهارت",
  books: [...grade8BooksPart1, ...grade8BooksPart2],
};
