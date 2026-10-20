// تایپ‌های داده محتوای درسی — ساختار مشترک فایل‌های داده پایه‌های ۷، ۸ و ۹

export type ContentType = "answer" | "note" | "exam";

export interface SeedContent {
  /** نوع محتوا: جواب سوال، نکته مهم یا سوال امتحانی */
  type: ContentType;
  /** عنوان: متن سوال (برای answer/exam) یا عنوان نکته (برای note) */
  title: string;
  /** متن پاسخ / توضیح نکته / پاسخ تشریحی سوال امتحانی */
  body: string;
  /** ارجاع صفحه در کتاب درسی (اختیاری) */
  pageRef?: string;
}

export interface SeedChapter {
  /** شماره فصل */
  number: number;
  /** عنوان فصل بدون پیشوند «فصل X:» */
  title: string;
  /** بازه صفحات فصل در کتاب، مثل «۱۰ تا ۲۶» */
  pages: string;
  contents: SeedContent[];
}

export interface SeedBook {
  /** نام کامل کتاب مثل «ریاضی هشتم» */
  title: string;
  /** نام درس مثل «ریاضی» */
  subject: string;
  /** توضیح کوتاه یک‌خطی */
  description: string;
  /** کلید رنگ: blue | green | purple | orange | teal | pink | amber | red */
  color: string;
  /** کلید آیکون: calculator | flask | book | globe | languages | message | sparkles | wrench */
  icon: string;
  chapters: SeedChapter[];
}

export interface GradeData {
  /** شماره پایه: ۷ یا ۸ یا ۹ */
  number: number;
  /** مثل «پایه هفتم» */
  name: string;
  /** توضیح کوتاه پایه مثل «آغاز مسیر موفقیت» */
  subtitle: string;
  books: SeedBook[];
}
