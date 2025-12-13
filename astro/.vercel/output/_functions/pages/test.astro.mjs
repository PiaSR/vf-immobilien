import { $ as $$MainLayout } from '../chunks/MainLayout_DU7Rr5R3.mjs';
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_lfFasKkK.mjs';
import 'piccolore';
export { renderers } from '../renderers.mjs';

const $$Test = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Test Page" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Test Page Loaded</h1> <p>
If this page works, the problem is in your page components (e.g., Sanity
    data fetching, or image imports).
</p> ` })}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/test.astro", void 0);

const $$file = "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/test.astro";
const $$url = "/test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Test,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
