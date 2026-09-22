import { site } from "../data/site";

const items = [
  { strong: `${site.region.split(" ")[0]} + ${site.regionRadius}`, text: "область охоплення" },
  { strong: site.legalNote, text: "працюємо як зареєстрований підприємець" },
  { strong: "Своя техніка + партнери", text: "підбираємо склад під об'єкт" },
  { strong: "Прорахунок за фото", text: "без зайвих виїздів наосліп" },
];

export function TrustStrip() {
  return (
    <section className="bg-surface border-b border-line">
      <div className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.strong}
            className={`px-5 sm:px-6 py-6 text-[14.5px] text-paper-dim flex flex-col gap-1.5 border-line ${
              i === 0 ? "" : i === 2 ? "border-l md:border-l" : "border-l"
            } ${i === 2 ? "max-md:border-l-0" : ""}`}
          >
            <strong className="text-paper text-[15px] font-semibold">{item.strong}</strong>
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}
