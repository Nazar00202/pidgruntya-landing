// Cloudflare Pages Function: POST /api/lead
//
// Приймає форму заявки (multipart/form-data) і пересилає її в Telegram-чат.
// Секрети (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) задаються ТІЛЬКИ через
// Cloudflare Dashboard -> Pages -> Settings -> Environment variables.
// Ніколи не хардкодити їх у коді і не класти у фронтенд.

interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

// Мінімальний локальний тип, щоб не тягнути @cloudflare/workers-types як залежність.
// Якщо додасте пакет @cloudflare/workers-types, цей рядок можна прибрати.
type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
}) => Promise<Response> | Response;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return new Response(JSON.stringify({ error: "Telegram is not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid form data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const name = String(formData.get("name") ?? "").slice(0, 200);
  const phone = String(formData.get("phone") ?? "").slice(0, 60);
  const city = String(formData.get("city") ?? "").slice(0, 200);
  const desc = String(formData.get("desc") ?? "").slice(0, 2000);

  if (!name || !phone || !city || !desc) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const text = [
    "🆕 Нова заявка з сайту",
    `Ім'я: ${name}`,
    `Телефон: ${phone}`,
    `Населений пункт: ${city}`,
    `Задача: ${desc}`,
  ].join("\n");

  const tgApi = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}`;

  const sendMessageRes = await fetch(`${tgApi}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
    }),
  });

  if (!sendMessageRes.ok) {
    return new Response(JSON.stringify({ error: "Failed to notify Telegram" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Фото пересилаємо окремо, по одному, щоб не ускладнювати логіку sendMediaGroup.
  const photos = formData.getAll("photo").filter((f): f is File => f instanceof File && f.size > 0);
  for (const photo of photos.slice(0, 6)) {
    const photoForm = new FormData();
    photoForm.append("chat_id", env.TELEGRAM_CHAT_ID);
    photoForm.append("photo", photo, photo.name);
    await fetch(`${tgApi}/sendPhoto`, { method: "POST", body: photoForm });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
