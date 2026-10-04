import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { site } from "../data/site";
import { Container, ContactButtons } from "./ui";
import { Picture } from "./Picture";

interface Props {
  h1: ReactNode;
  lead: ReactNode;
  bullets?: string[];
  image: { src: string; alt: string };
  badge?: { label: string; value: string } | null;
  trackId: string;
}

export function PageHero({ h1, lead, bullets, image, badge, trackId }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-[92px] sm:pt-[120px] pb-12 sm:pb-20 bg-void">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 900px 500px at 78% -8%, rgba(255,106,0,.14), transparent 60%)" }}
      />
      <Container className="relative z-10 grid lg:grid-cols-[1.1fr_.9fr] gap-8 lg:gap-12 items-center">
        <div>
          <div className="flex items-center gap-2.5 text-[13px] text-paper-dim font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-yellow rounded-full shrink-0" />
            {site.region} · {site.regionRadius}
          </div>
          <h1 className="font-display font-bold uppercase leading-[1.02] text-[34px] sm:text-[48px] lg:text-[58px]">{h1}</h1>
          <p className="mt-5 text-[17px] sm:text-lg leading-relaxed text-paper-dim max-w-[52ch]">{lead}</p>
          {bullets && (
            <ul className="mt-5 grid gap-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[15px]">
                  <Check className="w-5 h-5 text-yellow shrink-0 mt-0.5" strokeWidth={2.2} aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-7">
            <ContactButtons trackId={trackId} />
          </div>
        </div>

        <div className="relative">
          <Picture
            src={image.src}
            alt={image.alt}
            priority
            sizes="(min-width: 1024px) 520px, 100vw"
            className="w-full aspect-[4/3] object-cover border border-line"
          />
          {badge && (
            <div className="absolute left-0 bottom-0 m-3 sm:m-4 bg-void/90 border border-line px-4 py-3">
              <div className="text-[12px] text-paper-dim">{badge.label}</div>
              <div className="font-display font-semibold text-lg sm:text-xl leading-tight">{badge.value}</div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
