// ============================================================
// РЕАЛЬНІ ФОТО З ОБ'ЄКТІВ — папка public/photos
// ============================================================
// Як додати фото:
// 1. Покладіть файл .jpg/.png у public/photos (наприклад public/photos/shchebin-dacha.jpg).
// 2. Додайте рядок у список нижче. webp-версії різних розмірів зробляться
//    автоматично при збірці (scripts/optimize-images.mjs).
// 3. alt — опишіть, що на фото, простими словами (це читає Google).
// tags — на яких сторінках показувати фото:
//   "shchebin" | "materials" | "waste" | "demolition" | "clearing"
// kind: "before-after" — одне зображення, склеєне «ДО | ПІСЛЯ»; "single" — звичайне фото.
// ============================================================

export type PhotoTag = "shchebin" | "materials" | "waste" | "demolition" | "clearing";

export interface Photo {
  src: string;
  alt: string;
  caption: string;
  kind: "before-after" | "single";
  tags: PhotoTag[];
}

export const photos: Photo[] = [
  {
    src: "/photos/case-01-demontazh-jcb.jpg",
    alt: "До і після: демонтаж старої споруди екскаватором JCB і розчищення майданчика",
    caption: "Демонтаж старої споруди, вивіз і розчищення майданчика",
    kind: "before-after",
    tags: ["demolition", "clearing", "waste"],
  },
  {
    src: "/photos/case-04-demontazh-ruin.jpg",
    alt: "До і після: розібрали аварійну будівлю, прибрали уламки цегли й деревини",
    caption: "Розібрали аварійну будівлю і прибрали уламки",
    kind: "before-after",
    tags: ["demolition", "waste"],
  },
  {
    src: "/photos/case-03-rozchystka-kushiv.jpg",
    alt: "До і після: ділянку біля будинку розчистили від густих чагарників",
    caption: "Розчистили ділянку від чагарників",
    kind: "before-after",
    tags: ["clearing"],
  },
  {
    src: "/photos/case-02-podvirya.jpg",
    alt: "До і після: знесли дерев'яний сарай і розчистили подвір'я в селі",
    caption: "Знесли старий сарай і розчистили подвір'я",
    kind: "before-after",
    tags: ["demolition", "clearing"],
  },
  {
    src: "/photos/vyviz-smittia.jpg",
    alt: "КамАЗ-самоскид вивозить будівельне сміття з ділянки",
    caption: "Вивіз будівельного сміття КамАЗом",
    kind: "single",
    tags: ["waste"],
  },
  {
    src: "/photos/demontazh-zavalu.jpg",
    alt: "Розбирання старої дерев'яної споруди перед вивозом",
    caption: "Розбирання і вивіз старої дерев'яної споруди",
    kind: "single",
    tags: ["demolition", "waste"],
  },
  {
    src: "/photos/rozpyl-derev.jpg",
    alt: "Спилювання дерев і розпил стовбурів на ділянці",
    caption: "Спилювання дерев і розпил на ділянці",
    kind: "single",
    tags: ["clearing"],
  },
  {
    src: "/photos/vyviz-derevyny.jpg",
    alt: "Вивіз деревини та подрібнення гілок після розчистки",
    caption: "Вивіз деревини та подрібнення гілок",
    kind: "single",
    tags: ["clearing", "waste"],
  },
  // TODO: додати реальні фото доставки щебеню/піску (машина на розвантаженні у клієнта)
  // і поставити їм tags: ["shchebin"] або ["materials"].
];

export function photosByTag(tag?: PhotoTag): Photo[] {
  return tag ? photos.filter((p) => p.tags.includes(tag)) : photos;
}
