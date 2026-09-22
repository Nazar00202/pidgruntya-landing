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
