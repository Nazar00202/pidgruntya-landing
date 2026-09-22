import { cases } from "../data/cases";

export function Cases() {
  return (
    <section className="py-24 border-t border-line" id="cases">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="max-w-[640px] mb-13">
          <h2 className="font-display font-extrabold text-[28px] sm:text-[34px] lg:text-[38px] leading-tight">
            Реальні кейси
          </h2>
          <p className="mt-4 text-paper-dim text-[16.5px] leading-relaxed">
            Кілька об'єктів, які вже виконали — без стокових фото, тільки реальні роботи.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div key={c.title} className="border border-line bg-surface flex flex-col">
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-auto block border-b border-line"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-2.5">{c.title}</h3>
                <p className="text-[14px] text-paper-dim leading-relaxed">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
