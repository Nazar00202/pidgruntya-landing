// Використовується тільки під час збірки (scripts/prerender.mjs): рендерить кожну сторінку в HTML.
import { renderToString } from "react-dom/server";
import App from "./App";
import { renderHead, sitemapPaths } from "./seo";

export function render(path: string): { html: string; head: string } {
  return { html: renderToString(<App path={path} />), head: renderHead(path) };
}

export { sitemapPaths };
