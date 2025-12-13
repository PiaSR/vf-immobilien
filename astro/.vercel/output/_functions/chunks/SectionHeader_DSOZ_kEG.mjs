import { c as createComponent, d as createAstro, h as defineStyleVars, m as maybeRenderHead, e as addAttribute, a as renderTemplate, u as unescapeHTML, r as renderComponent } from './astro/server_lfFasKkK.mjs';
/* empty css                         */
import 'clsx';

const $$Astro$1 = createAstro();
const $$SubheaderSVG = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SubheaderSVG;
  const {
    subheader = "",
    subheaderSVGColor = "var(--color-brand-light-green)",
    subheaderColor = "var(--color-brand-green)"
  } = Astro2.props;
  const $$definedVars = defineStyleVars([{ subheaderColor }]);
  return renderTemplate`${maybeRenderHead()}<div class="section-subheader" data-astro-cid-qadbnmll${addAttribute($$definedVars, "style")}> <svg width="200" height="32" viewBox="0 0 200 32" xmlns="http://www.w3.org/2000/svg"${addAttribute(subheaderColor, "fill")} data-astro-cid-qadbnmll${addAttribute($$definedVars, "style")}> <rect width="176" height="32"${addAttribute(subheaderSVGColor, "fill")} data-astro-cid-qadbnmll${addAttribute($$definedVars, "style")}></rect> <path d="M176 32V0L200 32H176Z"${addAttribute(subheaderSVGColor, "fill")} data-astro-cid-qadbnmll${addAttribute($$definedVars, "style")}></path> </svg> <span class="subheader-text" data-astro-cid-qadbnmll${addAttribute($$definedVars, "style")}>${subheader}</span> </div> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Base/SubheaderSVG.astro", void 0);

const $$Astro = createAstro();
const $$SectionHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SectionHeader;
  const {
    header,
    subheader = "",
    text,
    subheaderSVGColor = "var(--color-brand-light-green)",
    subheaderColor = "var(--color-brand-green)",
    headerColor = "var(--color-brand-medium-green)",
    textColor = "var(--color-neutral-font-dark)",
    textSize
  } = Astro2.props;
  const $$definedVars = defineStyleVars([{
    headerColor,
    textColor,
    subheaderColor,
    textSize
  }]);
  return renderTemplate`${maybeRenderHead()}<div class="section-header slide-in-section" data-astro-cid-enyejtzc${addAttribute($$definedVars, "style")}> ${subheader && renderTemplate`${renderComponent($$result, "SubheaderSVG", $$SubheaderSVG, { "class": "subheader-div", "subheader": subheader, "subheaderSVGColor": subheaderSVGColor, "subheaderColor": subheaderColor, "data-astro-cid-enyejtzc": true })}`} <h2 class="section-header-h2" data-astro-cid-enyejtzc${addAttribute($$definedVars, "style")}>${header}</h2> <p class="section-header-p" data-astro-cid-enyejtzc${addAttribute($$definedVars, "style")}>${unescapeHTML(text)}</p> </div> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Base/SectionHeader.astro", void 0);

export { $$SectionHeader as $, $$SubheaderSVG as a };
