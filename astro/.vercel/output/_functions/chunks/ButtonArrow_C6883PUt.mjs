import { c as createComponent, d as createAstro, r as renderComponent, a as renderTemplate, g as renderSlot, m as maybeRenderHead } from './astro/server_lfFasKkK.mjs';
import 'piccolore';

const $$Astro = createAstro();
const $$ButtonArrow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ButtonArrow;
  const { href, class: className, ...rest } = Astro2.props;
  const Tag = href ? "a" : "button";
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { ...rest, "href": href, "class:list": [className, "button-element"] }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])}${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" width="16" height="16"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"></path></svg> ` })}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Base/ButtonArrow.astro", void 0);

export { $$ButtonArrow as $ };
