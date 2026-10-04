import { site } from "../data/site";
import { truckTonnages } from "../config/prices";

const items = [
  { strong: "Свої КамАЗи й МАЗи", text: "без посередників" },
  { strong: `Машини ${truckTonnages.join(" / ")} т`, text: "під ваш обсяг" },
  { strong: `До ${site.radiusKm} км`, text: "Львів і область" },
  { strong: site.legalNote, text: "офіційно" },
];

export function TrustStrip() {
  return (
    <section className="bg-surface border-b border-line">
      <ul className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={item.strong}
            className={`px-4 sm:px-6 py-5 text-[14px] text-paper-dim flex flex-col gap-1 border-line ${i % 2 ? "border-l" : ""} ${
              i > 1 ? "border-t md:border-t-0" : ""
            } ${i === 2 ? "md:border-l" : ""}`}
          >
            <strong className="text-paper text-[15px] font-semibold">{item.strong}</strong>
            {item.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
