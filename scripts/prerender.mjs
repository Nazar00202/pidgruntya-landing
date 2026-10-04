// Після `vite build` рендерить кожну сторінку в окремий HTML з правильними
// title/description/OG/Schema.org і генерує sitemap.xml.
//   /                  → dist/index.html
//   /shchebin          → dist/shchebin.html   (Cloudflare Pages віддає його за адресою /shchebin)
import { readFile, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");
const SITE = "https://pidgruntya.pp.ua";

const { render, sitemapPaths } = await import(join(DIST, "server/entry-server.js"));
let template = await readFile(join(DIST, "index.html"), "utf8");

// Вбудовуємо CSS прямо в HTML — прибирає «render-blocking» запит, перший екран малюється швидше.
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (cssLink) {
  const css = await readFile(join(DIST, cssLink[1]), "utf8");
  template = template.replace(cssLink[0], `<style>${css}</style>`);
}

for (const path of sitemapPaths) {
  const { html, head } = render(path);
  const page = template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
  const file = path === "/" ? "index.html" : `${path.slice(1)}.html`;
  await writeFile(join(DIST, file), page);
  console.log(`[prerender] ${path} → ${file}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths
  .map(
    (p) => `  <url>
    <loc>${SITE}${p === "/" ? "/" : p}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
await writeFile(join(DIST, "sitemap.xml"), sitemap);
await rm(join(DIST, "server"), { recursive: true, force: true });
console.log(`[prerender] sitemap.xml: ${sitemapPaths.length} сторінок`);
