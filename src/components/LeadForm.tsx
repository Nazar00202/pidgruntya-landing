import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { Phone, Send, MessageCircle } from "lucide-react";
import { site, links } from "../data/site";
import { track } from "../lib/analytics";

type Status = "idle" | "sending" | "sent" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileCount, setFileCount] = useState(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    track("form_submit");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      track("quote_request");
      form.reset();
      setFileCount(0);
    } catch {
      // /api/lead ще не задеплоєно (наприклад, локальна розробка без wrangler) —
      // даємо людині зрозумілий вихід замість тихої помилки.
      setStatus("error");
    }
  }

  return (
    <section className="py-24 border-t border-line bg-gradient-to-b from-surface to-void" id="lead-form">
      <div className="max-w-[1180px] mx-auto px-6 grid lg:grid-cols-[.95fr_1.05fr] gap-16">
        <div>
          <h2 className="font-display font-extrabold text-[30px] sm:text-[38px] lg:text-[42px] leading-tight mb-5">
            Отримати попередній прорахунок
          </h2>
          <p className="text-paper-dim text-base leading-relaxed mb-7">
            Надішліть 3–5 фото території, адресу та коротко опишіть задачу — визначимо, які роботи
            та техніка потрібні для вашого об'єкта.
          </p>

          <div className="flex flex-col gap-3.5">
            <a
              href={links.tel}
              onClick={() => track("phone_click", { location: "lead-section" })}
              className="flex items-center gap-3 text-[15.5px] font-semibold py-3.5 border-b border-line"
            >
              <Phone className="w-[18px] h-[18px] text-orange shrink-0" strokeWidth={2} />
              {site.phoneDisplay} — подзвонити
            </a>
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener"
              onClick={() => track("telegram_click")}
              className="flex items-center gap-3 text-[15.5px] font-semibold py-3.5 border-b border-line"
            >
              <Send className="w-[18px] h-[18px] text-orange shrink-0" strokeWidth={2} />
              Написати в Telegram
            </a>
            <a
              href={links.viber}
              target="_blank"
              rel="noopener"
              onClick={() => track("viber_click")}
              className="flex items-center gap-3 text-[15.5px] font-semibold py-3.5 border-b border-line"
            >
              <MessageCircle className="w-[18px] h-[18px] text-orange shrink-0" strokeWidth={2} />
              Написати у Viber
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          onFocus={() => track("form_start")}
          className="border border-line p-7 sm:p-9 bg-surface"
        >
          <Field label="Ваше ім'я" name="name" type="text" required placeholder="Ім'я" />
          <Field label="Телефон" name="phone" type="tel" required placeholder="+380" />
          <Field label="Населений пункт" name="city" type="text" required placeholder="Львів, Брюховичі, ..." />

          <div className="mb-4.5">
            <label htmlFor="f-desc" className="block text-[13px] text-paper-dim mb-2">
              Що потрібно зробити?
            </label>
            <textarea
              id="f-desc"
              name="desc"
              required
              placeholder="Коротко опишіть ділянку та задачу"
              className="w-full min-h-[90px] bg-void border border-line text-paper px-3.5 py-3 text-[15px] rounded-sm focus:outline-2 focus:outline-orange"
            />
          </div>

          <div className="mb-4.5">
            <label className="block text-[13px] text-paper-dim mb-2" htmlFor="f-photo">
              Фото ділянки (3–5 фото)
            </label>
            <label
              htmlFor="f-photo"
              className="block border border-dashed border-line px-5 py-5 text-center text-[13.5px] text-paper-dim cursor-pointer hover:border-paper-dim"
            >
              {fileCount ? `${fileCount} файл(ів) обрано` : "Натисніть, щоб додати фото"}
            </label>
            <input
              id="f-photo"
              name="photo"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                setFileCount(e.target.files?.length ?? 0);
                if (e.target.files?.length) track("photo_upload", { count: e.target.files.length });
              }}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-4 text-base font-semibold rounded-sm bg-orange text-void hover:bg-[#ff7d1f] transition-colors disabled:opacity-60"
          >
            {status === "sending" ? "Надсилаємо..." : "Надіслати заявку"}
          </button>

          {status === "sent" && (
            <p className="text-[13.5px] text-yellow mt-3.5 text-center">
              Заявку надіслано. Ми зв'яжемось найближчим часом.
            </p>
          )}
          {status === "error" && (
            <p className="text-[13.5px] text-paper-dim mt-3.5 text-center">
              Форма поки не підключена до сервера. Зателефонуйте або напишіть у Telegram/Viber
              вище — це працює вже зараз.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="mb-4.5">
      <label htmlFor={`f-${props.name}`} className="block text-[13px] text-paper-dim mb-2">
        {label}
      </label>
      <input
        id={`f-${props.name}`}
        {...props}
        className="w-full bg-void border border-line text-paper px-3.5 py-3 text-[15px] rounded-sm focus:outline-2 focus:outline-orange"
      />
    </div>
  );
}
