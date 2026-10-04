import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { site } from "../data/site";
import {
  SERVICE_OPTIONS,
  MATERIAL_OPTIONS,
  WHEN_OPTIONS,
  HEARD_FROM_OPTIONS,
  UTM_KEYS,
  isValidPhone,
  type ServiceKey,
  type WhenKey,
} from "../shared/lead";
import { onLeadPrefill, FORM_ID, type LeadPrefill } from "../lib/leadBus";
import { getAttribution } from "../lib/utm";
import { track } from "../lib/analytics";
import { Container, ContactButtons } from "./ui";

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full bg-void border border-line text-paper px-3.5 py-3.5 text-[16px] rounded-sm focus:outline focus:outline-2 focus:outline-orange";

const WITH_MATERIAL: ServiceKey[] = ["material", "combo"];
const WITH_PHOTOS: ServiceKey[] = ["waste", "demolition", "clearing", "leveling", "combo", "other"];

export function LeadForm({ defaultService = "material", title = "Залишити заявку" }: { defaultService?: ServiceKey; title?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [service, setService] = useState<ServiceKey>(defaultService);
  const [material, setMaterial] = useState<string>(MATERIAL_OPTIONS[0]);
  const [volume, setVolume] = useState("");
  const [comment, setComment] = useState("");
  const [when, setWhen] = useState<WhenKey>("asap");
  const [calc, setCalc] = useState<LeadPrefill["calc"]>();
  const [fileCount, setFileCount] = useState(0);
  const [highlight, setHighlight] = useState(false);
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(
    () =>
      onLeadPrefill((d) => {
        if (d.service) setService(d.service);
        if (d.material) setMaterial(MATERIAL_OPTIONS.includes(d.material as never) ? d.material : "Інше / не знаю");
        if (d.volume !== undefined) setVolume(d.volume);
        if (d.comment !== undefined) setComment(d.comment);
        setCalc(d.calc);
        setStatus("idle");
        setHighlight(true);
        window.setTimeout(() => setHighlight(false), 1600);
        window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("#f-name")?.focus({ preventScroll: true }), 600);
      }),
    []
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!isValidPhone(String(fd.get("phone") ?? ""))) {
      setError("Перевірте номер телефону — потрібно щонайменше 9 цифр.");
      setStatus("error");
      return;
    }

    const attr = getAttribution();
    for (const k of UTM_KEYS) if (attr.utm[k]) fd.set(k, attr.utm[k]!);
    fd.set("landing_page", attr.landingPage);
    fd.set("referrer", attr.referrer);
    fd.set("page", window.location.pathname);
    if (calc) {
      fd.set("calc_length", String(calc.lengthM));
      fd.set("calc_width", String(calc.widthM));
      fd.set("calc_thickness", String(calc.thicknessCm));
      fd.set("calc_volume", String(calc.volumeM3));
      fd.set("calc_trucks", String(calc.trucks));
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/lead", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Помилка сервера");
      setStatus("sent");
      // ГОЛОВНА КОНВЕРСІЯ — тільки після реального успішного надсилання
      track("generate_lead", { service, heard_from: fd.get("heard_from") || "" });
      form.reset();
      setVolume("");
      setComment("");
      setCalc(undefined);
      setFileCount(0);
    } catch (err) {
      setError(err instanceof Error && err.message !== "Failed to fetch" ? err.message : "");
      setStatus("error");
    }
  }

  const showMaterial = WITH_MATERIAL.includes(service);
  const showPhotos = WITH_PHOTOS.includes(service);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-surface to-void border-b border-line" id={FORM_ID}>
      <Container className="grid lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-16">
        <div>
          <h2 className="font-display font-bold uppercase text-[30px] sm:text-[40px] leading-[1.05] mb-4">{title}</h2>
          <p className="text-paper-dim text-base sm:text-[17px] leading-relaxed mb-7">
            Залиште телефон — передзвонимо, порахуємо й назвемо ціну. Або одразу подзвоніть чи напишіть у месенджер.
          </p>
          <ContactButtons trackId="lead-section" compact />
        </div>

        {status === "sent" ? (
          <div className="border border-line bg-surface p-8 sm:p-10 flex flex-col items-center justify-center text-center gap-4">
            <CheckCircle2 className="w-14 h-14 text-yellow" strokeWidth={1.6} aria-hidden />
            <div className="font-display font-bold text-2xl uppercase">Заявку отримали</div>
            <p className="text-paper-dim max-w-[40ch]">
              Скоро передзвонимо з номера {site.phoneDisplay}. Якщо терміново — подзвоніть самі.
            </p>
            <button type="button" onClick={() => setStatus("idle")} className="text-orange underline underline-offset-4">
              Надіслати ще одну
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={onSubmit}
            onFocus={() => {
              if (started.current) return;
              started.current = true;
              track("form_start");
            }}
            className={`border bg-surface p-5 sm:p-8 transition-colors duration-500 ${highlight ? "border-orange" : "border-line"}`}
            noValidate={false}
          >
            {/* пастка для ботів */}
            <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label>
                Не заповнюйте <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-4">
              <Field label="Ім'я" htmlFor="f-name" required>
                <input id="f-name" name="name" required autoComplete="name" placeholder="Як до вас звертатись" className={inputCls} />
              </Field>
              <Field label="Телефон" htmlFor="f-phone" required>
                <input id="f-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="067 123 45 67" className={inputCls} />
              </Field>
            </div>

            <Field label="Послуга" htmlFor="f-service" required>
              <select id="f-service" name="service" value={service} onChange={(e) => setService(e.target.value as ServiceKey)} className={inputCls}>
                {SERVICE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>

            {showMaterial && (
              <div className="grid sm:grid-cols-2 gap-x-4">
                <Field label="Матеріал" htmlFor="f-material">
                  <select id="f-material" name="material" value={material} onChange={(e) => setMaterial(e.target.value)} className={inputCls}>
                    {MATERIAL_OPTIONS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Скільки (м³, т або машин)" htmlFor="f-volume">
                  <input id="f-volume" name="volume" value={volume} onChange={(e) => setVolume(e.target.value)} placeholder="напр. 1 машина" className={inputCls} />
                </Field>
              </div>
            )}

            <Field label="Населений пункт / адреса" htmlFor="f-settlement" required>
              <input id="f-settlement" name="settlement" required autoComplete="address-level2" placeholder="Львів, Пустомити, Брюховичі…" className={inputCls} />
            </Field>

            <div className="grid sm:grid-cols-2 gap-x-4">
              <Field label="Коли потрібно" htmlFor="f-when">
                <select id="f-when" name="when" value={when} onChange={(e) => setWhen(e.target.value as WhenKey)} className={inputCls}>
                  {WHEN_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              {when === "date" && (
                <Field label="Дата" htmlFor="f-date">
                  <input id="f-date" name="date" type="date" className={inputCls} />
                </Field>
              )}
            </div>

            <Field label="Звідки ви про нас дізналися?" htmlFor="f-heard">
              <HeardFrom />
            </Field>

            <Field label="Коментар" htmlFor="f-comment">
              <textarea
                id="f-comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Під'їзд для машини, куди вивантажити, що саме треба зробити…"
                className={`${inputCls} min-h-[96px]`}
              />
            </Field>

            {showPhotos && (
              <Field label="Фото ділянки (до 5, необов'язково)" htmlFor="f-photo">
                <label
                  htmlFor="f-photo"
                  className="block border border-dashed border-line px-5 py-4 text-center text-[14px] text-paper-dim cursor-pointer hover:border-paper-dim"
                >
                  {fileCount ? `Обрано фото: ${fileCount}` : "Натисніть, щоб додати фото"}
                </label>
                <input
                  id="f-photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => setFileCount(Math.min(e.target.files?.length ?? 0, 5))}
                />
              </Field>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 text-[17px] font-bold rounded-sm bg-orange text-void hover:bg-[#ff7d1f] transition-colors disabled:opacity-60"
            >
              {status === "sending" ? "Надсилаємо…" : "Надіслати заявку"}
            </button>

            <p className="text-[12.5px] text-paper-dim mt-3 text-center">
              Надсилаючи заявку, ви погоджуєтесь з{" "}
              <a href="/privacy.html" className="underline hover:text-paper">
                політикою конфіденційності
              </a>
              .
            </p>

            {status === "error" && (
              <p role="alert" className="text-[14px] text-yellow mt-3 text-center">
                {error || "Не вдалося надіслати заявку."} Подзвоніть {site.phoneDisplay} або напишіть у Viber/Telegram.
              </p>
            )}
          </form>
        )}
      </Container>
    </section>
  );
}

function HeardFrom() {
  return (
    <select id="f-heard" name="heard_from" defaultValue="" className={inputCls}>
      <option value="">— оберіть —</option>
      {HEARD_FROM_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Field({ label, htmlFor, required, children }: { label: string; htmlFor: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="block text-[14px] text-paper-dim mb-1.5">
        {label}
        {required && <span className="text-orange"> *</span>}
      </label>
      {children}
    </div>
  );
}
