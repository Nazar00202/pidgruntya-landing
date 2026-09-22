export function Geography() {
  return (
    <section className="py-24 bg-surface" id="geography">
      <div className="max-w-[1180px] mx-auto px-6 grid lg:grid-cols-[.85fr_1.15fr] gap-14 items-center">
        <div className="border border-line aspect-square bg-void flex items-center justify-center">
          <svg viewBox="0 0 300 300" className="w-[72%]">
            <circle cx="150" cy="150" r="130" fill="none" stroke="#2A3033" strokeWidth="1" />
            <circle cx="150" cy="150" r="90" fill="none" stroke="#2A3033" strokeWidth="1" />
            <circle
              cx="150"
              cy="150"
              r="50"
              fill="none"
              stroke="#FF6A00"
              strokeWidth="1.4"
              strokeDasharray="4 4"
            />
            <circle cx="150" cy="150" r="4" fill="#FF6A00" />
            <text
              x="150"
              y="140"
              textAnchor="middle"
              fill="#F3F3EF"
              fontFamily="Big Shoulders Display"
              fontSize="14"
              fontWeight="700"
            >
              ЛЬВІВ
            </text>
            <text x="150" y="286" textAnchor="middle" fill="#B9B9B3" fontFamily="Inter" fontSize="11">
              умовна схема радіусу виїзду
            </text>
          </svg>
        </div>

        <div>
          <div className="font-display text-sm font-bold text-orange mb-3.5">05 — Географія</div>
          <h2 className="font-display font-extrabold text-[28px] sm:text-[34px] lg:text-[38px] leading-tight mb-5">
            Львів та Львівська область
          </h2>
          <p className="text-base text-paper-dim leading-relaxed mb-4">
            Виїжджаємо на об'єкти в межах Львова та у радіусі приблизно до 100 км по області.
          </p>
          <p className="text-base text-paper-dim leading-relaxed">
            Якщо ваш об'єкт знаходиться за межами цього радіусу — напишіть, обговоримо можливість
            виїзду окремо.
          </p>
        </div>
      </div>
    </section>
  );
}
