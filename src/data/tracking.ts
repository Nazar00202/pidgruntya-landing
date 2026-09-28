// ============================================================
// GOOGLE ADS — ЄДИНЕ МІСЦЕ, ДЕ ТРЕБА ВПИСАТИ СВОЇ ДАНІ
// ============================================================
// Де взяти:
// Google Ads → Цілі → Конверсії → Створити дію-конверсію → Веб-сайт →
// «Налаштувати вручну / Використати код» → там буде код виду:
//   gtag('event', 'conversion', {'send_to': 'AW-123456789/AbCdEfGhIj'});
// Все ДО слеша — це googleAdsId, все ПІСЛЯ слеша — мітка (label).
// Для кожної дії-конверсії буде своя мітка.
//
// Поки поля порожні — сайт працює як звичайно, просто конверсії в Ads не йдуть.
// ============================================================

export const tracking = {
  googleAdsId: "AW-738287418", // акаунт 479-674-1998

  conversionLabels: {
    lead_form: "rZLICNa42YYdELq-heAC", // Заявка з форми (ГОЛОВНА конверсія)
    phone_click: "vXZwCNm42YYdELq-heAC", // Клік по номеру телефону
    messenger_click: "vXZwCNm42YYdELq-heAC", // Клік на Telegram / Viber
  },
};

export type ConversionKind = keyof typeof tracking.conversionLabels;
