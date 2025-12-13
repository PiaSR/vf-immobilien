import { c as createSvgComponent, $ as $$MainLayout } from '../chunks/MainLayout_CoMNAWfS.mjs';
import { c as createComponent, d as createAstro, m as maybeRenderHead, e as addAttribute, r as renderComponent, u as unescapeHTML, b as renderScript, a as renderTemplate } from '../chunks/astro/server_lfFasKkK.mjs';
import 'piccolore';
import { $ as $$CTAContactSection } from '../chunks/CTAContactSection_CcCDYf-H.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_B2RpSsLg.mjs';
import { T as TriangleGreen } from '../chunks/Triangle-green_Cmxg-n2f.mjs';
/* empty css                                    */
import { $ as $$ButtonArrow } from '../chunks/ButtonArrow_C6883PUt.mjs';
import { $ as $$HeroHeader } from '../chunks/HeroHeader_CLQrIJ7L.mjs';
export { renderers } from '../renderers.mjs';

const MietzinshausImage = new Proxy({"src":"/_astro/Mietzinshäuser.C7Ell29M.jpg","width":1667,"height":2500,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/Mietzinshäuser.jpg";
							}
							
							return target[name];
						}
					});

const WEGImage = new Proxy({"src":"/_astro/WEG.BOK969SR.jpg","width":1667,"height":2500,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/WEG.jpg";
							}
							
							return target[name];
						}
					});

const SubverwaltungImage = new Proxy({"src":"/_astro/Subverwaltung.D21354Mq.jpg","width":2500,"height":1667,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/Subverwaltung.jpg";
							}
							
							return target[name];
						}
					});

const servicesVerwaltungData = [
  {
    title: "Miet&shy;zins&shy;häuser (Zins&shy;haus&shy;ver&shy;waltung)",
    description: "Bei Mietzinshäusern steht neben der technischen Betreuung vor allem die wirtschaftliche Optimierung im Mittelpunkt. Wir übernehmen die vollständige kaufmännische und mietrechtliche Verwaltung und sorgen für einen reibungslosen Ablauf im laufenden Betrieb. Je nach Ihren Wünschen stellen wir Ihnen unser Leistungspaket zusammen.",
    image: MietzinshausImage,
    alt: "Zinshaus",
    listItems: [
      "Verwaltung der Mieteinnahmen und Betriebskosten",
      "Ausarbeitung und Abschluss von Mietverträgen",
      "Indexanpassungen und Mietzinsüberprüfungen",
      "Mietvorschreibung, Mahnwesen und Kontrolle der Zahlungseingänge",
      "Betreuung von Mieteranfragen und Schadensmeldungen",
      "Ausschreibung und Überwachung von Instandhaltungs- und Sanierungsarbeiten",
      "Organisation und Beauftragung von Sanierungsmaßnahmen in den Mietobjekten",
      "Laufende Abstimmung mit der Eigentümerin bzw. dem Eigentümer"
    ]
  },
  {
    title: "Wohnungs&shy;eigentums&shy;gemein&shy;schaften (WEG-Ver&shy;wal&shy;tung)",
    description: "Im Rahmen der Verwaltung von Wohnungseigentumsgemeinschaften übernehmen wir die kaufmännische, technische und organisatorische Betreuung der gesamten Liegenschaft. Grundlage ist das Wohnungseigentumsgesetz (WEG).",
    image: WEGImage,
    alt: "WEG-Verwaltung",
    listItems: [
      "Erstellung der jährlichen Abrechnung (Betriebskosten und Rücklage) gemäß § 34 WEG",
      "Vorschreibung und Anpassung der monatlichen Zahlungen (Akontierung)",
      "Laufende Buchhaltung und Zahlungsverkehr",
      "Einberufung, Organisation und Protokollierung der Eigentümerversammlung",
      "Umsetzung von Beschlüssen der Eigentümergemeinschaft",
      "Beauftragung und Koordination von Instandhaltungsmaßnahmen",
      "Kommunikation mit Professionisten, Behörden und Eigentümer:innen",
      "Prüfung von Versicherungsschäden und Schadensabwicklung"
    ]
  },
  {
    title: "Sub&shy;ver&shy;wal&shy;tung einzelner Ein&shy;heiten",
    description: "Wir übernehmen auch die Verwaltung einzelner Eigentumswohnungen innerhalb größerer Liegenschaften - z.B. für vermietete Wohnungen, deren Eigentümer:innen nicht selbst vor Ort sind oder keine laufende Betreuung übernehmen möchten.",
    image: SubverwaltungImage,
    alt: "image",
    listItems: [
      "Mietvorschreibung und Abrechnung der Betriebskosten",
      "Mietverträge, Indexierung, Kommunikation mit Mieter:innen",
      "Organisation kleinerer Reparaturen oder Instandhaltungen",
      "Ansprechpartnerfunktion für Mieter:innen bei Fragen zur Wohnung",
      "Prüfung der Hausabrechnung im Sinne des Eigentümers / der Eigentümerin",
      "Optionale Unterstützung bei Mieterwechsel (inkl. Übergabe, Rücknahme, Vermittlung)"
    ]
  }
];

const EllipseImg = createSvgComponent({"meta":{"src":"/_astro/Ellipse-6-1.CB5TleZ3.svg","width":54,"height":54,"format":"svg"},"attributes":{"width":"54","height":"54","fill":"none"},"children":"<g filter=\"url(#a)\"><circle cx=\"27\" cy=\"23\" r=\"21\" stroke=\"#2F3C35\" stroke-width=\"4\" shape-rendering=\"crispEdges\" /></g><defs><filter id=\"a\" width=\"54\" height=\"54\" x=\"0\" y=\"0\" color-interpolation-filters=\"sRGB\" filterUnits=\"userSpaceOnUse\"><feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" /><feColorMatrix in=\"SourceAlpha\" result=\"hardAlpha\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" /><feOffset dy=\"4\" /><feGaussianBlur stdDeviation=\"2\" /><feComposite in2=\"hardAlpha\" operator=\"out\" /><feColorMatrix values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\" /><feBlend in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_939_2582\" /><feBlend in=\"SourceGraphic\" in2=\"effect1_dropShadow_939_2582\" result=\"shape\" /></filter></defs>"});

const $$Astro = createAstro();
const $$OffersCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$OffersCard;
  const { service, isReversed } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`service-card-container ${isReversed ? "reverse" : ""} slide-in-section`, "class")} data-astro-cid-eoo3ey4e> ${renderComponent($$result, "Image", $$Image, { "src": service.image, "alt": service.alt, "class": "services-offers-image", "data-astro-cid-eoo3ey4e": true })} <div class="service-content" data-astro-cid-eoo3ey4e> <h3 class="heading-h3" data-astro-cid-eoo3ey4e>${unescapeHTML(service.title)}</h3> <p class="service-description" data-astro-cid-eoo3ey4e>${service.description}</p> <div class="service-collapsible-wrapper" data-astro-cid-eoo3ey4e> <div class="collapsible-header" data-astro-cid-eoo3ey4e> <h5 class="collapsible-heading" data-astro-cid-eoo3ey4e>Unsere Leistungen</h5> ${renderComponent($$result, "Image", $$Image, { "src": TriangleGreen, "alt": "green triangle for down arrow", "class": "collapsible-icon", "data-astro-cid-eoo3ey4e": true })} </div> <ul class="collapsible-list" data-astro-cid-eoo3ey4e> ${service.listItems.map((item) => renderTemplate`<li data-astro-cid-eoo3ey4e> <p data-astro-cid-eoo3ey4e>${item}</p> </li>`)} </ul> </div> </div> </div>  ${renderScript($$result, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Cards/OffersCard.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Cards/OffersCard.astro", void 0);

const $$ServicesOffersVerwaltung = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="services-hausverwaltung" class="offers-section" data-astro-cid-nyqnnm5q> <div class="site-container padding-section" data-astro-cid-nyqnnm5q> <div class="section-header-wrapper" data-astro-cid-nyqnnm5q> <div class="header-icon-wrapper" data-astro-cid-nyqnnm5q> ${renderComponent($$result, "Image", $$Image, { "src": EllipseImg, "alt": "", "class": "header-icon", "data-astro-cid-nyqnnm5q": true })} <h2 class="heading-h2" data-astro-cid-nyqnnm5q>Hausverwaltung</h2> </div> <div class="header-line" data-astro-cid-nyqnnm5q></div> </div> <div class="service-block-wrapper" data-astro-cid-nyqnnm5q> ${servicesVerwaltungData.map((service, index) => renderTemplate`${renderComponent($$result, "OffersCard", $$OffersCard, { "service": service, "isReversed": index % 2 !== 0, "data-astro-cid-nyqnnm5q": true })}`)} </div> </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/services/ServicesOffersVerwaltung.astro", void 0);

const servicesHero = new Proxy({"src":"/_astro/services-hero.DnjdwVr5.jpg","width":1667,"height":2500,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/services-hero.jpg";
							}
							
							return target[name];
						}
					});

const $$ServicesHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="services-hero" class="hero has-angled-image" data-astro-cid-5nseixhw> <div class="site-container hero-grid-content padding-section" data-astro-cid-5nseixhw> <div class="container-align-left" data-astro-cid-5nseixhw> ${renderComponent($$result, "HeroHeader", $$HeroHeader, { "header": "Ihr Partner rund um Immobilien", "text": "Unsere Leistungen im \xDCberblick.", "headerColor": "var(--color-neutral-white)", "textColor": "var(--color-neutral-white)", "data-astro-cid-5nseixhw": true })} ${renderComponent($$result, "ButtonArrow", $$ButtonArrow, { "class": "button-orange", "href": "/contact", "data-astro-cid-5nseixhw": true }, { "default": ($$result2) => renderTemplate`
Kontaktieren Sie uns
` })} </div> ${renderComponent($$result, "Image", $$Image, { "src": servicesHero, "alt": "White building facade", "class": "angled-image angled-image-mobile-show", "loading": "eager", "widths": [450, 600, 992, 1200, 1667], "sizes": "(max-width: 991px) 100vw, 28vw", "width": 1667, "height": 2500, "data-astro-cid-5nseixhw": true })} </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/services/ServicesHero.astro", void 0);

const VermittlungImage = new Proxy({"src":"/_astro/Vermittlung.CsHmQ7Rz.jpg","width":1668,"height":2500,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/Vermittlung.jpg";
							}
							
							return target[name];
						}
					});

const servicesVermittlungData = [
  {
    title: "Immobilien&shy;vermittlung für Miete und Kauf",
    description: "Verlässlich, diskret und gut vorbereitet. Neben der laufenden Verwaltung bieten wir umfassende Leistungen im Bereich der Immobilienvermittlung. Ob Verkauf oder Vermietung – wir begleiten Eigentümer:innen von der Erstberatung bis zur erfolgreichen Übergabe und sorgen für eine rechtlich fundierte und geordnete Abwicklung.",
    image: VermittlungImage,
    alt: "Black old wrought-iron gate",
    listItems: [
      "Vermittlung von Eigentumswohnungen, Ein- und Mehrfamilienhäuser, und Geschäftslokale",
      "Persönliche Erstberatung und Objektaufnahme",
      "Markteinschätzung / Mietzinsanalyse",
      "Aufbereitung aller relevanten Unterlagen (Pläne, Grundbuch, Energieausweis etc.)",
      "Erstellung eines Exposés mit aussagekräftigen Fotos",
      "Bewerbung über relevante Kanäle und persönliche Netzwerke",
      "Organisation und Durchführung von Besichtigungen",
      "Ausarbeitung und Abschluss von Mietverträgen"
    ]
  }
];

const $$ServiceOffersVermittlung = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="services-vermittlung" class="offers-section" data-astro-cid-f7cs73ab> <div class="site-container padding-section" data-astro-cid-f7cs73ab> <div class="section-header-wrapper" data-astro-cid-f7cs73ab> <div class="header-icon-wrapper" data-astro-cid-f7cs73ab> ${renderComponent($$result, "Image", $$Image, { "src": EllipseImg, "alt": "", "class": "header-icon", "data-astro-cid-f7cs73ab": true })} <h2 class="heading-h2" data-astro-cid-f7cs73ab>Vermittlung</h2> </div> <div class="header-line" data-astro-cid-f7cs73ab></div> </div> <div class="service-block-wrapper" data-astro-cid-f7cs73ab> ${servicesVermittlungData.map((service, index) => renderTemplate`${renderComponent($$result, "OffersCard", $$OffersCard, { "service": service, "isReversed": index % 2 !== 0, "data-astro-cid-f7cs73ab": true })}`)} </div> </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/services/ServiceOffersVermittlung.astro", void 0);

const $$Services = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ServicesHero", $$ServicesHero, {})} ${renderComponent($$result2, "ServicesOffers", $$ServicesOffersVerwaltung, {})}  ${renderComponent($$result2, "ServiceOffersVermittlung", $$ServiceOffersVermittlung, {})} ${renderComponent($$result2, "CTAContactSection", $$CTAContactSection, {})} ` })}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/services.astro", void 0);

const $$file = "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/services.astro";
const $$url = "/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Services,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
