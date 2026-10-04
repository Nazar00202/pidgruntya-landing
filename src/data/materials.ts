// Сипучі матеріали для доставки КамАЗом.
// Ціни та тоннаж підтверджені власником (жовтень 2026).

export interface Material {
  title: string;
  description: string;
  image?: string;
}

export const materials: Material[] = [
  { title: "Пісок", description: "Для бетону, стяжки, кладки, підсипки під фундамент і доріжки.", image: "/images/services/pisok.jpg" },
  { title: "Щебінь", description: "Різні фракції — під фундамент, дренаж, під'їзди та майданчики.", image: "/images/services/shcheben.jpg" },
  { title: "Ґрунт / земля", description: "Для підсипки ділянки, вирівнювання рельєфу, благоустрою.", image: "/images/services/grunt.jpg" },
  { title: "Чорнозем", description: "Для городу, газону, клумб і озеленення ділянки.", image: "/images/services/chornozem.jpg" },
  { title: "Відсів", description: "Для підсипки під бруківку, плитку та вирівнювання основи." },
  { title: "Інші сипучі матеріали", description: "Уточніть по телефону — підкажемо, що можемо привезти." },
];

export const deliveryPrice = {
  from: "3 500",
  to: "5 000",
  tonnage: "10, 15 або 20 т",
};

export const deliveryPoints = [
  "Власні КамАЗи — без посередників",
  "Машина 10, 15 або 20 тонн — під ваш обсяг",
  "Львів та область до 100 км",
  "Можна поєднати з вивозом сміття чи ґрунту з ділянки",
];
