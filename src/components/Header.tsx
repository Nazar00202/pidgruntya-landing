import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { navLinks } from "../data/nav";
import { site, links } from "../data/site";
import { track } from "../lib/analytics";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 backdrop-blur-md ${
        scrolled ? "bg-void/95 border-b border-line" : "bg-void/70 border-b border-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="max-w-[1180px] mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2 font-display font-extrabold text-xl">
          <span className="w-[11px] h-[11px] bg-orange rotate-45 shrink-0" />
          {site.brandName}
          <span className="font-body font-medium text-[11px] text-paper-dim tracking-wide">/ Львів</span>
        </a>

        <nav className="hidden md:flex gap-7 text-sm text-paper-dim">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-paper transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={links.tel}
            onClick={() => track("phone_click", { location: "header" })}
            className="hidden sm:flex items-center gap-2 font-display font-bold text-lg whitespace-nowrap"
          >
            <Phone className="w-4 h-4 stroke-orange" strokeWidth={2} />
            {site.phoneDisplay}
          </a>
          <a
            href="#lead-form"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-sm rounded-sm bg-orange text-void hover:bg-[#ff7d1f] hover:-translate-y-px transition-all whitespace-nowrap"
          >
            Отримати прорахунок
          </a>
        </div>
      </div>
    </header>
  );
}
