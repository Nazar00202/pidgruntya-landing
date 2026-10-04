import { ArrowRight, Check, Plus } from "lucide-react";
import { servicePages, type FaqItem } from "../data/pages";
import { formatPrice, hasPrice, type PriceItem } from "../config/prices";
import { site } from "../data/site";
import type { ServiceKey } from "../shared/lead";
import { prefillLead } from "../lib/leadBus";
import { Container, SectionTitle, PriceTag, ContactButtons } from "./ui";

// ---------------- Картки послуг (посилання на сторінки) ----------------
export function ServiceCards({ exclude, title = "Що ще робимо" }: { exclude?: string; title?: string }) {
  const list = servicePages.filter((s) => s.path !== exclude);
  return (
    <section className="py-16 sm:py-24 border-b border-line" id="posluhy">
      <Container>
        <SectionTitle eyebrow="Послуги" title={title} lead="Повний цикл на ділянці: знесли → розчистили → спланували → засипали." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {list.map((s) => (
            <a key={s.path} href={s.path} className="group bg-void p-6 sm:p-7 flex flex-col hover:bg-surface transition-colors">
              <h3 className="font-display font-bold text-xl sm:text-2xl mb-2">{s.navLabel}</h3>
              <p className="text-[14.5px] text-paper-dim leading-relaxed flex-1">{s.cardText}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-orange font-semibold text-[14.5px]">
                Детальніше <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------------- Ціни (для сторінок послуг) ----------------
export function PriceList({ title, items, service }: { title: string; items: PriceItem[]; service: ServiceKey }) {
  const isMaterial = service === "material";
  return (
    <section className="py-16 sm:py-20 border-b border-line" id="tsiny">
      <Container>
        <SectionTitle title={title} lead="Точну ціну під вашу адресу й обсяг назвемо по телефону." />
        <div className="border border-line divide-y divide-line">
          {items.map((it) => (
            <div key={it.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 p-5 sm:px-7">
              <div>
                <div className="font-display font-bold text-xl">{it.title}</div>
                {it.usage && <div className="text-[14px] text-paper-dim">{it.usage}</div>}
              </div>
              <div className="flex items-center gap-5 shrink-0">
                <PriceTag text={formatPrice(it)} muted={!hasPrice(it)} />
                <button
                  type="button"
                  onClick={() => prefillLead({ service, material: isMaterial ? it.title : undefined })}
                  className="text-[14px] font-semibold text-orange underline underline-offset-4 hover:text-paper"
                >
                  Замовити
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------------- Список «що робимо» ----------------
export function WhatWeDo({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="py-16 sm:py-20 bg-surface border-b border-line">
      <Container className="grid lg:grid-cols-[.9fr_1.1fr] gap-8 items-start">
        <h2 className="font-display font-bold uppercase text-[28px] sm:text-[36px] leading-[1.05]">{title}</h2>
        <ul className="grid gap-3">
          {items.map((i) => (
            <li key={i} className="flex items-start gap-3 text-[16px]">
              <Check className="w-5 h-5 text-yellow shrink-0 mt-1" strokeWidth={2.2} aria-hidden />
              {i}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// ---------------- FAQ (працює без JavaScript — <details>) ----------------
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section className="py-16 sm:py-24 border-b border-line" id="faq">
      <Container>
        <SectionTitle eyebrow="Питання" title="Часті запитання" />
        <div className="border-t border-line">
          {items.map((it) => (
            <details key={it.q} className="group border-b border-line">
              <summary className="list-none cursor-pointer flex items-center justify-between gap-5 py-5 font-display font-semibold text-lg sm:text-xl [&::-webkit-details-marker]:hidden">
                {it.q}
                <Plus className="w-5 h-5 text-orange shrink-0 transition-transform group-open:rotate-45" aria-hidden />
              </summary>
              <p className="pb-5 text-[15.5px] text-paper-dim leading-relaxed max-w-[70ch]">{it.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------------- Географія ----------------
export function Geography() {
  return (
    <section className="py-16 sm:py-24 bg-surface border-b border-line" id="geography">
      <Container className="grid lg:grid-cols-[.7fr_1.3fr] gap-10 items-center">
        <div className="border border-line aspect-square max-w-[340px] w-full bg-void flex items-center justify-center mx-auto lg:mx-0">
          <svg viewBox="0 0 300 300" className="w-[78%]" role="img" aria-label="Схема: радіус виїзду до 100 км від Львова">
            <circle cx="150" cy="150" r="130" fill="none" stroke="#2A3033" strokeWidth="1" />
            <circle cx="150" cy="150" r="90" fill="none" stroke="#2A3033" strokeWidth="1" />
            <circle cx="150" cy="150" r="50" fill="none" stroke="#FF6A00" strokeWidth="1.4" strokeDasharray="4 4" />
            <circle cx="150" cy="150" r="5" fill="#FF6A00" />
            <text x="150" y="138" textAnchor="middle" fill="#F3F3EF" fontSize="15" fontWeight="700">
              ЛЬВІВ
            </text>
            <text x="150" y="16" textAnchor="middle" fill="#B9B9B3" fontSize="12">
              до {site.radiusKm} км
            </text>
          </svg>
        </div>
        <div>
          <h2 className="font-display font-bold uppercase text-[28px] sm:text-[36px] leading-[1.05] mb-5">Львів і область до 100 км</h2>
          <p className="text-base sm:text-[17px] text-paper-dim leading-relaxed mb-4">
            Возимо й працюємо у Львові та по області приблизно до {site.radiusKm} км від міста.
          </p>
          <p className="text-base sm:text-[17px] text-paper-dim leading-relaxed">
            Ваш об'єкт далі — подзвоніть, обговоримо окремо.
          </p>
        </div>
      </Container>
    </section>
  );
}

// ---------------- Фінальний заклик ----------------
export function CallBand() {
  return (
    <section className="py-12 sm:py-16 bg-orange/10 border-b border-line" data-track="call-band">
      <Container className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="font-display font-bold uppercase text-2xl sm:text-3xl">Простіше подзвонити</div>
          <p className="text-paper-dim mt-1">Скажіть, що треба і куди, — порахуємо й назвемо ціну.</p>
        </div>
        <ContactButtons trackId="call-band" compact />
      </Container>
    </section>
  );
}
