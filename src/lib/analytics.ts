// Обгортка над GA4 (через gtag.js, підключений в index.html) та Meta Pixel.
// Безпечна навіть якщо жоден з них ще не підключений — просто нічого не робить.

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
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", event, params);
  }
  if (window.fbq) {
    window.fbq("trackCustom", event, params);
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, params);
  }
}
