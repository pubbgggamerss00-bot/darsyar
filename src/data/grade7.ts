import { GradeData } from "./types";
import { g7Math } from "./books/g7-math";
import { g7Science } from "./books/g7-science";
import { g7Persian } from "./books/g7-persian";
import { g7Social } from "./books/g7-social";
import { g7Arabic } from "./books/g7-arabic";
import { g7English } from "./books/g7-english";
import { g7Heavenly } from "./books/g7-heavenly";
import { g7Tech } from "./books/g7-tech";

export const grade7Data: GradeData = {
  number: 7,
  name: "پایه هفتم",
  subtitle: "آغاز مسیر موفقیت",
  books: [
    g7Math,
    g7Science,
    g7Persian,
    g7Social,
    g7Arabic,
    g7English,
    g7Heavenly,
    g7Tech,
  ],
};
