import { site, links } from "../data/site";
import { track, preselectService } from "../lib/analytics";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-[168px] pb-24 bg-void">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 78% -8%, rgba(255,106,0,.14), transparent 60%)",
        }}
      />
      <div
        className="hidden md:block absolute -right-[6%] top-[8%] w-[52%] aspect-square opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#2A3033 1px, transparent 1px), linear-gradient(90deg, #2A3033 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 75%)",
          maskImage: "radial-gradient(circle, black 40%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-[1180px] mx-auto px-6 grid md:grid-cols-[1.05fr_.95fr] gap-10 md:gap-14 items-center">
        <div>
          <div className="flex items-center gap-2.5 text-[13px] text-paper-dim font-medium mb-5">
            <span className="w-1.5 h-1.5 bg-yellow rounded-full shrink-0" />
            {site.region} · {site.regionRadius}
          </div>
          <h1 className="font-display font-extrabold leading-[.98] tracking-tight text-[40px] sm:text-[56px] lg:text-[74px] max-w-[14ch]">
            Доставка піску та щебеню КамАЗом
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-paper-dim max-w-[46ch]">
            Пісок, щебінь, відсів, ґрунт — привозимо власними самоскидами по Львову та області.
            А також вивіз сміття, демонтаж і розчищення ділянок під ключ.
          </p>
          <div className="flex flex-wrap gap-3.5 mt-9">
            <a
              href="#lead-form"
              onClick={() => preselectService("delivery")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-[14.5px] rounded-sm bg-orange text-void hover:bg-[#ff7d1f] hover:-translate-y-px transition-all"
            >
              Замовити доставку
            </a>
            <a
              href={links.tel}
              onClick={() => track("phone_click", { location: "hero" })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-[14.5px] rounded-sm border border-line hover:border-paper-dim transition-colors"
            >
              Подзвонити {site.phoneDisplay}
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-[14.5px] rounded-sm border border-line hover:border-paper-dim transition-colors"
            >
              Розчищення ділянки
            </a>
          </div>
        </div>

        <div className="relative">
          <img
            src="/images/hero/kamaz-jcb.jpg"
            alt="Наш КамАЗ і екскаватор JCB на об'єкті у Львівській області"
            className="w-full aspect-[4/3] object-cover border border-line"
          />
          <div className="absolute left-0 bottom-0 m-3 sm:m-4 bg-void/85 backdrop-blur-sm border border-line px-4 py-3">
            <div className="text-[12px] text-paper-dim">Доставка КамАЗом 10–20 т</div>
            <div className="font-display font-bold text-lg sm:text-xl leading-tight">
              від 3 500 грн за машину
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
