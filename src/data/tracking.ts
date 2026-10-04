// ============================================================
// GOOGLE ADS — ID акаунта і мітки конверсій
// ============================================================
// Де взяти:
// Google Ads → Цілі → Конверсії → Створити дію-конверсію → Веб-сайт →
// «Налаштувати вручну / Використати код» → там буде код виду:
//   gtag('event', 'conversion', {'send_to': 'AW-123456789/AbCdEfGhIj'});
// Все ДО слеша — це googleAdsId (можна задати через env VITE_GOOGLE_ADS_ID),
// все ПІСЛЯ слеша — мітка (label). Для кожної дії-конверсії буде своя мітка.
// Порожня мітка = конверсія просто не надсилається, сайт працює далі.
// ============================================================

export const tracking = {
  googleAdsId: ((import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined)?.trim() || "AW-738287418") as string, // акаунт 479-674-1998

  conversionLabels: {
    lead_form: "rZLICNa42YYdELq-heAC", // Заявка з форми (ГОЛОВНА конверсія)
    phone_click: "vXZwCNm42YYdELq-heAC", // Клік по номеру телефону
    // УВАГА: зараз тут та сама мітка, що й у phone_click — тобто кліки в месенджери
    // рахуються як «дзвінок». Якщо хочете бачити їх окремо — створіть в Ads ще одну
    // дію-конверсію і впишіть її мітку сюди.
    messenger_click: "vXZwCNm42YYdELq-heAC", // Клік на Telegram / Viber
  },
};

export type ConversionKind = keyof typeof tracking.conversionLabels;
