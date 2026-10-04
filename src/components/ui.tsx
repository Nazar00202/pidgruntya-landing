import type { ReactNode } from "react";
import { Phone, Send, MessageCircle } from "lucide-react";
import { site, links } from "../data/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[1180px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function SectionTitle({
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h2" | "h3";
}) {
  return (
    <div className="max-w-[720px] mb-10 sm:mb-12">
      {eyebrow && <div className="font-display text-sm font-semibold uppercase tracking-wider text-orange mb-3">{eyebrow}</div>}
      <Tag className="font-display font-bold uppercase text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.05]">{title}</Tag>
      {lead && <p className="mt-4 text-paper-dim text-base sm:text-[17px] leading-relaxed">{lead}</p>}
    </div>
  );
}

/** Головні кнопки зв'язку: велика «Подзвонити» + Viber + Telegram */
export function ContactButtons({ trackId, compact = false }: { trackId: string; compact?: boolean }) {
  return (
    <div data-track={trackId} className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
      <a
        href={links.tel}
        className={`inline-flex items-center justify-center gap-3 rounded-sm bg-orange text-void font-bold hover:bg-[#ff7d1f] transition-colors ${
          compact ? "px-6 py-4 text-base" : "px-7 py-5 text-lg sm:text-xl"
        }`}
      >
        <Phone className="w-6 h-6 shrink-0" strokeWidth={2.2} aria-hidden />
        <span>
          Подзвонити <span className="whitespace-nowrap">{site.phoneDisplay}</span>
        </span>
      </a>
      <div className="grid grid-cols-2 sm:flex gap-3">
        <a
          href={links.viber}
          className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-sm border border-[#7360f2] bg-[#7360f2]/15 font-semibold text-[15px] hover:bg-[#7360f2]/30 transition-colors"
        >
          <MessageCircle className="w-5 h-5" strokeWidth={2} aria-hidden />
          Viber
        </a>
        <a
          href={links.telegram}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-sm border border-[#2aabee] bg-[#2aabee]/15 font-semibold text-[15px] hover:bg-[#2aabee]/30 transition-colors"
        >
          <Send className="w-5 h-5" strokeWidth={2} aria-hidden />
          Telegram
        </a>
      </div>
    </div>
  );
}

export function PriceTag({ text, muted }: { text: string; muted?: boolean }) {
  return (
    <span className={`font-display font-semibold text-lg leading-tight ${muted ? "text-paper-dim text-base" : "text-yellow"}`}>
      {text}
    </span>
  );
}
