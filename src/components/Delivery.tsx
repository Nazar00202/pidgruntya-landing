import { Truck, Check, Phone } from "lucide-react";
import { materials, deliveryPoints, deliveryPrice } from "../data/materials";
import { site, links } from "../data/site";
import { track, preselectService } from "../lib/analytics";

export function Delivery() {
  return (
    <section className="py-24 border-b border-line" id="delivery">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-15 items-end mb-12">
          <div>
            <div className="font-display text-sm font-bold text-orange mb-3.5">01 — Доставка</div>
            <h2 className="font-display font-extrabold text-[30px] sm:text-[38px] lg:text-[44px] leading-tight">
              Доставка піску, щебеню та ґрунту КамАЗом
            </h2>
          </div>
          <div>
            <p className="text-paper-dim text-[16.5px] leading-relaxed">
              Привозимо сипучі матеріали по Львову та області на власних самоскидах. Назвіть
              матеріал, обсяг і адресу — скажемо точну ціну та коли зможемо привезти.
            </p>
            <div className="mt-6 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 border border-orange/60 bg-orange/10 px-5 py-4">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-paper">
                {deliveryPrice.from}–{deliveryPrice.to} грн
              </span>
              <span className="text-[14px] text-paper-dim">
                за машину · {deliveryPrice.tonnage} · залежить від матеріалу та відстані
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {materials
            .filter((m) => m.image)
            .map((m) => (
              <div key={m.title} className="bg-void flex flex-col">
                <img
                  src={m.image}
                  alt={`${m.title} — доставка КамАЗом у Львові`}
                  className="w-full aspect-[4/3] object-cover block"
                  loading="lazy"
                />
                <div className="p-4 sm:p-6">
                  <h3 className="font-display font-bold text-lg sm:text-xl mb-1.5">{m.title}</h3>
                  <p className="text-[13.5px] sm:text-[14.5px] text-paper-dim leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="border border-t-0 border-line bg-surface p-5 sm:p-7 mb-10 flex flex-col lg:flex-row lg:items-center gap-5 justify-between">
          <div className="flex items-start gap-3">
            <Truck className="w-6 h-6 text-orange shrink-0 mt-0.5" strokeWidth={1.6} />
            <p className="text-[14.5px] text-paper-dim leading-relaxed">
              <span className="text-paper font-semibold">Також возимо: </span>
              {materials
                .filter((m) => !m.image)
                .map((m) => m.title.toLowerCase())
                .join(", ")}
              . Не знайшли потрібне — уточніть по телефону.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="#lead-form"
              onClick={() => preselectService("delivery")}
              className="inline-flex items-center justify-center px-5 py-3.5 font-semibold text-[14.5px] rounded-sm bg-orange text-void hover:bg-[#ff7d1f] transition-colors"
            >
              Замовити доставку
            </a>
            <a
              href={links.tel}
              onClick={() => track("phone_click", { location: "delivery" })}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 font-semibold text-[14.5px] rounded-sm border border-line hover:border-paper-dim transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              {site.phoneDisplay}
            </a>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
          {deliveryPoints.map((p) => (
            <li key={p} className="flex items-start gap-3 text-[15px] text-paper-dim">
              <Check className="w-5 h-5 text-yellow shrink-0 mt-0.5" strokeWidth={2} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
