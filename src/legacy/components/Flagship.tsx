import { processSteps } from "../data/services";

export function Flagship() {
  return (
    <section className="py-24 bg-surface" id="flagship">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-15 items-start mb-16">
          <div>
            <span className="inline-flex items-center gap-2 text-[12.5px] font-bold text-yellow border border-yellow/30 px-3 py-1.5 mb-5">
              Головний продукт
            </span>
            <h2 className="font-display font-extrabold text-[28px] sm:text-[34px] lg:text-[40px] leading-tight">
              Підготовка території під ключ
            </h2>
          </div>
          <div>
            <p className="text-paper-dim text-base leading-relaxed">
              Не потрібно окремо шукати екскаватор, КамАЗ, демонтажників та людей для прибирання.
              Ви залишаєте заявку — ми організовуємо необхідний склад техніки та людей під
              конкретний об'єкт, від огляду до здачі готової території.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {processSteps.map((step) => (
            <div key={step.num} className="bg-surface p-7">
              <div className="font-display font-extrabold text-[34px] leading-none text-line">
                {step.num}
              </div>
              <h4 className="font-display font-bold text-[17px] mt-3.5 mb-2">{step.title}</h4>
              <p className="text-[13.5px] text-paper-dim leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
