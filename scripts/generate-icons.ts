/**
 * ساخت آیکون‌های لانچر اپ اندروید از تصویر ربات دستیار
 * اجرا: bun scripts/generate-icons.ts
 */
import sharp from "sharp";
import { mkdirSync } from "fs";

const SIZES: Record<string, number> = {
  mdpi: 48,
  hdpi: 72,
  xhdpi: 96,
  xxhdpi: 144,
  xxxhdpi: 192,
};

async function main() {
  const source = "public/images/robot-helper.png";

  for (const [dpi, size] of Object.entries(SIZES)) {
    const dir = `apk/res/mipmap-${dpi}`;
    mkdirSync(dir, { recursive: true });

    // پس‌زمینه گرد با گرادیان آبی + ربات در مرکز
    const r = Math.round(size * 0.18);
    const background = Buffer.from(`
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#60A5FA"/>
            <stop offset="100%" stop-color="#1D4ED8"/>
          </linearGradient>
        </defs>
        <rect width="${size}" height="${size}" rx="${r}" fill="url(#g)"/>
      </svg>
    `);

    const robot = await sharp(source)
      .resize(Math.round(size * 0.86), Math.round(size * 0.86))
      .toBuffer();

    await sharp(background)
      .composite([
        {
          input: robot,
          top: Math.round(size * 0.09),
          left: Math.round(size * 0.07),
        },
      ])
      .png()
      .toFile(`${dir}/ic_launcher.png`);

    console.log(`آیکون ${dpi} (${size}px) ساخته شد.`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
