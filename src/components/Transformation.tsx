export function Transformation() {
  return (
    <section className="py-24 bg-surface" id="transform">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="max-w-[640px] mb-13">
          <div className="font-display text-sm font-bold text-orange mb-3.5">01 — Результат</div>
          <h2 className="font-display font-extrabold text-[30px] sm:text-[38px] lg:text-[44px] leading-tight">
            Від захаращеної ділянки — до готового майданчика
          </h2>
          <p className="mt-4 text-paper-dim text-[16.5px] leading-relaxed">
            Реальний об'єкт: демонтаж старої споруди, робота екскаватора JCB, вивіз сміття та
            підготовка території.
          </p>
        </div>

        <div className="border border-line overflow-hidden">
          <img
            src="/images/before-after/case-01-demontazh-jcb.jpg"
            alt="Ділянка до і після демонтажу старої споруди та розчищення території"
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
