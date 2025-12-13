import { $ as $$MainLayout } from '../chunks/MainLayout_CoMNAWfS.mjs';
import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate, b as renderScript, F as Fragment, e as addAttribute } from '../chunks/astro/server_lfFasKkK.mjs';
import 'piccolore';
import { $ as $$Image } from '../chunks/_astro_assets_B2RpSsLg.mjs';
import { $ as $$HeroHeader } from '../chunks/HeroHeader_CLQrIJ7L.mjs';
/* empty css                                */
import { g as getFaqs, a as getDocuments } from '../chunks/sanityClient_DUM2tGat.mjs';
import { T as TriangleGreen } from '../chunks/Triangle-green_Cmxg-n2f.mjs';
import { $ as $$SectionHeader } from '../chunks/SectionHeader_DSOZ_kEG.mjs';
import { d as docIcon, o as openInNewWindow } from '../chunks/Open-in-new-window_CNU5SfIV.mjs';
import { $ as $$CTAServicesSection } from '../chunks/CTAServicesSection_AH1FUqs1.mjs';
export { renderers } from '../renderers.mjs';

const heroImage = new Proxy({"src":"/_astro/faq-hero.DfLSo89e.jpg","width":1668,"height":2500,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/piasmith-richling/Code/VF Immobilien/astro/src/assets/images/faq-hero.jpg";
							}
							
							return target[name];
						}
					});

const $$FaqsHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="faq-hero" class="faq-hero has-angled-image" data-astro-cid-rmzpbohc> <div class="site-container hero-grid-content padding-section" data-astro-cid-rmzpbohc> <div class="container-align-left" data-astro-cid-rmzpbohc> ${renderComponent($$result, "HeroHeader", $$HeroHeader, { "header": "Alles, was Sie brauchen.", "text": "Wissenswertes & Dokumente", "headerColor": "var(--color-neutral-white)", "textColor": "var(--color-neutral-white)", "data-astro-cid-rmzpbohc": true })} </div> ${renderComponent($$result, "Image", $$Image, { "src": heroImage, "alt": "brown wooden door", "class": "angled-image angled-image-mobile-show", "loading": "eager", "widths": [450, 600, 992, 1200, 1667], "sizes": "(max-width: 991px) 100vw, 28vw", "width": 1667, "height": 2500, "data-astro-cid-rmzpbohc": true })} </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/faqs/FaqsHero.astro", void 0);

const $$FAQSQuestions = createComponent(async ($$result, $$props, $$slots) => {
  const fetchedFaqItems = await getFaqs();
  const allFaqItems = fetchedFaqItems || [];
  const groupedFaqs = allFaqItems.reduce((acc, item) => {
    const categoryKey = item.category || "general";
    if (!acc.has(categoryKey)) {
      acc.set(categoryKey, []);
    }
    acc.get(categoryKey).push(item);
    return acc;
  }, /* @__PURE__ */ new Map());
  const categoryDisplayNames = {
    all: "Alle",
    renters: "Mieter",
    owners: "Eigent\xFCmer"
  };
  const categories = Array.from(groupedFaqs.keys()).filter(
    (key) => key !== "all"
  );
  const hasFaqs = allFaqItems.length > 0;
  return renderTemplate`${maybeRenderHead()}<section id="faq-section" class="faq-section" data-astro-cid-6ul6luqy> <div class="site-container padding-section" data-astro-cid-6ul6luqy> <div class="section-header-wrapper" data-astro-cid-6ul6luqy> <h2 class="heading-h3 faq-header-title" data-astro-cid-6ul6luqy>Häufig gestellte Fragen</h2> </div> ${hasFaqs && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-6ul6luqy": true }, { "default": async ($$result2) => renderTemplate` <div id="faq-filterable-list" class="faq-filter-wrapper " data-filter-controls data-astro-cid-6ul6luqy> <div class="faq-categories-list-ui" data-astro-cid-6ul6luqy> <button data-filter-value="all" class="button-filter active" data-astro-cid-6ul6luqy>
Alle
</button> ${categories.map((key) => renderTemplate`<button${addAttribute(key, "data-filter-value")} class="button-filter" data-has-separator data-astro-cid-6ul6luqy> ${categoryDisplayNames[key]} </button>`)} </div> </div> <div class="faq-list-wrapper slide-in-section" data-astro-cid-6ul6luqy> ${Array.from(groupedFaqs.keys()).map(
    (categoryKey) => renderTemplate`<div class="faq-category-group"${addAttribute(categoryKey, "data-category-group")} data-astro-cid-6ul6luqy> <div class="faq-item-list" data-astro-cid-6ul6luqy>  ${groupedFaqs.get(categoryKey).map(
      (item) => renderTemplate`<div class="faq-item"${addAttribute(categoryKey, "data-category")} data-accordion-item data-astro-cid-6ul6luqy> <svg class="top-line" width="100%" height="10" viewBox="0 0 auto 10" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-6ul6luqy> <rect x="0" y="4.5" width="100%" height="1" rx="0.5" fill="currentColor" data-astro-cid-6ul6luqy></rect> </svg> <div class="faq-question-container" data-astro-cid-6ul6luqy>  <div class="faq-question-header" data-accordion-header data-astro-cid-6ul6luqy> <div class="faq-question-text" data-astro-cid-6ul6luqy> ${item.question} </div> <div class="faq-arrow-icon-wrapper" data-astro-cid-6ul6luqy> ${renderComponent($$result2, "Image", $$Image, { "src": TriangleGreen, "alt": "green triangle for down arrow", "class": "collapsible-icon", "data-astro-cid-6ul6luqy": true })} </div> </div> </div> <div class="faq-answer-wrapper" data-accordion-content data-astro-cid-6ul6luqy> <p class="faq-answer-text" data-astro-cid-6ul6luqy>${item.answer}</p> </div> </div>`
    )} </div> </div>`
  )} </div> ` })}`} </div> </section> ${renderScript($$result, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/faqs/FAQSQuestions.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/faqs/FAQSQuestions.astro", void 0);

const $$FaqsDocuments = createComponent(async ($$result, $$props, $$slots) => {
  const fetchedDocuments = await getDocuments();
  const allDocuments = fetchedDocuments || [];
  const groupedDocuments = allDocuments.reduce((acc, doc) => {
    const categoryKey = doc.category || "general";
    if (!acc.has(categoryKey)) {
      acc.set(categoryKey, []);
    }
    acc.get(categoryKey).push(doc);
    return acc;
  }, /* @__PURE__ */ new Map());
  const hasDocuments = allDocuments.length > 0;
  return renderTemplate`${maybeRenderHead()}<section id="faq-documents-section" class="faq-document-section" data-astro-cid-4gh4apvj> <div class="site-container padding-section slide-in-section" data-astro-cid-4gh4apvj> ${renderComponent($$result, "SectionHeader", $$SectionHeader, { "header": "Alle Dokumente an einem Ort", "text": "Ob Anmeldeformulare, Mieterservice oder Beh\xF6rdenwege \u2013 hier finden Sie alle wichtigen Unterlagen schnell und unkompliziert.", "headerColor": "var(--color-brand-light-green)", "textColor": "var(--color-neutral-white)", "data-astro-cid-4gh4apvj": true })} ${hasDocuments && renderTemplate`<div class="document-wrapper" data-astro-cid-4gh4apvj> <div class="document-list-wrapper" data-astro-cid-4gh4apvj> ${Array.from(groupedDocuments.keys()).map((categoryKey) => renderTemplate`<div class="doc-category-group"${addAttribute(categoryKey, "data-category-group")} data-astro-cid-4gh4apvj> <div class="doc-item-list" data-astro-cid-4gh4apvj> ${groupedDocuments.get(categoryKey).map((doc) => renderTemplate`<a${addAttribute(doc.fileUrl, "href")} class="document-link-item" target="_blank" download data-astro-cid-4gh4apvj> <div class="document-icon-title-wrapper" data-astro-cid-4gh4apvj> ${renderComponent($$result, "Image", $$Image, { "src": docIcon, "alt": "document icon", "class": "document-icon", "data-astro-cid-4gh4apvj": true })} <span class="document-title" data-astro-cid-4gh4apvj>${doc.title}</span> </div> ${renderComponent($$result, "Image", $$Image, { "src": openInNewWindow, "alt": "icon for open in new window", "class": "document-icon", "data-astro-cid-4gh4apvj": true })} </a>`)} </div> </div>`)} </div> </div>`} </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/faqs/FaqsDocuments.astro", void 0);

const $$Faqs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "FaqsHero", $$FaqsHero, {})} ${renderComponent($$result2, "FAQSQuestions", $$FAQSQuestions, {})} ${renderComponent($$result2, "FaqsDocuments", $$FaqsDocuments, {})} ${renderComponent($$result2, "CTAServicesSection", $$CTAServicesSection, {})} ` })}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/faqs.astro", void 0);

const $$file = "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/faqs.astro";
const $$url = "/faqs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Faqs,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
