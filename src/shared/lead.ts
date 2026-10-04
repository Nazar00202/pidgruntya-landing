// ============================================================
// СТРУКТУРА ЗАЯВКИ — спільна для сайту і для Cloudflare Pages Function.
// ============================================================
// Задумано так, щоб пізніше кожну заявку можна було показати як пін на карті:
//   location   — населений пункт (+ координати, коли додамо геокодування)
//   service    — що за робота (колір/іконка піна)
//   deadline   — коли потрібно (сортування / фільтр)
//   status     — стадія роботи з заявкою
// Тут без залежностей від браузера чи React — файл імпортує і фронтенд, і функція.
// ============================================================

export const SERVICE_OPTIONS = [
  { value: "material", label: "Доставка щебеню / піску / ґрунту" },
  { value: "combo", label: "Доставка + вивіз сміття одним рейсом" },
  { value: "waste", label: "Вивіз будсміття" },
  { value: "demolition", label: "Демонтаж (гараж, сарай, будинок)" },
  { value: "clearing", label: "Розчистка ділянки (дерева, кущі, пні)" },
  { value: "leveling", label: "Планування / засипка ділянки" },
  { value: "other", label: "Інше" },
] as const;
export type ServiceKey = (typeof SERVICE_OPTIONS)[number]["value"];

export const MATERIAL_OPTIONS = [
  "Щебінь 5–20",
  "Щебінь 20–40",
  "Пісок",
  "Відсів",
  "Ґрунт",
  "Чорнозем",
  "Бій цегли",
  "Каміння",
  "Інше / не знаю",
] as const;

export const WHEN_OPTIONS = [
  { value: "asap", label: "Якнайшвидше" },
  { value: "this_week", label: "Цього тижня" },
  { value: "this_month", label: "Цього місяця" },
  { value: "date", label: "Конкретна дата" },
  { value: "not_sure", label: "Ще не знаю, рахую" },
] as const;
export type WhenKey = (typeof WHEN_OPTIONS)[number]["value"];

export const HEARD_FROM_OPTIONS = [
  { value: "google", label: "Google" },
  { value: "olx", label: "OLX" },
  { value: "facebook", label: "Facebook" },
  { value: "truck_sticker", label: "Наліпка на машині" },
  { value: "friends", label: "Знайомі" },
  { value: "other", label: "Інше" },
] as const;
export type HeardFromKey = (typeof HEARD_FROM_OPTIONS)[number]["value"];

export const LEAD_STATUSES = ["new", "contacted", "scheduled", "in_progress", "done", "cancelled"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type Utm = Partial<Record<UtmKey, string>>;

export interface Lead {
  id: string;
  createdAt: string; // ISO
  status: LeadStatus;
  service: ServiceKey;
  contact: { name: string; phone: string };
  location: {
    settlement: string; // як написала людина: «Пустомити, вул. ...»
    lat: number | null; // заповнимо пізніше (геокодування або вручну)
    lng: number | null;
  };
  deadline: { when: WhenKey; date: string | null }; // date у форматі YYYY-MM-DD
  order: {
    material: string | null;
    volume: string | null;
    calc: { lengthM: number; widthM: number; thicknessCm: number; volumeM3: number; trucks: number } | null;
  };
  comment: string;
  source: {
    heardFrom: HeardFromKey | null;
    utm: Utm;
    landingPage: string;
    referrer: string;
  };
  photosCount: number;
}

// ---------------- Розбір і перевірка (працює і в браузері, і у функції) ----------------

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const num = (v: unknown) => {
  const n = typeof v === "string" ? parseFloat(v.replace(",", ".")) : NaN;
  return Number.isFinite(n) ? n : null;
};

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("0")) return `+38${digits}`;
  if (digits.length === 12 && digits.startsWith("380")) return `+${digits}`;
  return raw.trim();
}

export function isValidPhone(raw: string): boolean {
  return raw.replace(/\D/g, "").length >= 9;
}

type Getter = (key: string) => unknown;

export function parseLead(
  get: Getter,
  meta: { id: string; createdAt: string; photosCount: number }
): { ok: true; lead: Lead } | { ok: false; error: string } {
  const name = str(get("name"), 120);
  const phone = normalizePhone(str(get("phone"), 40));
  const settlement = str(get("settlement"), 200);
  const service = str(get("service"), 30) as ServiceKey;
  const when = (str(get("when"), 20) || "not_sure") as WhenKey;
  const heardFrom = str(get("heard_from"), 30) as HeardFromKey;

  if (!name) return { ok: false, error: "Вкажіть ім'я" };
  if (!isValidPhone(phone)) return { ok: false, error: "Перевірте номер телефону" };
  if (!settlement) return { ok: false, error: "Вкажіть населений пункт" };
  if (!SERVICE_OPTIONS.some((o) => o.value === service)) return { ok: false, error: "Оберіть послугу" };

  const date = str(get("date"), 10);
  const lengthM = num(get("calc_length"));
  const widthM = num(get("calc_width"));
  const thicknessCm = num(get("calc_thickness"));
  const volumeM3 = num(get("calc_volume"));
  const trucks = num(get("calc_trucks"));

  const utm: Utm = {};
  for (const k of UTM_KEYS) {
    const v = str(get(k), 200);
    if (v) utm[k] = v;
  }

  return {
    ok: true,
    lead: {
      id: meta.id,
      createdAt: meta.createdAt,
      status: "new",
      service,
      contact: { name, phone },
      location: { settlement, lat: null, lng: null },
      deadline: {
        when: WHEN_OPTIONS.some((o) => o.value === when) ? when : "not_sure",
        date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null,
      },
      order: {
        material: str(get("material"), 60) || null,
        volume: str(get("volume"), 100) || null,
        calc:
          lengthM && widthM && thicknessCm && volumeM3 && trucks
            ? { lengthM, widthM, thicknessCm, volumeM3, trucks }
            : null,
      },
      comment: str(get("comment"), 2000),
      source: {
        heardFrom: HEARD_FROM_OPTIONS.some((o) => o.value === heardFrom) ? heardFrom : null,
        utm,
        landingPage: str(get("landing_page"), 300),
        referrer: str(get("referrer"), 300),
      },
      photosCount: meta.photosCount,
    },
  };
}

export function labelOf<T extends { value: string; label: string }>(list: readonly T[], value: string | null): string {
  return list.find((o) => o.value === value)?.label ?? (value || "—");
}
