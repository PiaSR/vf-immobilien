import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate } from './astro/server_lfFasKkK.mjs';
import 'piccolore';
import { $ as $$ButtonArrow } from './ButtonArrow_C6883PUt.mjs';
import { $ as $$SectionHeader } from './SectionHeader_DSOZ_kEG.mjs';
import { $ as $$Image } from './_astro_assets_B2RpSsLg.mjs';
/* empty css                         */

const ctaimage = new Proxy({"src":"/_astro/cta-image1.C0ZqI4v6.jpg","width":5464,"height":8192,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/cta-image1.jpg";
							}
							
							return target[name];
						}
					});

const $$CTAContactSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="contact-cta-section has-angled-image" data-astro-cid-3ezqahv5> <div class="site-container padding-section" data-astro-cid-3ezqahv5> <div class="text-container" data-astro-cid-3ezqahv5> ${renderComponent($$result, "SectionHeader", $$SectionHeader, { "header": "Bereit f\xFCr den n\xE4chsten Schritt?", "text": "Ob Verwaltung, Vermittlung oder Beratung - wir sind pers\xF6nlich f\xFCr Sie da.", "headerColor": "var(--color-neutral-white)", "textColor": "var(--color-neutral-white)", "data-astro-cid-3ezqahv5": true })} <div class="button-container" data-astro-cid-3ezqahv5> ${renderComponent($$result, "ButtonArrow", $$ButtonArrow, { "href": "/faqs", "class": "button-transparent button-small", "data-astro-cid-3ezqahv5": true }, { "default": ($$result2) => renderTemplate`
FAQs
` })} ${renderComponent($$result, "ButtonArrow", $$ButtonArrow, { "href": "/contact", "class": "button-orange button-small", "data-astro-cid-3ezqahv5": true }, { "default": ($$result2) => renderTemplate`
Kontaktieren Sie uns
` })} </div> </div> ${renderComponent($$result, "Image", $$Image, { "src": ctaimage, "loading": "lazy", "alt": "building facade, white, with green ivy climbing up", "class": "angled-image angled-image-mobile-show", "widths": [450, 600, 992, 1200, 1667], "sizes": "(max-width: 991px) 100vw, 28vw", "width": 1667, "height": 2500, "data-astro-cid-3ezqahv5": true })} </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Base/CTAContactSection.astro", void 0);

export { $$CTAContactSection as $ };
