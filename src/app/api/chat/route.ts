import { NextResponse } from "next/server";
import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";

export const dynamic = "force-dynamic";

// اجازه دسترسی از اپلیکیشن اندروید (WebView) برای استفاده از دستیار هوشمند
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(24),
  context: z
    .object({
      grade: z.number().int().min(7).max(9).optional(),
      subject: z.string().max(60).optional(),
    })
    .optional(),
});

function toFaDigits(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

function buildSystemPrompt(context?: { grade?: number; subject?: string }): string {
  let contextLine =
    "دانش‌آموز هنوز پایه یا درس خاصی را انتخاب نکرده است؛ اگر برای پاسخ لازم است، پایه تحصیلی‌اش را بپرس.";
  if (context?.grade && context.subject) {
    contextLine = `دانش‌آموز در حال مطالعه کتاب «${context.subject}» پایه ${toFaDigits(
      context.grade
    )} است؛ پاسخ‌ها را متناسب با همان کتاب درسی ایران بده.`;
  } else if (context?.grade) {
    contextLine = `دانش‌آموز پایه ${toFaDigits(context.grade)} متوسطه اول است؛ پاسخ را متناسب با همین پایه بده.`;
  }

  return [
    "تو «درسیار» هستی؛ یک معلم مهربان و دستیار آموزشی برای دانش‌آموزان ایرانی مقطع متوسطه اول (پایه‌های هفتم، هشتم و نهم).",
    "",
    "قواعد پاسخ‌گویی:",
    "۱. همیشه به زبان فارسی ساده و روان، متناسب با سن ۱۳ تا ۱۵ سال پاسخ بده.",
    `۲. ${contextLine}`,
    "۳. در حل مسائل ریاضی و علوم، مرحله به مرحله حل کن و در پایان پاسخ نهایی را واضح بنویس.",
    "۴. پاسخ‌ها کوتاه، دقیق و کاربردی باشد؛ از توضیح اضافه پرهیز کن.",
    "۵. فقط به سوالات درسی پاسخ بده (ریاضی، علوم تجربی، فارسی، مطالعات اجتماعی، عربی، انگلیسی، پیام‌های آسمان، قرآن، کار و فناوری و روش مطالعه). اگر سوال خارج از این حوزه‌ها بود، مهربانانه دانش‌آموز را به درس‌خواندن برگردان.",
    "۶. هیچ‌گاه پاسخ نادرست نساز؛ اگر از پاسخ مطمئن نیستی، صادقانه بگو و پیشنهاد بده با معلم یا کتاب درسی بررسی شود.",
    "۷. در پایان پاسخ‌های نسبتاً بلند، یک «نکته کلیدی» کوتاه اضافه کن.",
    "۸. از اعداد فارسی (۱۲۳) استفاده کن و از علامت‌های مارک‌داون مثل ** و # استفاده نکن؛ متن ساده با خط‌های کوتاه بنویس.",
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "درخواست نامعتبر است" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const { messages, context } = parsed.data;
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: buildSystemPrompt(context) },
        ...messages.slice(-16),
      ],
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content;
    if (!reply) {
      return NextResponse.json(
        { error: "پاسخی دریافت نشد؛ دوباره تلاش کن" },
        { status: 502, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json({ reply }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error("chat api error", error);
    return NextResponse.json(
      { error: "ارتباط با دستیار هوشمند برقرار نشد" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
