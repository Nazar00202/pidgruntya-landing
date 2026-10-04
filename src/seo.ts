// Генерує <head> для кожної сторінки: title, description, canonical, Open Graph, Schema.org.
// Використовується під час збірки (пререндер) і в браузері в режимі розробки.

import { site } from "./data/site";
import { homeMeta, homeFaq, servicePages, findServicePage, type PageMeta, type FaqItem } from "./data/pages";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function pageMeta(path: string): PageMeta {
  return path === "/" ? homeMeta : findServicePage(path) ?? homeMeta;
}

const businessId = `${site.siteUrl}/#business`;

function localBusiness() {
  return {
    "@type": "LocalBusiness",
    "@id": businessId,
    name: site.brandName,
    description:
      "Доставка щебеню, піску, чорнозему й ґрунту КамАЗом. Вивіз будсміття, демонтаж, розчистка, планування та засипка ділянок у Львові та Львівській області.",
    url: `${site.siteUrl}/`,
    telephone: site.phoneRaw,
    image: `${site.siteUrl}/images/og-kamaz.jpg`,
    areaServed: [
      { "@type": "City", name: "Львів" },
      { "@type": "AdministrativeArea", name: "Львівська область" },
      {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: 49.8397, longitude: 24.0297 },
        geoRadius: site.radiusKm * 1000,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Послуги",
      itemListElement: [
        "Доставка щебеню КамАЗом",
        "Доставка піску",
        "Доставка чорнозему та ґрунту",
        "Доставка відсіву, бою цегли, каміння",
        "Вивіз будівельного сміття",
        "Демонтаж гаражів, сараїв, будинків",
        "Розчистка ділянок, корчування пнів",
        "Планування та засипка ділянок",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };
}

function faqSchema(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function jsonLd(path: string): object {
  const graph: object[] = [localBusiness()];
  const svc = findServicePage(path);
  if (path === "/") {
    graph.push(faqSchema(homeFaq));
  } else if (svc) {
    graph.push(
      {
        "@type": "Service",
        name: svc.schemaServiceName,
        description: svc.description,
        provider: { "@id": businessId },
        areaServed: [
          { "@type": "City", name: "Львів" },
          { "@type": "AdministrativeArea", name: "Львівська область" },
        ],
        url: site.siteUrl + svc.path,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Головна", item: `${site.siteUrl}/` },
          { "@type": "ListItem", position: 2, name: svc.navLabel, item: site.siteUrl + svc.path },
        ],
      },
      faqSchema(svc.faq)
    );
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function renderHead(path: string): string {
  const m = pageMeta(path);
  const url = site.siteUrl + (m.path === "/" ? "/" : m.path);
  const img = site.siteUrl + m.ogImage;
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="uk_UA" />`,
    `<meta property="og:site_name" content="${esc(site.brandName)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(m.path)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

export const sitemapPaths = ["/", ...servicePages.map((s) => s.path)];
