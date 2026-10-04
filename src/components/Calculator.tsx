import { useEffect, useMemo, useRef, useState } from "react";
import { Calculator as CalcIcon, ArrowRight } from "lucide-react";
import { calcMaterials, calculate, truck, trucksWord } from "../config/calculator";
import { prefillLead } from "../lib/leadBus";
import { track } from "../lib/analytics";
import { Container, SectionTitle } from "./ui";

const nf = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 1 });
const parse = (v: string) => parseFloat(v.replace(",", "."));

const inputCls =
  "w-full bg-void border border-line text-paper px-3.5 py-3.5 text-[17px] rounded-sm focus:outline focus:outline-2 focus:outline-orange";

export function Calculator({ defaultMaterial = "shchebin-5-20" }: { defaultMaterial?: string }) {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [materialId, setMaterialId] = useState(defaultMaterial);
  const tracked = useRef(false);

  const material = calcMaterials.find((m) => m.id === materialId) ?? calcMaterials[0];
  const result = useMemo(
    () => calculate(parse(length), parse(width), parse(thickness), material),
    [length, width, thickness, material]
  );

  useEffect(() => {
    if (result && !tracked.current) {
      tracked.current = true;
      track("calculator_use", { material: material.title });
    }
  }, [result, material]);

  function order() {
    if (!result) return;
    const l = parse(length);
    const w = parse(width);
    const t = parse(thickness);
    track("calculator_order", { material: material.title, volume_m3: result.volumeM3 });
    prefillLead({
      service: "material",
      material: material.title,
      volume: `${nf.format(result.volumeM3)} м³ (~${nf.format(result.tonnes)} т), ${result.trucks} ${trucksWord(result.trucks)}`,
      calc: { lengthM: l, widthM: w, thicknessCm: t, volumeM3: result.volumeM3, trucks: result.trucks },
    });
  }

  return (
    <section className="py-16 sm:py-24 border-b border-line" id="kalkuliator">
      <Container>
        <SectionTitle
          eyebrow="Калькулятор"
          title="Скільки треба матеріалу?"
          lead="Введіть розміри майданчика і товщину шару — покажемо кубометри і скільки приблизно машин."
        />
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-px bg-line border border-line">
          <div className="bg-surface p-5 sm:p-8 grid gap-4">
            <div>
              <label htmlFor="c-material" className="block text-[14px] text-paper-dim mb-2">
                Матеріал
              </label>
              <select id="c-material" value={materialId} onChange={(e) => setMaterialId(e.target.value)} className={inputCls}>
                {calcMaterials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "c-l", label: "Довжина, м", value: length, set: setLength, ph: "10" },
                { id: "c-w", label: "Ширина, м", value: width, set: setWidth, ph: "5" },
                { id: "c-t", label: "Шар, см", value: thickness, set: setThickness, ph: "20" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-[13px] sm:text-[14px] text-paper-dim mb-2">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder={f.ph}
                    value={f.value}
                    onChange={(e) => f.set(e.target.value.replace(/[^\d.,]/g, ""))}
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
            <p className="text-[13px] text-paper-dim leading-relaxed">
              Розрахунок приблизний. Під трамбування зазвичай беруть із запасом — уточнимо по телефону.
            </p>
          </div>

          <div className="bg-void p-5 sm:p-8 flex flex-col justify-between gap-6" aria-live="polite">
            {result ? (
              <>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <div className="text-[13px] text-paper-dim">Об'єм</div>
                    <div className="font-display font-bold text-[40px] sm:text-[48px] leading-none">
                      {nf.format(result.volumeM3)} <span className="text-2xl">м³</span>
                    </div>
                    <div className="text-[14px] text-paper-dim mt-1">≈ {nf.format(result.tonnes)} т</div>
                  </div>
                  <div>
                    <div className="text-[13px] text-paper-dim">Машин</div>
                    <div className="font-display font-bold text-[40px] sm:text-[48px] leading-none text-yellow">
                      ≈ {result.trucks}
                    </div>
                    <div className="text-[14px] text-paper-dim mt-1">
                      {trucksWord(result.trucks)} по {truck.tonnes} т
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={order}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm bg-orange text-void font-bold text-[16px] hover:bg-[#ff7d1f] transition-colors"
                >
                  Замовити цей об'єм <ArrowRight className="w-5 h-5" aria-hidden />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center gap-3 py-8 text-paper-dim">
                <CalcIcon className="w-10 h-10 text-orange" strokeWidth={1.5} aria-hidden />
                <p className="max-w-[30ch]">Введіть довжину, ширину й товщину шару — тут з'явиться результат.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
