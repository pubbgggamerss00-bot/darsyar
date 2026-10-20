import { GradeData } from "./types";
import { g8Math } from "./books/g8-math";
import { g8Science } from "./books/g8-science";
import { g8Persian } from "./books/g8-persian";
import { g8Social } from "./books/g8-social";
import { g8Arabic } from "./books/g8-arabic";
import { g8English } from "./books/g8-english";
import { g8Heavenly } from "./books/g8-heavenly";
import { g8Tech } from "./books/g8-tech";

export const grade8Data: GradeData = {
  number: 8,
  name: "پایه هشتم",
  subtitle: "تنظیم دانش و مهارت",
  books: [
    g8Math,
    g8Science,
    g8Persian,
    g8Social,
    g8Arabic,
    g8English,
    g8Heavenly,
    g8Tech,
  ],
};
