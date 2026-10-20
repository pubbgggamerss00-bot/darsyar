const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** تبدیل ارقام لاتین به فارسی برای نمایش */
export function toFa(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}
