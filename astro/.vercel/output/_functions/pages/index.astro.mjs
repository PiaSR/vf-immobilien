import { $ as $$MainLayout } from '../chunks/MainLayout_DU7Rr5R3.mjs';
import { c as createComponent, m as maybeRenderHead, r as renderComponent, b as renderScript, a as renderTemplate, F as Fragment } from '../chunks/astro/server_lfFasKkK.mjs';
import 'piccolore';
import { $ as $$CTAContactSection } from '../chunks/CTAContactSection_CcCDYf-H.mjs';
import { $ as $$Button } from '../chunks/Button_CJOdNCUC.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_B2RpSsLg.mjs';
import { $ as $$HeroHeader } from '../chunks/HeroHeader_CLQrIJ7L.mjs';
/* empty css                                 */
import { $ as $$ServiceCard } from '../chunks/ServiceCard_BuVNwNC-.mjs';
import { $ as $$SectionHeader } from '../chunks/SectionHeader_DSOZ_kEG.mjs';
import { $ as $$ButtonArrow } from '../chunks/ButtonArrow_C6883PUt.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const heroImage = new Proxy({"src":"/_astro/landing-hero.DdxEvkwj.jpg","width":1667,"height":2500,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/landing-hero.jpg";
							}
							
							return target[name];
						}
					});

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="landing-hero" class="hero has-angled-image" data-astro-cid-wutbe3gc> <div class="site-container hero-grid-content padding-section" data-astro-cid-wutbe3gc> <div class="container-align-left" data-astro-cid-wutbe3gc> ${renderComponent($$result, "HeroHeader", $$HeroHeader, { "text": "Immobilienverwaltung & Vermittlung mit pers\xF6nlichem Engagement und fachlicher Kompetenz.", "headerColor": "var(--color-brand-dark-green)", "textColor": "var(--color-brand-dark-green)", "data-astro-cid-wutbe3gc": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`
Verwaltung, gebaut auf
<span class="animated-word-wrapper" data-astro-cid-wutbe3gc> <div class="animated-word-list" data-astro-cid-wutbe3gc> <span data-astro-cid-wutbe3gc>Vertrauen</span> <span data-astro-cid-wutbe3gc>Kompetenz</span> <span data-astro-cid-wutbe3gc>Transparenz</span> <span data-astro-cid-wutbe3gc>Erreichbarkeit</span> <span data-astro-cid-wutbe3gc>Erfahrung</span> <span data-astro-cid-wutbe3gc>Verlässlichkeit</span> <span data-astro-cid-wutbe3gc>Nachhaltigkeit</span> </div> </span> ` })} ` })} ${renderComponent($$result, "Button", $$Button, { "class": "button-orange", "href": "/contact", "data-astro-cid-wutbe3gc": true }, { "default": ($$result2) => renderTemplate`
Kontaktieren Sie uns
` })} </div> ${renderComponent($$result, "Image", $$Image, { "src": heroImage, "alt": "White building facade", "class": "angled-image angled-image-mobile-show", "loading": "eager", "quality": 70, "fetchpriority": "high", "widths": [450, 600, 992, 1200, 1667], "sizes": "(max-width: 991px) 100vw, 28vw", "width": 1667, "height": 2500, "data-astro-cid-wutbe3gc": true })} </div> </section>  ${renderScript($$result, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/landing/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/landing/Hero.astro", void 0);

const $$LandingServices = createComponent(($$result, $$props, $$slots) => {
  const services = [
    {
      icon: `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-340q33 0 56.5-23.5T560-420q0-33-23.5-56.5T480-500q-33 0-56.5 23.5T400-420q0 33 23.5 56.5T480-340ZM160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z stroke="#FFFEFE"></path></svg>
    `,
      title: "Immobilienverwaltung",
      description: "Unsere Immobilien-verwaltung in Wien bietet Ihnen eine umfassende, zuverl\xE4ssige Betreuung f\xFCr Ihre Liegenschaften. Wir k\xFCmmern uns um alle administrativen Aufgaben \u2013 von der Instandhaltung bis hin zur effizienten Mieterbetreuung."
    },
    {
      icon: `
      <svg width="45" height="43" viewBox="0 0 45 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40.3345 2L36.3345 6M36.3345 6L42.3345 12L35.3345 19L29.3345 13M36.3345 6L29.3345 13M21.1145 21.22C22.1472 22.2389 22.9681 23.4521 23.53 24.7896C24.0919 26.1271 24.3837 27.5625 24.3886 29.0133C24.3934 30.464 24.1113 31.9014 23.5584 33.2426C23.0054 34.5838 22.1927 35.8025 21.1668 36.8283C20.141 37.8541 18.9224 38.6669 17.5811 39.2198C16.2399 39.7728 14.8025 40.0549 13.3518 40.0501C11.9011 40.0452 10.4656 39.7534 9.12812 39.1915C7.79061 38.6296 6.57747 37.8087 5.55853 36.776C3.55479 34.7014 2.44606 31.9228 2.47112 29.0386C2.49618 26.1544 3.65304 23.3955 5.69253 21.356C7.73202 19.3165 10.491 18.1596 13.3751 18.1346C16.2593 18.1095 19.0379 19.2183 21.1125 21.222L21.1145 21.22ZM21.1145 21.22L29.3345 13" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
      title: "Vermietung",
      description: "Wir sorgen f\xFCr einen reibungslosen und schnellen Vermietungsprozess. Wir erstellen professionelle Immobilienanzeigen und finden zuverl\xE4ssige Mieter:innen f\xFCr Ihre Wohnung oder Ihr Haus."
    },
    {
      icon: `
      <svg width="41" height="44" viewBox="0 0 41 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.666 42V22H26.666V42M2.66602 16L20.666 2L38.666 16V38C38.666 39.0609 38.2446 40.0783 37.4944 40.8284C36.7443 41.5786 35.7269 42 34.666 42H6.66602C5.60515 42 4.58773 41.5786 3.83759 40.8284C3.08744 40.0783 2.66602 39.0609 2.66602 38V16Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
      title: "Vermittlung",
      description: "Mit unserer langj\xE4hrigen Erfahrung im Immobilienverkauf in Wien bieten wir Ihnen eine fachkundige Beratung, um den besten Preis f\xFCr Ihre Immobilie zu erzielen. Wir analysieren den Markt und unterst\xFCtzen Sie bei der Preisfindung."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="services-section" data-astro-cid-wnpvhfmm> <div class="site-container padding-section" data-astro-cid-wnpvhfmm> ${renderComponent($$result, "SectionHeader", $$SectionHeader, { "header": "Ihre Immobilie. Unsere Leistungen.", "subheader": "WAS WIR TUN", "text": "Wir verbinden Erfahrung mit moderner Dienstleistung \u2013 f\xFCr eine Immobilienbetreuung, der Sie vertrauen k\xF6nnen.", "subheaderSVGColor": "var(--color-brand-light-green)", "subheaderColor": "var(--color-neutral-dark-grey)", "headerColor": "var(--color-brand-light-green)", "textColor": "var(--color-neutral-white)", "textSize": "var(--font-size-body-xlarge)", "data-astro-cid-wnpvhfmm": true })} <div class="services-grid" data-astro-cid-wnpvhfmm> ${services.map((service) => renderTemplate`${renderComponent($$result, "ServiceCard", $$ServiceCard, { "icon": service.icon, "title": service.title, "description": service.description, "cardBgColor": "var(--color-brand-green)", "cardFontColor": "var(--color-neutral-white)", "cardBgHover": "var(--color-brand-light-green)", "cardFontHover": "var(--color-neutral-font-dark)", "data-astro-cid-wnpvhfmm": true })}`)} </div> <div class="flex-center" data-astro-cid-wnpvhfmm> ${renderComponent($$result, "ButtonArrow", $$ButtonArrow, { "href": "/services", "class": "button-orange", "data-astro-cid-wnpvhfmm": true }, { "default": ($$result2) => renderTemplate`
Mehr zu Leistungen
` })} </div> </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/landing/LandingServices.astro", void 0);

const $$LandingStats = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="stats-section slide-in-section" data-astro-cid-lxubeg4b> <div class="stats-content-wrapper site-container" data-astro-cid-lxubeg4b> <div class="stats-grid" data-astro-cid-lxubeg4b> <div class="stats-card" data-astro-cid-lxubeg4b> <div class="stats-numbers" data-astro-cid-lxubeg4b>50+</div> <div class="stats-heading-wrapper" data-astro-cid-lxubeg4b> <p class="stats-header" data-astro-cid-lxubeg4b>Jahre Erfahrung</p> </div> <div class="horizontal-line" data-astro-cid-lxubeg4b> <svg width="100%" height="10" viewBox="0 0 240 10" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-lxubeg4b> <rect x="0" y="4.5" width="100%" height="2" rx="0.5" fill="currentColor" data-astro-cid-lxubeg4b></rect> </svg> </div> <p class="stats-p" data-astro-cid-lxubeg4b>
Unser Team vereint Fachwissen aus mehreren Jahrzehnten professioneller
          Immobilienverwaltung.
</p> </div> <div class="stats-card" data-astro-cid-lxubeg4b> <div class="stats-numbers" data-astro-cid-lxubeg4b>24/7</div> <div class="stats-heading-wrapper" data-astro-cid-lxubeg4b> <p class="stats-header" data-astro-cid-lxubeg4b>Für Sie erreichbar</p> </div> <div class="horizontal-line" data-astro-cid-lxubeg4b> <svg width="100%" height="10" viewBox="0 0 240 10" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-lxubeg4b> <rect x="0" y="4.5" width="100%" height="2" rx="0.5" fill="currentColor" data-astro-cid-lxubeg4b></rect> </svg> </div> <p class="stats-p" data-astro-cid-lxubeg4b>
Weil gute Verwaltung dann da ist, wenn sie gebraucht wird - mit
          Engagement, Erfahrung und dem Blick fürs Wesentliche.
</p> </div> <div class="stats-card" data-astro-cid-lxubeg4b> <div class="stats-numbers" data-astro-cid-lxubeg4b>120</div> <div class="stats-heading-wrapper" data-astro-cid-lxubeg4b> <p class="stats-header" data-astro-cid-lxubeg4b>Verwaltete Einheiten</p> </div> <div class="horizontal-line" data-astro-cid-lxubeg4b> <svg width="100%" height="10" viewBox="0 0 240 10" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-lxubeg4b> <rect x="0" y="4.5" width="100%" height="2" rx="0.5" fill="currentColor" data-astro-cid-lxubeg4b></rect> </svg> </div> <p class="stats-p" data-astro-cid-lxubeg4b>
...and counting! Vom Altbau bis zum Neubau – wir kümmern uns um
          Immobilien mit Weitblick und Sorgfalt.
</p> </div> </div> </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/landing/LandingStats.astro", void 0);

const persoenlich = new Proxy({"src":"/_astro/personlich-green-bg-min.Cuq4snOP.png","width":208,"height":263,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/personlich-green-bg-min.png";
							}
							
							return target[name];
						}
					});

const erfahren = new Proxy({"src":"/_astro/erfahrung-value.DORp72ia.png","width":206,"height":214,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/erfahrung-value.png";
							}
							
							return target[name];
						}
					});

const digital = new Proxy({"src":"/_astro/digital-value.BGp44YXL.png","width":205,"height":214,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/digital-value.png";
							}
							
							return target[name];
						}
					});

const $$LandingValues = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="landing-values-section" class="values-section slide-in-section" data-astro-cid-nvlcnj6g> <div class="site-container padding-section" data-astro-cid-nvlcnj6g> <div class="values-grid" data-astro-cid-nvlcnj6g> <div class="values-text-container" data-astro-cid-nvlcnj6g> ${renderComponent($$result, "SectionHeader", $$SectionHeader, { "header": "Mehr Erfahrung. Mehr Vertrauen.", "subheader": "WARUM WIR", "text": "Aus zwei erfahrenen Hausverwaltungen gewachsen \u2013 mit frischem Blick und pers\xF6nlicher Betreuung gehen wir neue Wege in der Immobilienwelt.", "subheaderSVGColor": "var(--color-brand-light-green)", "subheaderColor": "var(--color-neutral-dark-grey)", "headerColor": "var(--color-brand-medium-green)", "textColor": "var(--color-neutral-font-dark)", "data-astro-cid-nvlcnj6g": true })} ${renderComponent($$result, "ButtonArrow", $$ButtonArrow, { "href": "/kontakt", "class": "button-orange button-small", "data-astro-cid-nvlcnj6g": true }, { "default": ($$result2) => renderTemplate`
Mehr über uns
` })} </div> <div class="values-list" data-astro-cid-nvlcnj6g> <div class="value-card" data-astro-cid-nvlcnj6g> ${renderComponent($$result, "Image", $$Image, { "src": persoenlich, "loading": "lazy", "alt": "old building facade", "class": "value-img", "data-astro-cid-nvlcnj6g": true })} <div class="value-card-content" data-astro-cid-nvlcnj6g> <h5 class="value-h5" data-astro-cid-nvlcnj6g>Verlässlichkeit</h5> <div class="horizontal-line" data-astro-cid-nvlcnj6g> <svg width="100%" height="10" viewBox="0 0 240 10" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-nvlcnj6g> <rect x="0" y="4.5" width="100%" height="2" rx="0.5" fill="currentColor" data-astro-cid-nvlcnj6g></rect> </svg> </div> <p class="value-p" data-astro-cid-nvlcnj6g>
Direkter Kontakt und individuelle Betreuung auf Augenhöhe.
</p> </div> </div> <div class="value-card" data-astro-cid-nvlcnj6g> ${renderComponent($$result, "Image", $$Image, { "src": erfahren, "loading": "lazy", "alt": "company owner, smiling, arms crossed", "class": "value-img", "data-astro-cid-nvlcnj6g": true })} <div class="value-card-content" data-astro-cid-nvlcnj6g> <h5 class="value-h5" data-astro-cid-nvlcnj6g>Nachhaltigkeit</h5> <div class="horizontal-line" data-astro-cid-nvlcnj6g> <svg width="100%" height="10" viewBox="0 0 240 10" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-nvlcnj6g> <rect x="0" y="4.5" width="100%" height="2" rx="0.5" fill="currentColor" data-astro-cid-nvlcnj6g></rect> </svg> </div> <p class="value-p" data-astro-cid-nvlcnj6g>
Verwurzelt in jahrzehntelanger Verwaltungskompetenz.
</p> </div> </div> <div class="value-card" data-astro-cid-nvlcnj6g> ${renderComponent($$result, "Image", $$Image, { "src": digital, "loading": "lazy", "alt": "smartphone in hand", "class": "value-img", "data-astro-cid-nvlcnj6g": true })} <div class="value-card-content" data-astro-cid-nvlcnj6g> <h5 class="value-h5" data-astro-cid-nvlcnj6g>Erreichbarkeit</h5> <div class="horizontal-line" data-astro-cid-nvlcnj6g> <svg width="100%" height="10" viewBox="0 0 240 10" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-nvlcnj6g> <rect x="0" y="4.5" width="100%" height="2" rx="0.5" fill="currentColor" data-astro-cid-nvlcnj6g></rect> </svg> </div> <p class="value-p" data-astro-cid-nvlcnj6g>
Moderne Tools für eine schnelle und einfache Abwicklung.
</p> </div> </div> </div> </div> </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/landing/LandingValues.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "VF Immobilien | Immobilienverwaltung in Wien und Umgebung";
  const pageDescription = "Professionelle und vertrauensw\xFCrdige Immobilienverwaltung in Wien und Umgebung. Kontaktieren Sie uns f\xFCr Ihr individuelles Angebot.";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle, "description": pageDescription }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "LandingServices", $$LandingServices, {})} ${renderComponent($$result2, "LandingStats", $$LandingStats, {})} ${renderComponent($$result2, "LandingValues", $$LandingValues, {})} ${renderComponent($$result2, "CTAContactSection", $$CTAContactSection, {})} ` })}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/index.astro", void 0);

const $$file = "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
