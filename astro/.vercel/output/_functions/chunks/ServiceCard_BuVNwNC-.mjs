import { c as createComponent, d as createAstro, h as defineStyleVars, m as maybeRenderHead, e as addAttribute, u as unescapeHTML, a as renderTemplate } from './astro/server_lfFasKkK.mjs';
/* empty css                         */
import 'clsx';

const $$Astro = createAstro();
const $$ServiceCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ServiceCard;
  const {
    icon,
    title,
    description,
    cardBgColor,
    cardFontColor,
    cardBgHover,
    cardFontHover,
    href,
    target
  } = Astro2.props;
  const $$definedVars = defineStyleVars([{ cardBgColor, cardFontColor, cardBgHover, cardFontHover }]);
  return renderTemplate`${maybeRenderHead()}<a class="service-card slide-in-section"${addAttribute(target, "target")}${addAttribute(href, "href")} data-astro-cid-z7sd65c7${addAttribute($$definedVars, "style")}> <div class="card-icon" data-astro-cid-z7sd65c7${addAttribute($$definedVars, "style")}>${unescapeHTML(icon)}</div> <div class="card-content" data-astro-cid-z7sd65c7${addAttribute($$definedVars, "style")}> <div class="card-line" data-astro-cid-z7sd65c7${addAttribute($$definedVars, "style")}></div> <h3 class="heading-style-h5" data-astro-cid-z7sd65c7${addAttribute($$definedVars, "style")}>${title}</h3> <p class="text-s" data-astro-cid-z7sd65c7${addAttribute($$definedVars, "style")}>${description}</p> </div> </a> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Cards/ServiceCard.astro", void 0);

export { $$ServiceCard as $ };
