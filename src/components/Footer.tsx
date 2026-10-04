import { servicePages } from "../data/pages";
import { site, links } from "../data/site";

export function Footer() {
  return (
    <footer className="pt-12 pb-[calc(96px+env(safe-area-inset-bottom,0px))] md:pb-12" data-track="footer">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-10 mb-10">
          <div>
            <div className="font-display font-bold text-xl mb-3">{site.brandName}</div>
            <p className="text-[14.5px] text-paper-dim leading-relaxed max-w-[40ch]">
              Доставка щебеню, піску, чорнозему й ґрунту КамАЗом. Вивіз будсміття, демонтаж, розчистка й планування ділянок.{" "}
              {site.region}, {site.regionRadius}.
            </p>
          </div>
          <div>
            <div className="text-[13px] text-paper-dim font-semibold mb-3 uppercase tracking-wide">Послуги</div>
            <ul className="grid gap-1.5">
              <li>
                <a href="/" className="text-[14.5px] text-paper-dim hover:text-paper">
                  Головна
                </a>
              </li>
              {servicePages.map((p) => (
                <li key={p.path}>
                  <a href={p.path} className="text-[14.5px] text-paper-dim hover:text-paper">
                    {p.navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[13px] text-paper-dim font-semibold mb-3 uppercase tracking-wide">Контакти</div>
            <a href={links.tel} className="block font-display font-semibold text-xl hover:text-orange">
              {site.phoneIntl}
            </a>
            <div className="flex gap-4 mt-2">
              <a href={links.viber} className="text-[14.5px] text-paper-dim hover:text-paper">
                Viber
              </a>
              <a href={links.telegram} target="_blank" rel="noopener" className="text-[14.5px] text-paper-dim hover:text-paper">
                Telegram
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-line pt-6 flex justify-between flex-wrap gap-3 text-[13px] text-paper-dim">
          <span>
            {site.brandName} · {site.legalNote}
          </span>
          <a href="/privacy.html" className="hover:text-paper">
            Політика конфіденційності
          </a>
        </div>
      </div>
    </footer>
  );
}
