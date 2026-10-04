import { PageHero } from "../components/PageHero";
import { TrustStrip } from "../components/TrustStrip";
import { ShchebinFractions } from "../components/Materials";
import { Calculator } from "../components/Calculator";
import { Combo, Discounts, HowWeWork } from "../components/Blocks";
import { Photos } from "../components/Photos";
import { ServiceCards, Geography, Faq } from "../components/Sections";
import { LeadForm } from "../components/LeadForm";
import { deliveryFromText } from "../config/prices";
import { homeFaq } from "../data/pages";

export function HomePage() {
  const price = deliveryFromText();
  return (
    <>
      <PageHero
        trackId="hero"
        h1={
          <>
            Щебінь, пісок, чорнозем КамАЗом — <span className="text-orange">Львів і область до 100 км</span>
          </>
        }
        lead="Привозимо своїми машинами, без посередників. Допоможемо порахувати, скільки треба, а тим самим рейсом можемо забрати будсміття."
        image={{ src: "/images/hero/kamaz-jcb.jpg", alt: "Наш КамАЗ і екскаватор JCB на об'єкті у Львівській області" }}
        badge={price ? { label: "Доставка КамАЗом", value: price } : null}
      />
      <TrustStrip />
      <ShchebinFractions />
      <Calculator />
      <Combo />
      <Discounts />
      <HowWeWork />
      <Photos limit={6} />
      <ServiceCards title="Інші послуги" />
      <Geography />
      <Faq items={homeFaq} />
      <LeadForm defaultService="material" />
    </>
  );
}
