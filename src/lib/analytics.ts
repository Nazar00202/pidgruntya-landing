// Мінімальна обгортка над GA4/Meta Pixel.
// Нічого не робить, поки VITE_GA4_ID / VITE_META_PIXEL_ID не задані в .env —
// safe no-op на етапі розробки, щоб не ловити помилки в консолі.

export type AnalyticsEvent =
  | "phone_click"
  | "telegram_click"
  | "viber_click"
  | "form_start"
  | "form_submit"
  | "photo_upload"
  | "quote_request"
  | "case_view"
  | "scroll_50"
  | "scroll_90";

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  if (window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
  if (window.fbq) {
    window.fbq("trackCustom", event, params);
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, params);
  }
}
