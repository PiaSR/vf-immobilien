import { c as createComponent, d as createAstro, r as renderComponent, a as renderTemplate, g as renderSlot } from './astro/server_lfFasKkK.mjs';
import 'piccolore';

const $$Astro = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const { href, type, disabled, class: className, ...rest } = Astro2.props;
  const Tag = href ? "a" : "button";
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { ...rest, "href": href, "class:list": [className, "button-element"], "type": type, "disabled": disabled }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Base/Button.astro", void 0);

export { $$Button as $ };
