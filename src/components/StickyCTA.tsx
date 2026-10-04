import { Phone, Send, MessageCircle } from "lucide-react";
import { links } from "../data/site";

/** Плаваюча панель внизу екрана на телефоні: велика кнопка дзвінка + месенджери */
export function StickyCTA() {
  return (
    <div
      className="md:hidden fixed left-0 right-0 bottom-0 z-[60] flex gap-2 px-3 pt-2.5 bg-void/95 border-t border-line"
      style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom, 0px))" }}
      data-track="sticky"
    >
      <a
        href={links.tel}
        className="flex-[2] flex items-center justify-center gap-2 py-3.5 font-bold text-[16px] rounded-sm bg-orange text-void"
      >
        <Phone className="w-5 h-5" strokeWidth={2.4} aria-hidden />
        Подзвонити
      </a>
      <a
        href={links.viber}
        aria-label="Написати у Viber"
        className="flex-1 flex items-center justify-center gap-1.5 py-3.5 font-semibold text-[14px] rounded-sm border border-[#7360f2] bg-[#7360f2]/15"
      >
        <MessageCircle className="w-4 h-4" strokeWidth={2} aria-hidden />
        Viber
      </a>
      <a
        href={links.telegram}
        target="_blank"
        rel="noopener"
        aria-label="Написати в Telegram"
        className="flex-1 flex items-center justify-center gap-1.5 py-3.5 font-semibold text-[14px] rounded-sm border border-[#2aabee] bg-[#2aabee]/15"
      >
        <Send className="w-4 h-4" strokeWidth={2} aria-hidden />
        <span className="max-[360px]:hidden">Telegram</span>
        <span className="min-[361px]:hidden">TG</span>
      </a>
    </div>
  );
}
