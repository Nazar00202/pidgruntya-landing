// Запам'ятовує UTM-мітки, gclid і сторінку входу з першого заходу на сайт (на 30 днів),
// щоб заявка, відправлена пізніше або з іншої сторінки, все одно мала джерело.

import { UTM_KEYS, type Utm } from "../shared/lead";

const KEY = "pg_attribution";
const TTL = 30 * 24 * 60 * 60 * 1000;

export interface Attribution {
  utm: Utm;
  landingPage: string;
  referrer: string;
  ts: number;
}

function read(): Attribution | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const a = JSON.parse(raw) as Attribution;
    return Date.now() - a.ts < TTL ? a : null;
  } catch {
    return null;
  }
}

let memory: Attribution | null = null;

/** Викликати один раз при завантаженні сторінки. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utm: Utm = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) utm[k] = v.slice(0, 200);
  }
  const hasNew = Object.keys(utm).length > 0;
  const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
  const existing = read();

  // Нові мітки в URL переписують старі (остання реклама, з якої прийшли)
  if (hasNew || !existing) {
    memory = { utm, landingPage: window.location.pathname + window.location.search, referrer: ref, ts: Date.now() };
    try {
      localStorage.setItem(KEY, JSON.stringify(memory));
    } catch {
      /* приватний режим — просто тримаємо в пам'яті */
    }
  } else {
    memory = existing;
  }
}

export function getAttribution(): Attribution {
  return memory ?? read() ?? { utm: {}, landingPage: window.location.pathname, referrer: "", ts: Date.now() };
}
