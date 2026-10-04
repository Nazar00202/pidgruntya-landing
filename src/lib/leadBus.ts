// Простий «канал» між кнопками на сторінці та формою заявки:
// будь-яка кнопка може підставити у форму послугу, матеріал, обсяг тощо і прокрутити до неї.

import type { ServiceKey } from "../shared/lead";

export interface LeadPrefill {
  service?: ServiceKey;
  material?: string;
  volume?: string;
  comment?: string;
  calc?: { lengthM: number; widthM: number; thicknessCm: number; volumeM3: number; trucks: number };
}

const EVENT = "lead:prefill";
export const FORM_ID = "zayavka";

export function prefillLead(data: LeadPrefill, scroll = true): void {
  window.dispatchEvent(new CustomEvent<LeadPrefill>(EVENT, { detail: data }));
  if (scroll) document.getElementById(FORM_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function onLeadPrefill(cb: (d: LeadPrefill) => void): () => void {
  const h = (e: Event) => cb((e as CustomEvent<LeadPrefill>).detail);
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}
