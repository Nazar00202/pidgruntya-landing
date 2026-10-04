import { shchebinFractions, materialPrices, formatPrice, hasPrice, deliveryPerTruck, truckTonnages, type PriceItem } from "../config/prices";
import { prefillLead } from "../lib/leadBus";
import { Container, SectionTitle, PriceTag } from "./ui";
import { Picture } from "./Picture";

const nf = new Intl.NumberFormat("uk-UA");

function OrderButton({ item }: { item: PriceItem }) {
  return (
    <button
      type="button"
      onClick={() => prefillLead({ service: "material", material: item.title })}
      className="text-[14px] font-semibold text-orange underline underline-offset-4 hover:text-paper"
    >
      Замовити
    </button>
  );
}

export function ShchebinFractions({ showOthers = true, titleAs = "h2" }: { showOthers?: boolean; titleAs?: "h2" | "h3" }) {
  const delivery =
    deliveryPerTruck.from != null
      ? `Доставка однієї машини — ${nf.format(deliveryPerTruck.from)}${
          deliveryPerTruck.to ? `–${nf.format(deliveryPerTruck.to)}` : ""
        } грн, залежно від відстані та тоннажу (${truckTonnages.join(", ")} т).`
      : null;

  return (
    <section className="py-16 sm:py-24 border-b border-line" id="shchebin">
      <Container>
        <SectionTitle
          as={titleAs}
          eyebrow="Щебінь"
          title="Яку фракцію щебеню взяти"
          lead="Не знаєте, яка потрібна — скажіть по телефону, під що берете (фундамент, доріжка, дренаж), і ми підкажемо."
        />

        <div className="grid md:grid-cols-[.8fr_1fr_1fr] gap-px bg-line border border-line">
          <div className="bg-void">
            <Picture
              src="/images/services/shcheben.jpg"
              alt="Купа гранітного щебеню після розвантаження з самоскида"
              sizes="(min-width: 768px) 360px, 100vw"
              className="w-full h-full min-h-[200px] max-h-[320px] md:max-h-none object-cover"
            />
          </div>
          {shchebinFractions.map((f) => (
            <div key={f.id} className="bg-void p-6 sm:p-8 flex flex-col">
              <h3 className="font-display font-bold text-[30px] sm:text-[36px] leading-none">{f.title}</h3>
              <p className="mt-3 text-[15px] text-paper-dim leading-relaxed flex-1">{f.usage}</p>
              <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                <PriceTag text={formatPrice(f)} muted={!hasPrice(f)} />
                <OrderButton item={f} />
              </div>
            </div>
          ))}
        </div>
        {delivery && <p className="mt-4 text-[14.5px] text-paper-dim">{delivery}</p>}

        {showOthers && <OtherMaterials />}
      </Container>
    </section>
  );
}

const materialImages: Record<string, string> = {
  pisok: "/images/services/pisok.jpg",
  grunt: "/images/services/grunt.jpg",
  chornozem: "/images/services/chornozem.jpg",
};

export function OtherMaterials({ ids, heading = "Також возимо" }: { ids?: string[]; heading?: string }) {
  const list = ids ? materialPrices.filter((m) => ids.includes(m.id)) : materialPrices;
  return (
    <div className="mt-14">
      <h3 className="font-display font-bold uppercase text-2xl sm:text-3xl mb-6">{heading}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
        {list.map((m) => (
          <div key={m.id} className="bg-void flex">
            {materialImages[m.id] && (
              <Picture
                src={materialImages[m.id]}
                alt={`${m.title} — доставка КамАЗом`}
                sizes="120px"
                className="w-[96px] sm:w-[120px] h-full object-cover shrink-0"
              />
            )}
            <div className="p-5 flex flex-col gap-2 flex-1">
              <div className="font-display font-bold text-xl">{m.title}</div>
              <p className="text-[14px] text-paper-dim leading-snug flex-1">{m.usage}</p>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <PriceTag text={formatPrice(m)} muted={!hasPrice(m)} />
                <OrderButton item={m} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
