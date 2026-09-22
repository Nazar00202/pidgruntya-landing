import { site } from "../data/site";

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

      <div className="relative z-10 max-w-[1180px] mx-auto px-6 grid md:grid-cols-[1.15fr_.85fr] gap-14 items-end">
        <div>
          <div className="flex items-center gap-2.5 text-[13px] text-paper-dim font-medium mb-5">
            <span className="w-1.5 h-1.5 bg-yellow rounded-full shrink-0" />
            {site.region} · {site.regionRadius}
          </div>
          <h1 className="font-display font-extrabold leading-[.98] tracking-tight text-[40px] sm:text-[56px] lg:text-[74px] max-w-[14ch]">
            Розчищаємо та готуємо території під ключ
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-paper-dim max-w-[46ch]">
            Дерева, зарості, старі споруди, сміття та ґрунт — організовуємо демонтаж, прибирання,
            вивіз і планування території. Один контакт — весь комплекс робіт.
          </p>
          <div className="flex flex-wrap gap-3.5 mt-9">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-[14.5px] rounded-sm bg-orange text-void hover:bg-[#ff7d1f] hover:-translate-y-px transition-all"
            >
              Отримати прорахунок
            </a>
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-[14.5px] rounded-sm border border-line hover:border-paper-dim transition-colors"
            >
              Надіслати фото ділянки
            </a>
          </div>
        </div>

        <div>
          <div className="border-t md:border-t-0 md:border-l border-line pt-5 md:pt-0 md:pl-8">
            <div className="text-[12.5px] text-paper-dim mb-2.5">Що входить</div>
            <div className="font-display font-bold text-2xl leading-tight">
              Розчищення, демонтаж, корчування, вивіз, планування
            </div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-line pt-5 md:pt-0 md:pl-8 mt-6">
            <div className="text-[12.5px] text-paper-dim mb-2.5">Як рахуємо вартість</div>
            <div className="font-display font-bold text-2xl leading-tight">
              За фото та описом об'єкта — без універсального прайсу
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
