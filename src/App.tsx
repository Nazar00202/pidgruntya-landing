import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";
import { HomePage } from "./pages/HomePage";
import { ServicePage } from "./pages/ServicePage";
import { findServicePage } from "./data/pages";

// Роутинг: кожна сторінка — окремий HTML-файл, який пререндериться під час збірки
// (scripts/prerender.mjs). Список сторінок і їхні SEO-дані — src/data/pages.ts.
export function normalizePath(path: string): string {
  return path.replace(/\.html$/, "").replace(/\/index$/, "/").replace(/\/+$/, "") || "/";
}

export default function App({ path }: { path: string }) {
  const p = normalizePath(path);
  const service = findServicePage(p);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-orange focus:text-void focus:px-3 focus:py-2">
        Перейти до змісту
      </a>
      <Header currentPath={p} />
      <main id="main">
        {p === "/" ? (
          <HomePage />
        ) : service ? (
          <ServicePage page={service} />
        ) : (
          <section className="pt-40 pb-24 text-center px-4">
            <h1 className="font-display font-bold uppercase text-4xl mb-4">Сторінку не знайдено</h1>
            <a href="/" className="text-orange underline">
              На головну
            </a>
          </section>
        )}
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
