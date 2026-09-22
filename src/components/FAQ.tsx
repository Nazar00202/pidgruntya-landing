import { useState } from "react";
import { Plus } from "lucide-react";
import { faqItems } from "../data/services";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24" id="faq">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="max-w-[640px] mb-13">
          <div className="font-display text-sm font-bold text-orange mb-3.5">06 — Питання</div>
          <h2 className="font-display font-extrabold text-[30px] sm:text-[38px] lg:text-[44px] leading-tight">
            Часті запитання
          </h2>
        </div>

        <div className="border-t border-line">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question} className="border-b border-line">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-5 py-6 px-1 text-left font-display font-bold text-lg sm:text-[19px]"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <Plus
                    className={`w-5 h-5 text-orange shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="px-1 pb-6 text-[15px] text-paper-dim leading-relaxed max-w-[70ch]">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
