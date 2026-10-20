/**
 * ساخت صفحه آفلاین اپ اندروید (apk/assets/www/index.html)
 * محتوای همه پایه‌ها به‌صورت JSON داخل فایل قرار می‌گیرد تا APK بدون اینترنت کار کند.
 * اجرا: bun scripts/generate-offline.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import sharp from "sharp";
import { grade7Data } from "../src/data/grade7";
import { grade8Data } from "../src/data/grade8";
import { grade9Data } from "../src/data/grade9";

async function optimizeImage(src: string, dest: string, size: number) {
  await sharp(src)
    .resize(size, size, { fit: "inside" })
    .png({ palette: true, quality: 80 })
    .toFile(dest);
}

async function main() {
  mkdirSync("apk/assets/www/img", { recursive: true });

  await optimizeImage("public/images/hero-study.png", "apk/assets/www/img/hero.png", 512);
  await optimizeImage("public/images/robot-helper.png", "apk/assets/www/img/robot.png", 512);
  console.log("تصاویر آفلاین آماده شد.");

  const css = readFileSync("apk/www-src/style.css", "utf8");
  const js = readFileSync("apk/www-src/app.js", "utf8");
  const json = JSON.stringify([grade7Data, grade8Data, grade9Data]).replace(/<\//g, "<\\/");

  const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>درسیار من | کمک درسی متوسطه اول</title>
<style>
${css}
</style>
</head>
<body>
<div id="app"></div>
<script>
window.__DARSYAR_DATA__ = ${json};
</script>
<script>
${js}
</script>
</body>
</html>
`;

  writeFileSync("apk/assets/www/index.html", html);

  const size = Buffer.byteLength(html) / 1024;
  console.log(`index.html ساخته شد (${Math.round(size)} کیلوبایت).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
