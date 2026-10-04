# ПІДҐРУНТЯ — сайт (pidgruntya.pp.ua)

Доставка щебеню, піску, чорнозему КамАЗом + вивіз сміття, демонтаж, розчистка ділянок. Львів і область до 100 км.

Стек: React + Vite + TypeScript + Tailwind. Хостинг — Cloudflare Pages. Кожна сторінка
пререндериться в окремий HTML (швидко на телефоні + Google бачить текст і мета-теги).

## Сторінки

| Адреса | Для чого |
|---|---|
| `/` | Головна: щебінь і сипучі, калькулятор, комбо, знижки, фото, заявка |
| `/shchebin` | Щебінь (під Google Ads «щебінь Львів») |
| `/pisok-chornozem` | Пісок, чорнозем, ґрунт, відсів, бій цегли, каміння |
| `/vyviz-smittia` | Вивіз будсміття |
| `/demontazh` | Демонтаж гаражів, сараїв, будинків |
| `/rozchystka-dilianky` | Розчистка: дерева, кущі, пні, планування, засипка |

## Де що міняти (без правок верстки)

| Що | Файл |
|---|---|
| **Ціни** (null → «Ціну уточнюйте за телефоном») | `src/config/prices.ts` |
| Машина для калькулятора (т, м³ кузова), щільність матеріалів | `src/config/calculator.ts` |
| Знижки | `src/config/discounts.ts` |
| Фото до/після (файли в `public/photos`) | `src/config/photos.ts` |
| Телефон, Telegram @username, назва | `src/data/site.ts` |
| Тексти сторінок послуг, title/description для Google, FAQ | `src/data/pages.ts` |
| Google Ads ID і мітки конверсій | `src/data/tracking.ts` |
| Поля форми, варіанти «Звідки дізналися», структура заявки | `src/shared/lead.ts` |

Список того, що треба уточнити в батька: [`docs/UTOCHNYTY.md`](docs/UTOCHNYTY.md).

## Запуск локально

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # збірка в dist/ (webp → tsc → vite → пререндер → sitemap)
npm run lint       # перевірка типів (сайт + функція)
```

Перевірити форму локально разом із функцією:
```bash
npm run build
printf 'TELEGRAM_BOT_TOKEN=...\nTELEGRAM_CHAT_ID=...\n' > .dev.vars   # не комітиться
npx wrangler pages dev dist
```

## Як влаштовано

- **Роутинг**: список сторінок — `src/data/pages.ts`; `scripts/prerender.mjs` після збірки
  створює `dist/index.html`, `dist/shchebin.html` … Cloudflare віддає `shchebin.html` за адресою
  `/shchebin`, тому прямі посилання з реклами працюють. `public/_redirects` прибирає зайвий `/`
  в кінці та старі варіанти адрес. Невідомі адреси → `404.html` зі статусом 404.
- **Фото**: кладете `.jpg` у `public/photos`, при збірці `scripts/optimize-images.mjs` робить
  webp 480/960/1600 px; компонент `<Picture>` сам обирає розмір, усе нижче першого екрана — lazy.
- **Форма** → `POST /api/lead` (`functions/api/lead.ts`) → перевірка → повідомлення в Telegram
  (+ фото, + посилання на карту). Якщо підключити KV-namespace з назвою `LEADS`, кожна заявка ще
  зберігається як JSON — це база для майбутньої карти з пінами (послуга, населений пункт,
  дедлайн, статус; координати `lat/lng` поки `null`).
- **UTM**: `utm_*`, `gclid`, `fbclid` і сторінка входу запам'ятовуються на 30 днів і
  додаються до заявки (`src/lib/utm.ts`).
- **Аналітика** (`src/lib/analytics.ts`): gtag.js вантажиться після завантаження сторінки.
  Події: `phone_click`, `viber_click`, `telegram_click` (автоматично для всіх посилань
  tel:/viber:/t.me), `generate_lead` (успішна відправка форми), а також `form_start`,
  `calculator_use`, `calculator_order`.

## Деплой

1. Пуш у `main` → Cloudflare Pages збирає сам (Build command `npm run build`, output `dist`).
2. **Змінні середовища** (Cloudflare → Workers & Pages → проєкт → Settings → Variables and Secrets,
   для Production і Preview):
   - `TELEGRAM_BOT_TOKEN` — тип **Secret**
   - `TELEGRAM_CHAT_ID` — тип Secret або Text
   - `VITE_GA4_ID` — необов'язково, за замовчуванням береться з `.env.production`
   - `NODE_VERSION` = `20` (якщо білд скаржиться на версію Node)
3. Після деплою: відкрити `/shchebin`, відправити тестову заявку, перевірити, що прийшла в Telegram.

## Telegram-бот (один раз)

1. [@BotFather](https://t.me/BotFather) → `/newbot` → отримаєте токен → `TELEGRAM_BOT_TOKEN`.
2. Напишіть своєму боту будь-що (або додайте його в групу, де сидите з батьком).
3. Відкрийте `https://api.telegram.org/bot<ТОКЕН>/getUpdates` → `"chat":{"id": ...}` → `TELEGRAM_CHAT_ID`
   (для групи id від'ємний, напр. `-100…`).

## GA4 / Google Ads

1. GA4 → Адміністратор → Події → позначте як **ключові події**: `generate_lead`, `phone_click`,
   `viber_click`, `telegram_click` (з'являться в списку після перших кліків).
2. Google Ads → Цілі → Конверсії → Імпорт → Google Analytics 4 → виберіть ці ключові події
   (або залиште прямі Ads-теги з `src/data/tracking.ts` — вони вже працюють; не рахуйте одну дію двічі).
3. Search Console → додати домен → надіслати `https://pidgruntya.pp.ua/sitemap.xml`.
