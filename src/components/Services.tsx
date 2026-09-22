import { services } from "../data/services";
import { Icon } from "./Icon";

export function Services() {
  return (
    <section className="py-24" id="services">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="max-w-[640px] mb-13">
          <div className="font-display text-sm font-bold text-orange mb-3.5">02 — Послуги</div>
          <h2 className="font-display font-extrabold text-[30px] sm:text-[38px] lg:text-[44px] leading-tight">
            Що входить у роботу
          </h2>
          <p className="mt-4 text-paper-dim text-[16.5px] leading-relaxed">
            Кожна послуга доступна окремо або як частина комплексної підготовки території.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {services.map((s) => (
            <div key={s.title} className="bg-void p-8 min-h-[200px] flex flex-col">
              <div className="w-[34px] h-[34px] mb-5 text-orange">
                <Icon name={s.icon} className="w-full h-full" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2.5">{s.title}</h3>
              <p className="text-[14.5px] text-paper-dim leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
