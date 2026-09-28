import { Truck, Check, Phone } from "lucide-react";
import { materials, deliveryPoints } from "../data/materials";
import { site, links } from "../data/site";
import { track, preselectService } from "../lib/analytics";

export function Delivery() {
  return (
    <section className="py-24 border-b border-line" id="delivery">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-15 items-end mb-13">
          <div>
            <div className="font-display text-sm font-bold text-orange mb-3.5">01 — Доставка</div>
            <h2 className="font-display font-extrabold text-[30px] sm:text-[38px] lg:text-[44px] leading-tight">
              Доставка піску, щебеню та ґрунту КамАЗом
            </h2>
          </div>
          <div>
            <p className="text-paper-dim text-[16.5px] leading-relaxed">
              Привозимо сипучі матеріали по Львову та області на власних самоскидах. Назвіть
              матеріал, обсяг і адресу — скажемо ціну та коли зможемо привезти.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line mb-10">
          {materials.map((m) => (
            <div key={m.title} className="bg-void p-7 flex flex-col">
              <Truck className="w-7 h-7 text-orange mb-4" strokeWidth={1.4} />
              <h3 className="font-display font-bold text-xl mb-2">{m.title}</h3>
              <p className="text-[14.5px] text-paper-dim leading-relaxed">{m.description}</p>
            </div>
          ))}
          <div className="bg-surface p-7 flex flex-col justify-center gap-3">
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
