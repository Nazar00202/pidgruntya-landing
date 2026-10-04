// Cloudflare Pages Function: POST /api/lead
//
// Приймає форму заявки (multipart/form-data), перевіряє її, складає об'єкт Lead
// (структура — src/shared/lead.ts) і надсилає в Telegram.
//
// Змінні середовища (ТІЛЬКИ в Cloudflare → Pages → Settings → Variables and Secrets):
//   TELEGRAM_BOT_TOKEN  — токен бота від @BotFather (тип Secret)
//   TELEGRAM_CHAT_ID    — ваш chat_id (або id групи)
// Необов'язково:
//   LEADS               — KV namespace binding. Якщо підключити, кожна заявка ще й
//                         зберігається як JSON (ключ lead:<дата>:<id>) — знадобиться для карти.

import { parseLead, labelOf, SERVICE_OPTIONS, WHEN_OPTIONS, HEARD_FROM_OPTIONS, type Lead } from "../../src/shared/lead";

interface KVLike {
  put(key: string, value: string): Promise<void>;
}

interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  LEADS?: KVLike;
}

type PagesFunction<E = unknown> = (context: { request: Request; env: E }) => Promise<Response> | Response;

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 10 * 1024 * 1024; // ліміт Telegram на sendPhoto

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8" } });

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function formatTelegram(lead: Lead): string {
  const { contact, location, deadline, order, source } = lead;
  const when =
    deadline.when === "date" && deadline.date
      ? deadline.date.split("-").reverse().join(".")
      : labelOf(WHEN_OPTIONS, deadline.when);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.settlement}, Львівська область`
  )}`;
  const utm = Object.entries(source.utm)
    .map(([k, v]) => `${k}=${v}`)
    .join(", ");

  return [
    `🆕 <b>Нова заявка</b> · ${esc(labelOf(SERVICE_OPTIONS, lead.service))}`,
    "",
    `👤 ${esc(contact.name)}`,
    `📞 <a href="tel:${esc(contact.phone)}">${esc(contact.phone)}</a>`,
    `📍 ${esc(location.settlement)} · <a href="${esc(mapUrl)}">карта</a>`,
    `🗓 ${esc(when)}`,
    order.material ? `🪨 Матеріал: ${esc(order.material)}` : "",
    order.volume ? `📦 Обсяг: ${esc(order.volume)}` : "",
    order.calc
      ? `🧮 Калькулятор: ${order.calc.lengthM}×${order.calc.widthM} м, шар ${order.calc.thicknessCm} см → ${order.calc.volumeM3} м³, ~${order.calc.trucks} маш.`
      : "",
    lead.comment ? `💬 ${esc(lead.comment)}` : "",
    lead.photosCount ? `🖼 Фото: ${lead.photosCount} (нижче)` : "",
    "",
    `Звідки: ${esc(labelOf(HEARD_FROM_OPTIONS, source.heardFrom))}`,
    utm ? `UTM: ${esc(utm)}` : "",
    source.landingPage ? `Сторінка: ${esc(source.landingPage)}` : "",
    `ID: <code>${lead.id}</code>`,
  ]
    .filter((l) => l !== "")
    .join("\n")
    .replace(/\n\n\n+/g, "\n\n");
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return json({ ok: false, error: "Telegram не налаштовано" }, 500);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "Некоректні дані форми" }, 400);
  }

  // Пастка для ботів: справжня людина це поле не бачить і не заповнює
  if (String(form.get("website") ?? "")) return json({ ok: true });

  const photos = form
    .getAll("photo")
    .filter((f): f is File => typeof f === "object" && f !== null && "size" in f && (f as File).size > 0)
    .filter((f) => f.size <= MAX_PHOTO_BYTES)
    .slice(0, MAX_PHOTOS);

  const parsed = parseLead((k) => form.get(k), {
    id: crypto.randomUUID().slice(0, 8),
    createdAt: new Date().toISOString(),
    photosCount: photos.length,
  });
  if (!parsed.ok) return json({ ok: false, error: parsed.error }, 400);
  const lead = parsed.lead;

  const tgApi = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}`;
  const res = await fetch(`${tgApi}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text: formatTelegram(lead),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) return json({ ok: false, error: "Не вдалося надіслати в Telegram" }, 502);

  for (const photo of photos) {
    const fd = new FormData();
    fd.append("chat_id", env.TELEGRAM_CHAT_ID);
    fd.append("photo", photo, photo.name || "photo.jpg");
    fd.append("caption", `Фото до заявки ${lead.id}`);
    await fetch(`${tgApi}/sendPhoto`, { method: "POST", body: fd }).catch(() => undefined);
  }

  if (env.LEADS) {
    await env.LEADS.put(`lead:${lead.createdAt.slice(0, 10)}:${lead.id}`, JSON.stringify(lead)).catch(() => undefined);
  }

  return json({ ok: true, id: lead.id });
};
