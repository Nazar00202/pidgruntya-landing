// Обгортка над GA4 + Google Ads (через gtag.js, підключений в index.html) та Meta Pixel.
// Безпечна навіть якщо жоден з них ще не підключений — просто нічого не робить.

import { tracking, type ConversionKind } from "../data/tracking";

export type AnalyticsEvent =
  | "phone_click"
  | "telegram_click"
  | "viber_click"
  | "form_start"
  | "form_submit"
  | "generate_lead" // рекомендована подія GA4 — позначте її як «ключову подію»
  | "photo_upload"
  | "quote_request"
  | "case_view"
  | "scroll_50"
  | "scroll_90";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// Які події сайту рахуються як конверсії Google Ads
const conversionMap: Partial<Record<AnalyticsEvent, ConversionKind>> = {
  generate_lead: "lead_form",
  phone_click: "phone_click",
  telegram_click: "messenger_click",
  viber_click: "messenger_click",
};

/** Викликається один раз при старті — підключає Google Ads тег поверх GA4. */
export function initAds(): void {
  if (typeof window === "undefined" || !window.gtag) return;
  if (tracking.googleAdsId) {
    window.gtag("config", tracking.googleAdsId);
  }
}

function sendAdsConversion(kind: ConversionKind): void {
  const label = tracking.conversionLabels[kind];
  if (!window.gtag || !tracking.googleAdsId || !label) return;
  window.gtag("event", "conversion", {
    send_to: `${tracking.googleAdsId}/${label}`,
  });
}

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", event, params);
  }
  const conv = conversionMap[event];
  if (conv) sendAdsConversion(conv);

  if (window.fbq) {
    window.fbq(event === "generate_lead" ? "track" : "trackCustom", event === "generate_lead" ? "Lead" : event, params);
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, params, conv ? `→ Ads conversion: ${conv}` : "");
  }
}

// ---- Передвибір послуги у формі з будь-якої кнопки на сторінці ----
export type ServiceKey = "delivery" | "removal" | "clearing" | "demolition" | "other";

export function preselectService(service: ServiceKey): void {
  window.dispatchEvent(new CustomEvent<ServiceKey>("lead:service", { detail: service }));
}
