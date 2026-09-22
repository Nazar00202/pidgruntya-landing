import { site, links } from "../data/site";

export function Footer() {
  return (
    <footer className="border-t border-line pt-14 pb-[calc(96px+env(safe-area-inset-bottom,0px))] md:pb-14">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 mb-10">
          <div>
            <h5 className="text-[13px] text-paper-dim font-semibold mb-4">{site.brandName}</h5>
            <p className="text-[14.5px] text-paper-dim leading-loose max-w-[38ch]">
              Розчищення, демонтаж, вивіз та підготовка земельних ділянок під ключ у Львові та
              області.
            </p>
          </div>
          <div>
            <h5 className="text-[13px] text-paper-dim font-semibold mb-4">Контакти</h5>
            <a href={links.tel} className="block text-[14.5px] text-paper-dim leading-loose hover:text-paper">
              {site.phoneDisplay}
            </a>
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener"
              className="block text-[14.5px] text-paper-dim leading-loose hover:text-paper"
            >
              Telegram
            </a>
            <a
              href={links.viber}
              target="_blank"
              rel="noopener"
              className="block text-[14.5px] text-paper-dim leading-loose hover:text-paper"
            >
              Viber
            </a>
          </div>
          <div>
            <h5 className="text-[13px] text-paper-dim font-semibold mb-4">Географія</h5>
            <p className="text-[14.5px] text-paper-dim leading-loose">
              {site.region}
              <br />
              {site.regionRadius}
            </p>
          </div>
        </div>
        <div className="border-t border-line pt-6 flex justify-between flex-wrap gap-3 text-[13px] text-paper-dim">
          <span>
            {site.brandName} · {site.legalNote}
          </span>
          <span>Робоча назва — до затвердження</span>
        </div>
      </div>
    </footer>
  );
}
