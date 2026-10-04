// Робить webp-версії всіх .jpg/.png з public/photos і public/images
// у кількох розмірах (480/960/1600 px) поруч з оригіналом: foo.jpg → foo-480.webp, foo-960.webp…
// І пише маніфест src/generated/images.json (розміри + доступні ширини) для компонента <Picture>.
// Запускається автоматично перед `npm run dev` і `npm run build`.
// Готові webp не перегенеровуються, якщо новіші за оригінал.

import { readdir, stat, mkdir, writeFile } from "node:fs/promises";
import { join, extname, relative, dirname } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const DIRS = ["public/photos", "public/images"];
const WIDTHS = [480, 960, 1600];
const manifest = {};

async function walk(dir) {
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const out = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p);
  }
  return out;
}

async function newer(a, b) {
  try {
    return (await stat(a)).mtimeMs >= (await stat(b)).mtimeMs;
  } catch {
    return false;
  }
}

let made = 0;
for (const d of DIRS) {
  for (const file of await walk(join(ROOT, d))) {
    const img = sharp(file);
    const { width, height } = await img.metadata();
    const base = file.slice(0, -extname(file).length);
    let widths = WIDTHS.filter((w) => w < width);
    if (width <= 1600 || !widths.includes(1600)) widths.push(Math.min(width, 1600));
    widths = [...new Set(widths)].sort((a, b) => a - b);
    for (const w of widths) {
      const out = `${base}-${w}.webp`;
      if (await newer(out, file)) continue;
      await sharp(file).resize({ width: w }).webp({ quality: 72 }).toFile(out);
      made++;
    }
    const url = "/" + relative(join(ROOT, "public"), file).split("\\").join("/");
    manifest[url] = { w: width, h: height, widths };
  }
}

const outFile = join(ROOT, "src/generated/images.json");
await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, JSON.stringify(manifest, null, 2));
console.log(`[images] ${Object.keys(manifest).length} зображень, нових webp: ${made}`);
