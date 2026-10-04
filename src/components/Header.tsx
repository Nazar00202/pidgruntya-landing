import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { servicePages } from "../data/pages";
import { site, links } from "../data/site";

export function Header({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-void/95 border-b border-line"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      data-track="header"
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <a href="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-wide whitespace-nowrap shrink-0">
          <span className="w-[11px] h-[11px] bg-orange rotate-45 shrink-0" aria-hidden />
          {site.brandName}
        </a>

        <nav className="hidden lg:flex gap-6 text-[14.5px] text-paper-dim" aria-label="Послуги">
          {servicePages.map((p) => (
            <a
              key={p.path}
              href={p.path}
              className={`hover:text-paper transition-colors ${currentPath === p.path ? "text-paper" : ""}`}
              aria-current={currentPath === p.path ? "page" : undefined}
            >
              {p.navLabel}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a href={links.tel} className="flex items-center gap-2 font-display font-semibold text-lg whitespace-nowrap">
            <Phone className="w-4 h-4 text-orange" strokeWidth={2.2} aria-hidden />
            <span className="hidden min-[400px]:inline">{site.phoneDisplay}</span>
            <span className="min-[400px]:hidden">Дзвінок</span>
          </a>
          <button
            type="button"
            className="lg:hidden p-2 -mr-2"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line bg-void px-4 pb-4" aria-label="Меню">
          <a href="/" className="block py-3 border-b border-line text-[16px]">
            Головна
          </a>
          {servicePages.map((p) => (
            <a key={p.path} href={p.path} className="block py-3 border-b border-line text-[16px]">
              {p.navLabel}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
