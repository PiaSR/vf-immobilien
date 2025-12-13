import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate } from './astro/server_lfFasKkK.mjs';
import 'piccolore';
import { $ as $$ButtonArrow } from './ButtonArrow_C6883PUt.mjs';
import { $ as $$SectionHeader } from './SectionHeader_DSOZ_kEG.mjs';
import { $ as $$Image } from './_astro_assets_B2RpSsLg.mjs';
/* empty css                           */

const ctaimage = new Proxy({"src":"/_astro/cta-services-alt.B_GPDWrZ.jpg","width":1667,"height":2500,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/cta-services-alt.jpg";
							}
							
							return target[name];
						}
					});

const $$CTAServicesSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="contact-cta-section has-angled-image" data-astro-cid-q2laoft3> <div class="site-container padding-section" data-astro-cid-q2laoft3> <div class="text-container" data-astro-cid-q2laoft3> ${renderComponent($$result, "SectionHeader", $$SectionHeader, { "header": "Noch Fragen offen?", "text": "Entdecken Sie unsere Leistungen \u2013 mit Herz, Verstand und einem offenen Ohr f\xFCr Ihre Anliegen.", "headerColor": "var(--color-brand-medium-green)", "textColor": "var(--color-neutral-font-dark)", "data-astro-cid-q2laoft3": true })} <div class="button-container" data-astro-cid-q2laoft3> ${renderComponent($$result, "ButtonArrow", $$ButtonArrow, { "href": "/services", "class": "button-orange button-small", "data-astro-cid-q2laoft3": true }, { "default": ($$result2) => renderTemplate`
Unsere Leistungen
` })} ${renderComponent($$result, "ButtonArrow", $$ButtonArrow, { "href": "/contact", "class": "button-transparent button-small", "data-astro-cid-q2laoft3": true }, { "default": ($$result2) => renderTemplate`
Kontakt
` })} </div> </div> ${renderComponent($$result, "Image", $$Image, { "src": ctaimage, "loading": "lazy", "alt": "building facade, white, with green ivy climbing up", "class": "angled-image angled-image-mobile-show", "widths": [450, 600, 992, 1200, 1667], "sizes": "(max-width: 991px) 100vw, 28vw", "width": 1667, "height": 2500, "data-astro-cid-q2laoft3": true })} </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Base/CTAServicesSection.astro", void 0);

export { $$CTAServicesSection as $ };
