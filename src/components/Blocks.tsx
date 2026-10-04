import { ArrowRight, Truck, Recycle, Percent } from "lucide-react";
import { discounts, discountsNote } from "../config/discounts";
import { prefillLead } from "../lib/leadBus";
import { Container, SectionTitle } from "./ui";
import { Picture } from "./Picture";

// ---------------- Комбо ----------------
export function Combo() {
  return (
    <section className="py-16 sm:py-24 bg-surface border-b border-line" id="kombo">
      <Container className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-[12.5px] font-bold text-yellow border border-yellow/40 px-3 py-1.5 mb-5 uppercase tracking-wide">
            Комбо
          </div>
          <h2 className="font-display font-bold uppercase text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.05]">
            Привеземо матеріал і заберемо сміття за один рейс
          </h2>
          <p className="mt-5 text-paper-dim text-base sm:text-[17px] leading-relaxed">
            Машина однаково їде до вас. Вивантажили щебінь чи пісок — і тим самим КамАЗом забрали будсміття, бій цегли
            або ґрунт з ділянки. Не треба шукати окрему машину під сміття і чекати її ще день.
          </p>
          <ol className="mt-7 grid sm:grid-cols-3 gap-px bg-line border border-line">
            {[
              { icon: Truck, t: "Привезли", d: "щебінь, пісок, чорнозем" },
              { icon: ArrowRight, t: "Вивантажили", d: "куди скажете" },
              { icon: Recycle, t: "Забрали", d: "будсміття тим самим рейсом" },
            ].map(({ icon: I, t, d }) => (
              <li key={t} className="bg-surface p-5 flex gap-3 items-start">
                <I className="w-6 h-6 text-orange shrink-0" strokeWidth={1.8} aria-hidden />
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-[14px] text-paper-dim">{d}</div>
                </div>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => prefillLead({ service: "combo" })}
            className="mt-7 inline-flex items-center gap-2 px-6 py-4 rounded-sm bg-orange text-void font-semibold hover:bg-[#ff7d1f] transition-colors"
          >
            Замовити комбо <ArrowRight className="w-4 h-4" aria-hidden />
          </button>
        </div>
        <Picture
          src="/photos/vyviz-smittia.jpg"
          alt="КамАЗ-самоскид забирає будівельне сміття з ділянки"
          sizes="(min-width: 1024px) 460px, 100vw"
          className="w-full aspect-[4/3] object-cover border border-line"
        />
      </Container>
    </section>
  );
}

// ---------------- Знижки ----------------
export function Discounts() {
  return (
    <section className="py-16 sm:py-24 border-b border-line" id="znyzhky">
      <Container>
        <SectionTitle eyebrow="Знижки" title="Гнучкі знижки — домовляємось" lead={discountsNote} />
        <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
          {discounts.map((d) => (
            <div key={d.title} className="bg-void p-6 sm:p-8">
              <Percent className="w-7 h-7 text-orange mb-4" strokeWidth={1.8} aria-hidden />
              <h3 className="font-display font-bold text-xl sm:text-2xl mb-2">{d.title}</h3>
              <p className="text-[15px] text-paper-dim leading-relaxed">{d.text}</p>
              {d.detail && <p className="mt-3 font-semibold text-yellow">{d.detail}</p>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------------- Як ми працюємо ----------------
export interface Step {
  title: string;
  text: string;
}

export const defaultSteps: Step[] = [
  { title: "Дзвоните або пишете", text: "Кажете, що потрібно, скільки і куди везти. Можна просто надіслати фото місця." },
  { title: "Рахуємо разом", text: "Допоможемо порахувати кубометри й кількість машин, підкажемо фракцію і назвемо ціну." },
  { title: "Домовляємось про день", text: "Узгоджуємо дату й час, куди зручно під'їхати і де вивантажити." },
  { title: "Привозимо", text: "Вивантажуємо, де скажете. Якщо треба — тим самим рейсом забираємо сміття." },
];

export function HowWeWork({ steps = defaultSteps, title = "Як ми працюємо" }: { steps?: Step[]; title?: string }) {
  return (
    <section className="py-16 sm:py-24 bg-surface border-b border-line" id="yak-pratsiuiemo">
      <Container>
        <SectionTitle eyebrow="Просто" title={title} />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-surface p-6 sm:p-7">
              <div className="font-display font-bold text-[40px] leading-none text-orange/70">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-display font-bold text-xl mt-3 mb-2">{s.title}</h3>
              <p className="text-[14.5px] text-paper-dim leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

// ---------------- Переваги ----------------
export function Benefits({ items, title = "Чому з нами простіше" }: { items: { title: string; text: string }[]; title?: string }) {
  return (
    <section className="py-16 sm:py-24 border-b border-line" id="perevagy">
      <Container>
        <SectionTitle title={title} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {items.map((b) => (
            <div key={b.title} className="bg-void p-6 sm:p-7">
              <h3 className="font-display font-bold text-xl mb-2">{b.title}</h3>
              <p className="text-[14.5px] text-paper-dim leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
