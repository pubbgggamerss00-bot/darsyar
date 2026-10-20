export interface GradeSummary {
  id: number;
  number: number;
  name: string;
  subtitle: string;
  bookCount: number;
}

export interface BookSummary {
  id: number;
  title: string;
  subject: string;
  description: string;
  color: string;
  icon: string;
  chapterCount: number;
  answerCount: number;
  noteCount: number;
  examCount: number;
}

export interface GradeWithBooks {
  id: number;
  number: number;
  name: string;
  subtitle: string;
  books: BookSummary[];
}

export type ContentType = "answer" | "note" | "exam";

export interface ContentItem {
  id: number;
  type: ContentType;
  title: string;
  body: string;
  pageRef: string | null;
}

export interface ChapterDetail {
  id: number;
  number: number;
  title: string;
  pages: string;
  contents: ContentItem[];
}

export interface BookDetail {
  id: number;
  title: string;
  subject: string;
  description: string;
  color: string;
  icon: string;
  gradeNumber: number;
  gradeName: string;
  chapterCount: number;
  answerCount: number;
  noteCount: number;
  examCount: number;
  chapters: ChapterDetail[];
}
