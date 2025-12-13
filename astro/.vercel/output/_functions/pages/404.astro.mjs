import { $ as $$MainLayout } from '../chunks/MainLayout_DU7Rr5R3.mjs';
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_lfFasKkK.mjs';
import 'piccolore';
import { $ as $$Button } from '../chunks/Button_CJOdNCUC.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "404 - Seite nicht gefunden", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="error-page-content" style="text-align: center; padding: 4rem;" data-astro-cid-zetdm5md> <h1 data-astro-cid-zetdm5md>404</h1> <h2 data-astro-cid-zetdm5md>Seite nicht gefunden.</h2> <p data-astro-cid-zetdm5md>
Tut uns Leid, die von Ihnen gesuchte Seite existiert nicht oder wurde
      verschoben.
</p> ${renderComponent($$result2, "Button", $$Button, { "class": "button-element button-orange", "href": "/", "data-astro-cid-zetdm5md": true }, { "default": ($$result3) => renderTemplate`
Zur Startseite
` })} </main> ` })} `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/404.astro", void 0);

const $$file = "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
