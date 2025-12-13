import { $ as $$MainLayout } from '../chunks/MainLayout_DU7Rr5R3.mjs';
import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_lfFasKkK.mjs';
import 'piccolore';
import { $ as $$ButtonArrow } from '../chunks/ButtonArrow_C6883PUt.mjs';
/* empty css                                        */
export { renderers } from '../renderers.mjs';

const $$ComingSoon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="section-coming-soon" data-astro-cid-3xn2ua32> <div class="coming-soon-wrapper" data-astro-cid-3xn2ua32> <h1 class="header-coming-soon" data-astro-cid-3xn2ua32>Coming Soon!</h1> ${renderComponent($$result, "ButtonArrow", $$ButtonArrow, { "href": "/properties/propertySearch", "class": "button-orange", "data-astro-cid-3xn2ua32": true }, { "default": ($$result2) => renderTemplate`
Zur Immobiliensuche
` })} </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/services/ComingSoon.astro", void 0);

const $$Subscription = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "ComingSoon", $$ComingSoon, {})} ` })}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/subscription.astro", void 0);

const $$file = "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/subscription.astro";
const $$url = "/subscription";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Subscription,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
