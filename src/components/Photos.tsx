import { photosByTag, type PhotoTag } from "../config/photos";
import { Container, SectionTitle } from "./ui";
import { Picture } from "./Picture";

export function Photos({ tag, title = "Фото з наших об'єктів", limit }: { tag?: PhotoTag; title?: string; limit?: number }) {
  const list = photosByTag(tag).slice(0, limit);
  if (!list.length) return null;
  const pairs = list.filter((p) => p.kind === "before-after");
  const singles = list.filter((p) => p.kind === "single");

  return (
    <section className="py-16 sm:py-24 border-b border-line" id="foto">
      <Container>
        <SectionTitle eyebrow="До / після" title={title} lead="Тільки реальні фото наших робіт — без картинок з інтернету." />
        {pairs.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6">
            {pairs.map((p) => (
              <figure key={p.src} className="border border-line bg-surface">
                <Picture src={p.src} alt={p.alt} sizes="(min-width: 1024px) 570px, 100vw" className="w-full h-auto block" />
                <figcaption className="px-4 py-3 text-[14.5px] text-paper-dim">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
        {singles.length > 0 && (
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ${pairs.length ? "mt-6" : ""}`}>
            {singles.map((p) => (
              <figure key={p.src} className="border border-line bg-surface">
                <Picture
                  src={p.src}
                  alt={p.alt}
                  sizes="(min-width: 1024px) 280px, 50vw"
                  className="w-full aspect-[4/3] object-cover block"
                />
                <figcaption className="px-3 py-2.5 text-[13px] text-paper-dim leading-snug">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
