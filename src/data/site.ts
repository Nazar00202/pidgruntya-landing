// Єдине місце, де тримаємо факти про бізнес.
// Ніколи не додавати сюди вигадані цифри (роки досвіду, кількість клієнтів тощо) —
// тільки те, що підтверджено власником.

export const site = {
  brandName: "ПІДҐРУНТЯ", // робоча назва, до затвердження
  phoneDisplay: "067 707 02 34",
  phoneIntl: "+380 67 707 02 34",
  phoneRaw: "+380677070234", // без пробілів, для tel:/viber:/t.me
  region: "Львів і Львівська область",
  regionRadius: "до 100 км від Львова",
  radiusKm: 100,
  legalNote: "Працюємо як ФОП",
  siteUrl: "https://pidgruntya.pp.ua",
  // Якщо у Telegram є @username — впишіть його сюди (без @). Тоді посилання буде t.me/username,
  // воно працює завжди. Поки null — використовується t.me/+380..., що працює, лише якщо
  // в налаштуваннях Telegram дозволено знаходити вас за номером.
  telegramUsername: null as string | null,
};

export const links = {
  tel: `tel:${site.phoneRaw}`,
  telegram: site.telegramUsername ? `https://t.me/${site.telegramUsername}` : `https://t.me/${site.phoneRaw}`,
  viber: `viber://chat?number=%2B${site.phoneRaw.replace("+", "")}`,
};
