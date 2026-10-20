import { GradeData } from "./types";
import { grade7BooksPart1 } from "./grade7-part1";
import { grade7BooksPart2 } from "./grade7-part2";

export const grade7Data: GradeData = {
  number: 7,
  name: "پایه هفتم",
  subtitle: "آغاز مسیر موفقیت",
  books: [...grade7BooksPart1, ...grade7BooksPart2],
};
