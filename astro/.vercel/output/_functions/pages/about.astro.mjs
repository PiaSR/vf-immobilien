import { $ as $$MainLayout } from '../chunks/MainLayout_DU7Rr5R3.mjs';
import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_lfFasKkK.mjs';
import 'piccolore';
import { $ as $$CTAContactSection } from '../chunks/CTAContactSection_CcCDYf-H.mjs';
import { $ as $$ButtonArrow } from '../chunks/ButtonArrow_C6883PUt.mjs';
import { $ as $$HeroHeader } from '../chunks/HeroHeader_CLQrIJ7L.mjs';
/* empty css                                 */
import { $ as $$SectionHeader, a as $$SubheaderSVG } from '../chunks/SectionHeader_DSOZ_kEG.mjs';
import { $ as $$ServiceCard } from '../chunks/ServiceCard_BuVNwNC-.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_B2RpSsLg.mjs';
export { renderers } from '../renderers.mjs';

const $$AboutHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="about-hero" class="about-hero" data-astro-cid-i6rwvekh> <div class="site-container hero-grid-content padding-section" data-astro-cid-i6rwvekh> <div class="container-align-left" data-astro-cid-i6rwvekh> ${renderComponent($$result, "HeroHeader", $$HeroHeader, { "header": "Tradition trifft Zukunft", "text": "Immobilienverwaltung & Vermittlung mit pers\xF6nlichem Engagement und fachlicher Kompetenz.", "headerColor": "var(--color-neutral-white)", "textColor": "var(--color-neutral-white)", "data-astro-cid-i6rwvekh": true })} ${renderComponent($$result, "ButtonArrow", $$ButtonArrow, { "class": "button-light-green", "href": "/services", "data-astro-cid-i6rwvekh": true }, { "default": ($$result2) => renderTemplate`
Mehr zu Leistungen
` })} </div> </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/about/AboutHero.astro", void 0);

const $$AboutHistory = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="about-history" class="history-section" data-astro-cid-sx4ps4pu> <div class="site-container padding-section" data-astro-cid-sx4ps4pu> ${renderComponent($$result, "SectionHeader", $$SectionHeader, { "header": "Gebaut auf Erfahrung", "text": "Viktoria Frohner Immobilien hat seine Wurzeln in zwei langj\xE4hrig etablierten Hausverwaltungen. Aus dem Besten beider Welten haben wir etwas Neues geschaffen \u2013 modern, engagiert und mit einem starken Fundament.", "headerColor": "var(--color-brand-medium-green)", "textColor": "var(--color-neutral-font-dark)", "data-astro-cid-sx4ps4pu": true })} <div class="card-wrapper" data-astro-cid-sx4ps4pu> ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "HV Mag. Alexandra Richling", "description": "Unsere Immobilienverwaltung in Wien bietet Ihnen eine umfassende, zuverl\xE4ssige Betreuung f\xFCr Ihre Liegenschaften. Wir k\xFCmmern uns um alle administrativen Aufgaben \u2013 von der Instandhaltung bis hin zur effizienten Mieterbetreuung.", "cardBgColor": "var(--color-neutral-light-grey)", "cardFontColor": "var(--color-neutral-font-dark)", "cardBgHover": "var(--color-brand-green)", "cardFontHover": "var(--color-neutral-white)", "href": "https://richling.at/", "target": "_blank", "data-astro-cid-sx4ps4pu": true })} ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "HV H\xF6rtlehner", "description": "Die Hausverwaltung H\xF6rtlehner wurde in den 60iger Jahren von Frau Ida H\xF6rtlehner gegr\xFCndet und nach ihrem Tod von ihrem Mann, Dr. Alexander H\xF6rtlehner weitergef\xFChrt. 1992 erwarben Georg und Veronika Warhanek das Unternehmen und es wird seither als Ges.m.b.H. unter der Gesch\xE4ftsf\xFChrung von Frau Veronika Warhanek betrieben.", "cardBgColor": "var(--color-neutral-light-grey)", "cardFontColor": "var(--color-neutral-font-dark)", "cardBgHover": "var(--color-brand-green)", "cardFontHover": "var(--color-neutral-white)", "href": "https://www.hoertlehner.at/", "target": "_blank", "data-astro-cid-sx4ps4pu": true })} </div> </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/about/AboutHistory.astro", void 0);

const $$AboutIntro = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="intro-section" data-astro-cid-u4nqujkm> <div class="site-container padding-section" data-astro-cid-u4nqujkm> ${renderComponent($$result, "SectionHeader", $$SectionHeader, { "header": "Immer f\xFCr Sie da.", "subheader": "\xDCBER UNS", "text": "Die Viktoria Frohner Immobilien GmbH steht f\xFCr eine individuelle und verl\xE4ssliche Betreuung von Immobilien in Wien und Umgebung. Als klein strukturiertes Unternehmen legen wir besonderen Wert auf pers\xF6nliche Erreichbarkeit, direkte Kommunikation und eine langfristige Zusammenarbeit mit Eigent\xFCmer:innen und Mieter:innen.<br><br>Wir verstehen Immobilienverwaltung nicht nur als administrative Aufgabe, sondern als Verantwortung gegen\xFCber den Menschen, die in den Liegenschaften wohnen und investieren. Unser Ziel ist es, durch transparente Prozesse und engagierte Betreuung den Wert Ihrer Immobilie nachhaltig zu sichern.", "subheaderSVGColor": "var(--color-brand-light-green)", "subheaderColor": "var(--color-neutral-dark-grey)", "headerColor": "var(--color-brand-medium-green)", "textColor": "var(--color-neutral-font-dark)", "data-astro-cid-u4nqujkm": true })} ${renderComponent($$result, "ButtonArrow", $$ButtonArrow, { "class": "button-orange slide-in-section", "href": "/contact", "data-astro-cid-u4nqujkm": true }, { "default": ($$result2) => renderTemplate`
Kontaktieren Sie uns.
` })} </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/about/AboutIntro.astro", void 0);

const logoInverted = new Proxy({"src":"/_astro/logo-inverter-iron.D0MHzkmU.png","width":1754,"height":1193,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/logo-inverter-iron.png";
							}
							
							return target[name];
						}
					});

const $$AboutValues = createComponent(($$result, $$props, $$slots) => {
  const values = [
    {
      title: "Verl\xE4sslichkeit",
      description: "Vertrauen braucht Verl\xE4sslichkeit \u2013 und genau daf\xFCr stehen wir. Mit klaren Abl\xE4ufen, ehrlicher Kommunikation und einem Miteinander auf Augenh\xF6he begleiten wir unsere Kund:innen Tag f\xFCr Tag."
    },
    {
      title: "Transparenz",
      description: "Wir behalten das Wesentliche im Auge \u2013 und sorgen daf\xFCr, dass Ihre Immobilie heute und morgen gut dasteht. Effizient, verantwortungsvoll und pers\xF6nlich."
    },
    {
      title: "Erreichbarkeit",
      description: "F\xFCr uns z\xE4hlt der direkte Draht: pers\xF6nliche Betreuung, ehrliche Gespr\xE4che und ein offenes Ohr \u2013 f\xFCr Eigent\xFCmer:innen wie Mieter:innen. Immer ansprechbar, immer nah dran."
    },
    {
      title: "Nachhaltigkeit",
      description: "Nachhaltigkeit bedeutet f\xFCr uns, Immobilien nicht nur zu verwalten, sondern verantwortungsvoll f\xFCr kommende Generationen zu erhalten. Wir setzen auf langfristige L\xF6sungen, ressourcenschonende Prozesse und eine Verwaltung mit Blick in die Zukunft."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="about-values" class="values-section " data-astro-cid-m3wx5bwn> <div class="site-container padding-section slide-in-section" data-astro-cid-m3wx5bwn> ${renderComponent($$result, "Image", $$Image, { "class": "image-logo-inverted", "src": logoInverted, "alt": "company logo inverted, filled with image of white wall", "data-astro-cid-m3wx5bwn": true })} <div class="values-container" data-astro-cid-m3wx5bwn> ${renderComponent($$result, "SubheaderSVG", $$SubheaderSVG, { "subheader": "UNSERE WERTE", "subheaderSVGColor": "var(--color-brand-dark-green)", "subheaderColor": "var(--color-neutral-lightest)", "data-astro-cid-m3wx5bwn": true })} ${values.map((value) => {
    return renderTemplate`<div class="value-wrapper" data-astro-cid-m3wx5bwn> <h3 class="value-h3" data-astro-cid-m3wx5bwn>${value.title}</h3> <div class="card-line" data-astro-cid-m3wx5bwn></div> <p class="value-text" data-astro-cid-m3wx5bwn>${value.description}</p> </div>`;
  })} </div> </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/about/AboutValues.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "\xDCber VF Immobilien: Ihr Partner f\xFCr Hausverwaltung";
  const pageDescription = "Erfahren Sie mehr \xFCber VF Immobilien in Wien. Wir bieten vertrauensw\xFCrdige und transparente Verwaltung und Vermittlung f\xFCr Eigentumswohnungen und Zinsh\xE4user in der Wien und Umgebung.";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle, "description": pageDescription }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AboutHero", $$AboutHero, {})} ${renderComponent($$result2, "AboutIntro", $$AboutIntro, {})} ${renderComponent($$result2, "AboutValues", $$AboutValues, {})} ${renderComponent($$result2, "AboutHistory", $$AboutHistory, {})}  ${renderComponent($$result2, "CTAContactSection", $$CTAContactSection, {})} ` })}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/about.astro", void 0);

const $$file = "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
