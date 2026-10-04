// ============================================================
// НАЛАШТУВАННЯ КАЛЬКУЛЯТОРА ОБ'ЄМУ
// ============================================================

/**
 * Машина, по якій рахуємо кількість рейсів.
 * tonnes      — скільки тонн бере за раз.
 * bodyVolumeM3 — скільки кубів влазить у кузов. Якщо null — рахуємо тільки по тоннах.
 *   Для легких матеріалів (чорнозем) кузов заповнюється раніше, ніж набирається вага,
 *   тому ВАЖЛИВО вписати реальний об'єм кузова (уточнити в батька).
 */
export const truck = {
  label: "КамАЗ / МАЗ",
  tonnes: 20,
  bodyVolumeM3: null as number | null,
};

/**
 * Насипна щільність, т/м³ — приблизні довідкові значення.
 * Якщо батько рахує інакше (напр. щебінь 1,5) — змініть тут.
 */
export interface CalcMaterial {
  id: string;
  title: string;
  density: number;
}

export const calcMaterials: CalcMaterial[] = [
  { id: "shchebin-5-20", title: "Щебінь 5–20", density: 1.4 },
  { id: "shchebin-20-40", title: "Щебінь 20–40", density: 1.4 },
  { id: "pisok", title: "Пісок", density: 1.5 },
  { id: "vidsiv", title: "Відсів", density: 1.5 },
  { id: "grunt", title: "Ґрунт", density: 1.5 },
  { id: "chornozem", title: "Чорнозем", density: 1.2 },
  { id: "biy-tsehly", title: "Бій цегли", density: 1.3 },
  { id: "kaminnia", title: "Каміння", density: 1.6 },
];

export interface CalcResult {
  volumeM3: number;
  tonnes: number;
  trucks: number;
}

export function calculate(lengthM: number, widthM: number, thicknessCm: number, material: CalcMaterial): CalcResult | null {
  if (!(lengthM > 0) || !(widthM > 0) || !(thicknessCm > 0)) return null;
  const volumeM3 = lengthM * widthM * (thicknessCm / 100);
  const tonnes = volumeM3 * material.density;
  const byWeight = Math.ceil(tonnes / truck.tonnes);
  const byVolume = truck.bodyVolumeM3 ? Math.ceil(volumeM3 / truck.bodyVolumeM3) : 0;
  return {
    volumeM3: Math.round(volumeM3 * 10) / 10,
    tonnes: Math.round(tonnes * 10) / 10,
    trucks: Math.max(1, byWeight, byVolume),
  };
}

export function trucksWord(n: number): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "машина";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "машини";
  return "машин";
}
