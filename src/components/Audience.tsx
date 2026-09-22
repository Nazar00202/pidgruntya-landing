const b2c = [
  "Купили ділянку зі старою забудовою або заростями",
  "Готуєтесь до будівництва",
  "Приводите до ладу дачну територію",
  "Хочете підготувати ділянку перед продажем",
];

const b2b = [
  "Будівельні бригади та генпідрядники",
  "Забудовники — підготовка ділянок",
  "Власники комерційних територій, складів",
  "Фермерські господарства",
];

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="text-[14.5px] text-paper-dim relative pl-4.5">
          <span className="absolute left-0 top-2.5 w-1.5 h-px bg-orange" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Audience() {
  return (
    <section className="pb-24" id="audience">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="max-w-[640px] mb-13">
          <div className="font-display text-sm font-bold text-orange mb-3.5">04 — Для кого</div>
          <h2 className="font-display font-extrabold text-[30px] sm:text-[38px] lg:text-[44px] leading-tight">
            Працюємо з приватними та комерційними об'єктами
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-line border border-line">
          <div className="bg-void p-9 sm:p-10">
            <div className="text-[12.5px] font-bold text-orange tracking-wide mb-4">ПРИВАТНІ ВЛАСНИКИ</div>
            <h3 className="font-display font-bold text-2xl mb-4.5">Власна ділянка</h3>
            <List items={b2c} />
          </div>
          <div className="bg-void p-9 sm:p-10">
            <div className="text-[12.5px] font-bold text-orange tracking-wide mb-4">БІЗНЕС</div>
            <h3 className="font-display font-bold text-2xl mb-4.5">Будівельники та підприємства</h3>
            <List items={b2b} />
          </div>
        </div>
      </div>
    </section>
  );
}
