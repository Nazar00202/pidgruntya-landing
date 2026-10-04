// ============================================================
// ЦІНИ — ЄДИНЕ МІСЦЕ, ДЕ ЇХ ТРЕБА МІНЯТИ
// ============================================================
// Як міняти:
//   price: 1200      → на сайті буде «від 1 200 грн/т» (якщо from: true) або «1 200 грн/т»
//   price: null      → на сайті буде «Ціну уточнюйте за телефоном»
// Після зміни: закомітити й запушити в main — Cloudflare сам перезбере сайт.
// НЕ вписуйте ціни «з голови» — тільки ті, що назвав батько.
// ============================================================

export type PriceUnit = "т" | "м³" | "машину" | "рейс" | "об'єкт";

export interface PriceItem {
  id: string;
  title: string;
  /** null = ціна не задана, показуємо «Ціну уточнюйте за телефоном» */
  price: number | null;
  unit: PriceUnit;
  /** true → «від 1 200 грн» */
  from?: boolean;
  /** Коротко: для чого цей матеріал (простими словами) */
  usage?: string;
}

export const NO_PRICE_TEXT = "Ціну уточнюйте за телефоном";

/** Доставка однієї машини. Діапазон узято з попередньої версії сайту — ПЕРЕВІРТЕ з батьком. */
export const deliveryPerTruck: { from: number | null; to: number | null } = {
  from: 3500,
  to: 5000,
};

/** Тоннаж машин, які реально є (показується в текстах). */
export const truckTonnages = [10, 15, 20];

// ---------- Щебінь (головний продукт) ----------
export const shchebinFractions: PriceItem[] = [
  {
    id: "shchebin-5-20",
    title: "Щебінь 5–20",
    price: null,
    unit: "т",
    from: true,
    usage: "Дрібніший. Під бетон, фундамент, стяжку, доріжки й відмостку.",
  },
  {
    id: "shchebin-20-40",
    title: "Щебінь 20–40",
    price: null,
    unit: "т",
    from: true,
    usage: "Крупніший. Під дренаж, основу під'їзду, майданчик під машину, подушку під фундамент.",
  },
];

// ---------- Інші сипучі ----------
export const materialPrices: PriceItem[] = [
  { id: "pisok", title: "Пісок", price: null, unit: "т", from: true, usage: "Розчин, кладка, стяжка, підсипка під плитку." },
  { id: "vidsiv", title: "Відсів", price: null, unit: "т", from: true, usage: "Основа під бруківку й плитку, доріжки." },
  { id: "grunt", title: "Ґрунт", price: null, unit: "т", from: true, usage: "Підняти рівень ділянки, засипати ями." },
  { id: "chornozem", title: "Чорнозем", price: null, unit: "т", from: true, usage: "Город, газон, клумби." },
  { id: "biy-tsehly", title: "Бій цегли", price: null, unit: "т", from: true, usage: "Підсипка доріг і під'їздів, засипка ям." },
  { id: "kaminnia", title: "Каміння", price: null, unit: "т", from: true, usage: "Укріплення, підсипка, габіони." },
];

// ---------- Послуги ----------
export const servicePrices: Record<
  "vyvizSmittia" | "demontazh" | "rozchystka" | "planuvannia",
  PriceItem
> = {
  vyvizSmittia: { id: "vyviz", title: "Вивіз будсміття", price: null, unit: "машину", from: true },
  demontazh: { id: "demontazh", title: "Демонтаж", price: null, unit: "об'єкт", from: true },
  rozchystka: { id: "rozchystka", title: "Розчистка ділянки", price: null, unit: "об'єкт", from: true },
  planuvannia: { id: "planuvannia", title: "Планування та засипка", price: null, unit: "об'єкт", from: true },
};

// ---------- Хелпери (не чіпати) ----------
const nf = new Intl.NumberFormat("uk-UA");

export function formatPrice(item: Pick<PriceItem, "price" | "unit" | "from">): string {
  if (item.price == null) return NO_PRICE_TEXT;
  return `${item.from ? "від " : ""}${nf.format(item.price)} грн/${item.unit}`;
}

export function hasPrice(item: Pick<PriceItem, "price">): boolean {
  return item.price != null;
}

/** «від 3 500 грн за машину» або null, якщо ціна доставки не задана */
export function deliveryFromText(): string | null {
  if (deliveryPerTruck.from == null) return null;
  return `від ${nf.format(deliveryPerTruck.from)} грн за машину`;
}
