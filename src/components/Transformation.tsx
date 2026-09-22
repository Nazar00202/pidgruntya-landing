import { Info } from "lucide-react";

// ЗАМІНА НА РЕАЛЬНІ ФОТО:
// Коли з'являться реальні фото об'єктів (до/після), замінити <BeforeIllustration />
// та <AfterIllustration /> на <img src="/images/before-after/<file>.jpg" ... />

function BeforeIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full opacity-90" preserveAspectRatio="xMidYMax slice">
      <g stroke="#3a4144" strokeWidth="1.4" fill="none">
        <path d="M40 260 Q60 220 40 190 Q30 160 55 140" />
        <path d="M55 140 Q40 130 45 110" />
        <path d="M55 140 Q70 130 68 108" />
        <circle cx="45" cy="105" r="18" stroke="#454d50" />
        <path d="M120 270 Q135 210 118 170 Q108 140 128 115" />
        <circle cx="126" cy="108" r="26" stroke="#454d50" />
        <path d="M200 220 h70 v50 h-70 z" stroke="#54473d" />
        <path d="M200 220 l35 -28 l35 28" stroke="#54473d" />
        <path d="M320 270 Q335 230 315 210" />
        <circle cx="313" cy="205" r="14" stroke="#454d50" />
      </g>
      <g fill="#2c3234">
        <ellipse cx="250" cy="272" rx="70" ry="6" />
        <ellipse cx="90" cy="278" rx="50" ry="5" />
      </g>
    </svg>
  );
}

function AfterIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="xMidYMid slice">
      <g stroke="#3a4a37" strokeWidth="1">
        <line x1="0" y1="40" x2="400" y2="40" />
        <line x1="0" y1="70" x2="400" y2="70" />
        <line x1="0" y1="100" x2="400" y2="100" />
      </g>
    </svg>
  );
}

export function Transformation() {
  return (
    <section className="py-24 bg-surface" id="transform">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="max-w-[640px] mb-13">
          <div className="font-display text-sm font-bold text-orange mb-3.5">01 — Результат</div>
          <h2 className="font-display font-extrabold text-[30px] sm:text-[38px] lg:text-[44px] leading-tight">
            Від захаращеної ділянки — до готового майданчика
          </h2>
          <p className="mt-4 text-paper-dim text-[16.5px] leading-relaxed">
            Схематична ілюстрація типової трансформації. Реальні фото об'єктів додаються сюди по
            мірі виконання робіт.
          </p>
        </div>

        <div className="border border-line relative grid md:grid-cols-2">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-orange z-10" />
          <div className="relative p-9 min-h-[340px] flex flex-col justify-end bg-[#101314]">
            <span className="absolute top-5 left-5 text-xs font-bold tracking-wide px-2.5 py-1 border border-line text-paper-dim">
              ДО
            </span>
            <BeforeIllustration />
            <h3 className="relative font-display font-bold text-2xl mb-2">Заросла ділянка</h3>
            <p className="relative text-sm text-paper-dim">
              Дерева, чагарники, стара споруда, будівельне сміття, нерівний рельєф.
            </p>
          </div>
          <div className="relative p-9 min-h-[340px] flex flex-col justify-end bg-[#171d16]">
            <span className="absolute top-5 left-5 text-xs font-bold tracking-wide px-2.5 py-1 border border-yellow/35 text-yellow">
              ПІСЛЯ
            </span>
            <AfterIllustration />
            <h3 className="relative font-display font-bold text-2xl mb-2">Підготовлена територія</h3>
            <p className="relative text-sm text-paper-dim">
              Очищено, вивезено, сплановано — готово для наступного етапу.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 mt-4.5 text-[13.5px] text-paper-dim">
          <Info className="w-3.5 h-3.5 stroke-orange shrink-0" strokeWidth={2} />
          Це схематичне зображення, не фотографія об'єкта. Реальні кейси — після перших виконаних
          робіт.
        </div>
      </div>
    </section>
  );
}
