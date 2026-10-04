import type { ServicePageData } from "../data/pages";
import { PageHero } from "../components/PageHero";
import { TrustStrip } from "../components/TrustStrip";
import { Calculator } from "../components/Calculator";
import { Benefits, Combo, HowWeWork } from "../components/Blocks";
import { Photos } from "../components/Photos";
import { ServiceCards, PriceList, WhatWeDo, Faq } from "../components/Sections";
import { LeadForm } from "../components/LeadForm";
import { formatPrice, hasPrice } from "../config/prices";

export function ServicePage({ page }: { page: ServicePageData }) {
  const firstPriced = page.priceItems.find(hasPrice);
  const showCombo = page.formService === "material" || page.formService === "waste";
  return (
    <>
      <nav aria-label="Навігація" className="sr-only">
        <a href="/">Головна</a> / <span>{page.navLabel}</span>
      </nav>
      <PageHero
        trackId="hero"
        h1={page.h1}
        lead={page.heroLead}
        bullets={page.heroBullets}
        image={page.heroImage}
        badge={firstPriced ? { label: firstPriced.title, value: formatPrice(firstPriced) } : null}
      />
      <TrustStrip />
      <PriceList title={page.priceTitle} items={page.priceItems} service={page.formService} />
      {page.calculatorMaterial && <Calculator defaultMaterial={page.calculatorMaterial} />}
      <WhatWeDo title={page.whatWeDo.title} items={page.whatWeDo.items} />
      <Benefits items={page.benefits} />
      {showCombo && <Combo />}
      <HowWeWork steps={page.steps} />
      <Photos tag={page.photoTag} />
      <Faq items={page.faq} />
      <LeadForm defaultService={page.formService} />
      <ServiceCards exclude={page.path} />
    </>
  );
}
