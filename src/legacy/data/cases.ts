export interface CaseItem {
  image: string;
  title: string;
  description: string;
}

export const cases: CaseItem[] = [
  {
    image: "/images/before-after/case-04-demontazh-ruin.jpg",
    title: "Демонтаж старої споруди",
    description:
      "Розібрали аварійну будівлю, прибрали уламки деревини та цегли, підготували майданчик біля сусідньої господарської будівлі.",
  },
  {
    image: "/images/before-after/case-03-rozchystka-kushiv.jpg",
    title: "Розчищення ділянки від чагарників",
    description:
      "Видалили густі зарості та чагарники по всій площі ділянки, звільнили територію біля будинку.",
  },
  {
    image: "/images/before-after/case-02-podvirya.jpg",
    title: "Розчищення подвір'я біля господарської будівлі",
    description:
      "Прибрали зарості, гілки та мотлох навколо старої споруди, підготували територію до подальшого використання.",
  },
];

export interface GalleryItem {
  image: string;
  caption: string;
}

export const gallery: GalleryItem[] = [
  { image: "/images/cases/vyviz-smittia.jpg", caption: "Вивіз будівельного сміття КамАЗом" },
  { image: "/images/cases/demontazh-zavalu.jpg", caption: "Розбирання та вивіз старої дерев'яної споруди" },
  { image: "/images/cases/rozpyl-derev.jpg", caption: "Спилювання дерев і розпил на ділянці" },
  { image: "/images/cases/vyviz-derevyny.jpg", caption: "Вивіз деревини та подрібнення гілок" },
];
