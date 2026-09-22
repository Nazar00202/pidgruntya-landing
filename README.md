# ПІДҐРУНТЯ — Лендінг

Сайт для сервісу розчищення, демонтажу та підготовки земельних ділянок під ключ (Львів та область).

Стек: React + Vite + TypeScript + Tailwind CSS, форма заявки — через Cloudflare Pages Function.

> **"ПІДҐРУНТЯ" — робоча назва**, придумана як заглушка. Замінити на реальну у `src/data/site.ts`, коли визначитесь.

---

## 1. Запуск локально

```bash
npm install
npm run dev
```

Відкриється на `http://localhost:5173`.

```bash
npm run build     # продакшн-збірка в /dist
npm run preview   # локальний перегляд збірки
```

---

## 2. Структура проєкту

```
src/
  components/     — секції сайту (Header, Hero, Services, LeadForm, ...)
  data/           — контент: тексти послуг, FAQ, контакти (site.ts)
  lib/analytics.ts — обгортка над GA4 / Meta Pixel
functions/api/lead.ts — Cloudflare Pages Function, приймає форму і шле в Telegram
public/images/    — сюди кладете реальні фото (папки hero, cases, services, equipment, before-after)
```

**Де редагувати текст і контакти:**
- Телефон, назва, географія — `src/data/site.ts`
- Список послуг, кроки процесу, FAQ — `src/data/services.ts`
- Заголовок і підзаголовок хіро — `src/components/Hero.tsx`

**Заміна ілюстрацій на реальні фото:**
У `src/components/Transformation.tsx` є коментар `// ЗАМІНА НА РЕАЛЬНІ ФОТО` — там зараз векторні
схеми замість фото "до/після". Коли з'являться реальні фото, покладіть їх у
`public/images/before-after/` і замініть SVG-компоненти на звичайні `<img src="/images/before-after/....jpg" />`.

---

## 3. Заливка на GitHub

```bash
git init
git add .
git commit -m "Initial landing"
git branch -M main
git remote add origin https://github.com/<ваш-акаунт>/<назва-репо>.git
git push -u origin main
```

---

## 4. Підключення Cloudflare Pages

1. Зайдіть на [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Виберіть свій GitHub-репозиторій.
3. Налаштування збірки:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Натисніть **Save and Deploy**. Cloudflare Pages Free дає безкоштовний хостинг та білди.

Сайт зʼявиться на `https://<назва-проєкту>.pages.dev`.

---

## 5. Підключення власного домену

1. У Cloudflare Pages проєкті → **Custom domains** → **Set up a custom domain**.
2. Якщо домен вже на Cloudflare — прив'язка автоматична.
3. Якщо домен в іншого реєстратора — додайте DNS-записи (CNAME на `<проєкт>.pages.dev`), які покаже Cloudflare.
4. Для безкоштовного варіанту на старті можна зареєструвати домен у зоні `.pp.ua` через акредитованого реєстратора (перевірте актуальні умови на [pp.ua](https://pp.ua)) або просто користуватись `pages.dev`, поки немає стабільного потоку заявок.

---

## 6. Environment variables (секрети)

Форма заявки шле повідомлення в Telegram через `functions/api/lead.ts`. Потрібні дві змінні:

1. Створіть Telegram-бота через [@BotFather](https://t.me/BotFather) → отримаєте `TELEGRAM_BOT_TOKEN`.
2. Дізнайтесь свій `chat_id`: напишіть боту будь-що, потім відкрийте
   `https://api.telegram.org/bot<TOKEN>/getUpdates` і знайдіть `"chat":{"id": ...}`.
3. У Cloudflare Pages → ваш проєкт → **Settings** → **Environment variables** → додайте:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
4. Ці змінні доступні тільки у Pages Function (`functions/api/lead.ts`), у фронтенд-код вони не потрапляють.

Локально для розробки скопіюйте `.env.example` → `.env` (Vite підхопить автоматично для `VITE_*` змінних; секрети Telegram для локальної роботи функції знадобляться через `wrangler pages dev` — див. [документацію Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)).

---

## 7. Google Analytics 4 / Search Console / Ads

1. **GA4:** створіть властивість на [analytics.google.com](https://analytics.google.com), отримайте `Measurement ID` (формат `G-XXXXXXX`), додайте в `.env` як `VITE_GA4_ID` і підключіть тег у `index.html` (за замовчуванням не підключено, щоб не зʼявлялись фейкові дані на етапі розробки).
2. **Search Console:** [search.google.com/search-console](https://search.google.com/search-console) → додайте домен → підтвердіть через DNS-запис або HTML-файл → надішліть `sitemap.xml` (уже є в `public/`).
3. **Google Ads:** налаштовується окремо в [ads.google.com](https://ads.google.com), конверсію повʼязати з подіями `quote_request` / `form_submit` з `src/lib/analytics.ts`.

---

## 8. Оновлення сайту після запуску

- Зміна тексту/цін/контактів → редагуйте файли в `src/data/`, закомітьте, запуште в `main` — Cloudflare Pages задеплоїть автоматично.
- Додавання нового кейсу → додайте фото в `public/images/cases/`, розширте контент (наразі кейс-блок не винесений в окремий компонент — додасте, коли зʼявиться перший реальний кейс).
- Заміна фото → просто кладете новий файл у відповідну папку `public/images/...` і оновлюєте шлях у коді.

---

## 9. Що ще передбачено в архітектурі, але не в MVP

- Окремі SEO-сторінки під кожну послугу (`/rozchystka-dilianky`, `/vyviz-gruntu` тощо) — додавати після перших рекламних даних, коли зрозуміло, які ключі конвертують.
- CRM — на старті Google Sheets (колонки: дата, ім'я, телефон, послуга, адреса, фото, статус NEW → CONTACTED → PHOTO_RECEIVED → ESTIMATE → BOOKED → COMPLETED → LOST).
- Meta Pixel, ретаргетинг — підключаються аналогічно GA4, через `.env` та `index.html`.
