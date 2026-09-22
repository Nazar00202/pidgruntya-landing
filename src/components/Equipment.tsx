const tags = [
  "КамАЗ / МАЗ",
  "Екскаватор (JCB)",
  "Навантажувач",
  "Подрібнювач гілок",
  "Трактор",
  "Спецтехніка за запитом",
];

export function Equipment() {
  return (
    <section className="py-24" id="equipment">
      <div className="max-w-[1180px] mx-auto px-6 grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-center">
        <div>
          <div className="font-display text-sm font-bold text-orange mb-3.5">03 — Організація</div>
          <h2 className="font-display font-extrabold text-[28px] sm:text-[34px] lg:text-[38px] leading-tight mb-5">
            Підбираємо техніку під конкретний об'єкт
          </h2>
          <p className="text-[16.5px] text-paper-dim leading-relaxed mb-5">
            <strong className="text-paper">Ми не продаємо оренду техніки</strong> — ми продаємо
            результат. Залежно від задачі залучаємо власну техніку та перевірених партнерів:
            екскаватор, навантажувач, подрібнювач гілок, самоскиди.
          </p>
          <p className="text-[16.5px] text-paper-dim leading-relaxed">
            Вам не потрібно самостійно розбиратись, яка техніка знадобиться і скільки рейсів буде
            потрібно — це вирішуємо ми після оцінки об'єкта.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-7">
            {tags.map((t) => (
              <span key={t} className="text-[13.5px] px-3.5 py-2 border border-line text-paper-dim">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="border border-line aspect-[4/3] bg-surface overflow-hidden">
          <svg viewBox="0 0 400 320" className="w-full h-full">
            <rect width="400" height="320" fill="#15191B" />
            <g stroke="#2A3033" strokeWidth="1">
              <line x1="0" y1="60" x2="400" y2="60" />
              <line x1="0" y1="120" x2="400" y2="120" />
              <line x1="0" y1="180" x2="400" y2="180" />
              <line x1="0" y1="240" x2="400" y2="240" />
              <line x1="80" y1="0" x2="80" y2="320" />
              <line x1="160" y1="0" x2="160" y2="320" />
              <line x1="240" y1="0" x2="240" y2="320" />
              <line x1="320" y1="0" x2="320" y2="320" />
            </g>
            <g fill="none" stroke="#FF6A00" strokeWidth="2">
              <rect x="140" y="150" width="90" height="55" />
              <path d="M230 175 h35 l15 20 v10 h-50 z" />
              <circle cx="165" cy="215" r="12" />
              <circle cx="255" cy="215" r="12" />
              <path d="M140 150 l-25 -45 l30 -8 l20 40" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
