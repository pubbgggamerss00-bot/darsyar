import { GradeData } from "./types";
import { g9Math } from "./books/g9-math";
import { g9Science } from "./books/g9-science";
import { g9Persian } from "./books/g9-persian";
import { g9Social } from "./books/g9-social";
import { g9Arabic } from "./books/g9-arabic";
import { g9English } from "./books/g9-english";
import { g9Heavenly } from "./books/g9-heavenly";
import { g9Tech } from "./books/g9-tech";

export const grade9Data: GradeData = {
  number: 9,
  name: "پایه نهم",
  subtitle: "آماده‌سازی برای آینده",
  books: [
    g9Math,
    g9Science,
    g9Persian,
    g9Social,
    g9Arabic,
    g9English,
    g9Heavenly,
    g9Tech,
  ],
};
