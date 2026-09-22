// Єдине місце, де тримаємо факти про бізнес.
// Ніколи не додавати сюди вигадані цифри (роки досвіду, кількість клієнтів тощо) —
// тільки те, що підтверджено власником.

export const site = {
  brandName: "ПІДҐРУНТЯ", // робоча назва, до затвердження
  phoneDisplay: "+380 67 707 02 34",
  phoneRaw: "+380677070234", // без пробілів, для tel:/viber:/t.me
  region: "Львів та Львівська область",
  regionRadius: "до 100 км від Львова",
  legalNote: "ФОП, офіційно",
  siteUrl: "https://pidgruntya.pages.dev",
};

export const links = {
  tel: `tel:${site.phoneRaw}`,
  telegram: `https://t.me/${site.phoneRaw}`,
  viber: `viber://chat?number=%2B${site.phoneRaw.replace("+", "")}`,
};
