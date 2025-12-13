import { c as createComponent, d as createAstro, h as defineStyleVars, m as maybeRenderHead, e as addAttribute, g as renderSlot, a as renderTemplate } from './astro/server_lfFasKkK.mjs';
/* empty css                         */
import 'clsx';

const $$Astro = createAstro();
const $$HeroHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeroHeader;
  const {
    header,
    text,
    headerColor = "var(--color-brand-medium-green)",
    textColor = "var(--color-neutral-font-dark)",
    fontSizeH1 = "var(--font-size-h1)",
    fontSizeP = "var(--font-size-body-xlarge)"
  } = Astro2.props;
  const $$definedVars = defineStyleVars([{
    headerColor,
    textColor,
    fontSizeH1,
    fontSizeP
  }]);
  return renderTemplate`${maybeRenderHead()}<div class="hero-header" data-astro-cid-tslnz7pc${addAttribute($$definedVars, "style")}> <h1 class="hero-header-h1" data-astro-cid-tslnz7pc${addAttribute($$definedVars, "style")}> ${Astro2.slots.has("default") ? renderTemplate`${renderSlot($$result, $$slots["default"])}` : header} </h1> <p class="hero-header-p" data-astro-cid-tslnz7pc${addAttribute($$definedVars, "style")}>${text}</p> </div> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Base/HeroHeader.astro", void 0);

export { $$HeroHeader as $ };
