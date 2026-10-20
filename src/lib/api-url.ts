/**
 * ساخت آدرس فراخوانی API با پشتیبانی از درگاه XTransformPort.
 *
 * اگر صفحه از طریق درگاه سندباکس (پورت ۸۱) با پارامتر XTransformPort باز شده
 * باشد، همه فراخوانی‌های API هم باید همان پارامتر را داشته باشند تا از همان
 * مسیر عبور کنند. در حالت عادی (سرور مستقیم روی ۳۰۰۰) هیچ پارامتری اضافه
 * نمی‌شود و رفتار کاملاً استاندارد است.
 */
export function apiUrl(path: string): string {
  if (typeof window === "undefined") return path;
  try {
    const match = /[?&]XTransformPort=(\d+)/.exec(window.location.search);
    if (!match) return path;
    const sep = path.includes("?") ? "&" : "?";
    return `${path}${sep}XTransformPort=${match[1]}`;
  } catch {
    return path;
  }
}
