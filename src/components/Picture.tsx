import manifest from "../generated/images.json";

type Entry = { w: number; h: number; widths: number[] };
const images = manifest as Record<string, Entry>;

interface Props {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  /** true — для першого екрана: без lazy, з високим пріоритетом */
  priority?: boolean;
}

/** <picture> з webp різних розмірів (генеруються scripts/optimize-images.mjs) і jpg як запасний варіант. */
export function Picture({ src, alt, sizes = "100vw", className, priority }: Props) {
  const info = images[src];
  const base = src.replace(/\.(jpe?g|png)$/i, "");
  const srcSet = info?.widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ");
  const fetchPriority = priority ? { fetchpriority: "high" } : {};
  return (
    <picture>
      {srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        width={info?.w}
        height={info?.h}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "auto" : "async"}
        className={className}
        {...fetchPriority}
      />
    </picture>
  );
}
