// GA4 + Google Ads через gtag.js.
// - GA4 ID береться з env: VITE_GA4_ID (Cloudflare Pages → Settings → Variables, або .env.production).
// - Google Ads ID і мітки конверсій — src/data/tracking.ts.
// - Скрипт gtag.js вантажиться ПІСЛЯ завантаження сторінки (щоб не гальмувати мобільні),
//   а події, що сталися раніше, стоять у черзі dataLayer і не губляться.
// - Кліки по tel:, viber:, t.me відстежуються автоматично для ВСІХ посилань на сайті.

import { tracking, type ConversionKind } from "../data/tracking";

export type AnalyticsEvent =
  | "phone_click"
  | "viber_click"
  | "telegram_click"
  | "generate_lead" // успішна відправка форми — головна конверсія
  | "form_start"
  | "calculator_use"
  | "calculator_order";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA4_ID = (import.meta.env.VITE_GA4_ID as string | undefined)?.trim() || "";

const conversionMap: Partial<Record<AnalyticsEvent, ConversionKind>> = {
  generate_lead: "lead_form",
  phone_click: "phone_click",
  telegram_click: "messenger_click",
  viber_click: "messenger_click",
};

let initialized = false;

export function initAnalytics(): void {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  const ids = [GA4_ID, tracking.googleAdsId].filter(Boolean);
  if (!ids.length) return;

  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function gtag() {
    // gtag вимагає саме arguments, не масив
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  for (const id of ids) window.gtag("config", id);

  const load = () => {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ids[0]}`;
    document.head.appendChild(s);
  };
  const schedule = () => ("requestIdleCallback" in window ? requestIdleCallback(load, { timeout: 2500 }) : setTimeout(load, 1500));
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  document.addEventListener("click", onLinkClick, { capture: true });
}

function onLinkClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.("a");
  if (!a) return;
  const href = a.getAttribute("href") || "";
  const location = a.closest<HTMLElement>("[data-track]")?.dataset.track ?? "page";
  if (href.startsWith("tel:")) track("phone_click", { location });
  else if (href.startsWith("viber:")) track("viber_click", { location });
  else if (/^https?:\/\/t\.me\//.test(href)) track("telegram_click", { location });
}

function sendAdsConversion(kind: ConversionKind): void {
  const label = tracking.conversionLabels[kind];
  if (!window.gtag || !tracking.googleAdsId || !label) return;
  window.gtag("event", "conversion", { send_to: `${tracking.googleAdsId}/${label}` });
}

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const payload = { ...params, page_path: window.location.pathname };
  window.gtag?.("event", event, payload);
  const conv = conversionMap[event];
  if (conv) sendAdsConversion(conv);
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, payload, conv ? `→ Ads: ${conv}` : "");
  }
}
