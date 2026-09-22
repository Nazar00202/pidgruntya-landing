import { links } from "../data/site";
import { track } from "../lib/analytics";

export function StickyCTA() {
  return (
    <div
      className="md:hidden fixed left-0 right-0 bottom-0 z-[60] flex gap-2.5 px-4 py-3 bg-void/95 backdrop-blur-md border-t border-line"
      style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}
    >
      <a
        href={links.viber}
        onClick={() => track("viber_click")}
        className="flex-1 text-center py-3 font-semibold text-sm rounded-sm border border-line"
      >
        Viber
      </a>
      <a
        href={links.tel}
        onClick={() => track("phone_click", { location: "sticky" })}
        className="flex-1 text-center py-3 font-semibold text-sm rounded-sm bg-orange text-void"
      >
        Подзвонити
      </a>
    </div>
  );
}
