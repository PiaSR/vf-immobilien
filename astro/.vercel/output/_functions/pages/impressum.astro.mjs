import { $ as $$MainLayout } from '../chunks/MainLayout_DU7Rr5R3.mjs';
import { c as createComponent, m as maybeRenderHead, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_lfFasKkK.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$ImpressumText = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-eq3zufib> <div class="site-container padding-section" data-astro-cid-eq3zufib> <h1 data-astro-cid-eq3zufib>Impressum</h1> <h2 data-astro-cid-eq3zufib>Kontakt & Unternehmensdaten</h2> <div class="contact-box" data-astro-cid-eq3zufib> <p data-astro-cid-eq3zufib><strong data-astro-cid-eq3zufib>VF Immobilien</strong></p> <p data-astro-cid-eq3zufib>Viktoria Frohner Immobilien GmbH</p> <p data-astro-cid-eq3zufib>Auhofstraße 78C/1</p> <p data-astro-cid-eq3zufib>1130 Wien</p> <p data-astro-cid-eq3zufib>Tel: +43 676 442 30 32</p> <p data-astro-cid-eq3zufib>
E-Mail: <a href="mailto:office@vf-immobilien.at" data-astro-cid-eq3zufib>office@vf-immobilien.at</a> </p> <p data-astro-cid-eq3zufib>
Web: <a href="https://www.vf-immobilien.at" data-astro-cid-eq3zufib>www.vf-immobilien.at</a> </p> </div> <h2 data-astro-cid-eq3zufib>Unternehmensdetails</h2> <p data-astro-cid-eq3zufib> <strong data-astro-cid-eq3zufib>Geschäftsführung:</strong> Viktoria Frohner<br data-astro-cid-eq3zufib> <strong data-astro-cid-eq3zufib>Rechtsform:</strong> GmbH
</p> <p data-astro-cid-eq3zufib> <strong data-astro-cid-eq3zufib>Firmenbuchnummer:</strong> FN 614524 m<br data-astro-cid-eq3zufib> <strong data-astro-cid-eq3zufib>Firmenbuchgericht:</strong> Handelsgericht Wien<br data-astro-cid-eq3zufib> <strong data-astro-cid-eq3zufib>UID-Nummer:</strong> ATU 80178558
</p> <h2 data-astro-cid-eq3zufib>Gewerbeberechtigungen</h2> <ul data-astro-cid-eq3zufib> <li data-astro-cid-eq3zufib>
Immobilientreuhänder (Immobilienmakler, Immobilienverwalter, Bauträger),
        eingeschränkt auf Immobilienmakler und
</li> <li data-astro-cid-eq3zufib>Namhaftmachung gem. GewO</li> </ul> <h2 data-astro-cid-eq3zufib>Zuständigkeiten & Mitgliedschaften</h2> <p data-astro-cid-eq3zufib> <strong data-astro-cid-eq3zufib>Zuständige Aufsichtsbehörde:</strong> Magistratisches Bezirksamt /
      MA 63
</p> <p data-astro-cid-eq3zufib> <strong data-astro-cid-eq3zufib>Mitgliedschaften:</strong> WKO Wien – Fachgruppe Immobilien- und
      Vermögenstreuhänder
</p> <h2 data-astro-cid-eq3zufib>Rechtliches</h2> <p data-astro-cid-eq3zufib> <strong data-astro-cid-eq3zufib>Rechtsgrundlagen:</strong><br data-astro-cid-eq3zufib>
GewO, MaklerG, ECG, KSchG (<a href="http://www.ris.bka.gv.at" target="_blank" data-astro-cid-eq3zufib>www.ris.bka.gv.at</a>)
</p> <h2 data-astro-cid-eq3zufib>Grundlegende Richtung der Website</h2> <p data-astro-cid-eq3zufib>Information zu Dienstleistungen und Angeboten der VF Immobilien.</p> <h2 data-astro-cid-eq3zufib>Verbraucherschlichtung</h2> <p data-astro-cid-eq3zufib>VF Immobilien nimmt nicht an Streitbeilegungsverfahren teil.</p> <h2 data-astro-cid-eq3zufib>Urheberrecht</h2> <p data-astro-cid-eq3zufib>
Sämtliche Inhalte unterliegen dem Urheberrecht. Nutzung nur mit
      Zustimmung.
</p> </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Legal/ImpressumText.astro", void 0);

const $$Impressum = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ImpressumText", $$ImpressumText, {})} ` })}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/impressum.astro", void 0);

const $$file = "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/impressum.astro";
const $$url = "/impressum";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Impressum,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
