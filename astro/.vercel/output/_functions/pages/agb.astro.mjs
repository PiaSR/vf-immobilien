import { $ as $$MainLayout } from '../chunks/MainLayout_DU7Rr5R3.mjs';
import { c as createComponent, m as maybeRenderHead, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_lfFasKkK.mjs';
import 'piccolore';
import 'clsx';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$AGBText = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="data-protection" data-astro-cid-lsdtcmki> <div class="site-container padding-section" data-astro-cid-lsdtcmki> <h1 data-astro-cid-lsdtcmki>
All&shy;ge&shy;mei&shy;ne Ge&shy;schäfts&shy;be&shy;ding&shy;ung&shy;en
      (AGB)
</h1> <p data-astro-cid-lsdtcmki>
VF Immobilien – Viktoria Frohner Immobilien GmbH<br data-astro-cid-lsdtcmki>
Stand: <strong data-astro-cid-lsdtcmki>Dezember 2025</strong> </p> <h2 data-astro-cid-lsdtcmki>1. Geltungsbereich</h2> <p data-astro-cid-lsdtcmki>Diese AGB gelten für sämtliche Dienstleistungen der VF Immobilien.</p> <h2 data-astro-cid-lsdtcmki>2. Leistungen und Vertragsabschluss</h2> <p data-astro-cid-lsdtcmki>VF Immobilien erbringt insbesondere:</p> <ul data-astro-cid-lsdtcmki> <li data-astro-cid-lsdtcmki>Vermittlung von Kauf-, Miet- und Pachtverträgen</li> <li data-astro-cid-lsdtcmki>Objektberatung und -bewertung</li> <li data-astro-cid-lsdtcmki>Hausverwaltung</li> </ul> <p data-astro-cid-lsdtcmki>Ein Vertrag kommt durch schriftliche Auftragserteilung zustande.</p> <h2 data-astro-cid-lsdtcmki>3. Maklerrechtliche Hinweise</h2> <p data-astro-cid-lsdtcmki>
VF Immobilien kann als Doppelmakler tätig sein.<br data-astro-cid-lsdtcmki>
Ein wirtschaftliches Naheverhältnis wird offengelegt.<br data-astro-cid-lsdtcmki>
Alle gesetzlichen Informationspflichten werden erfüllt.
</p> <h2 data-astro-cid-lsdtcmki>4. Pflichten des Kunden</h2> <p data-astro-cid-lsdtcmki>
Der Kunde stellt vollständige und richtige Unterlagen bereit.<br data-astro-cid-lsdtcmki>
Vorkenntnisse sind binnen drei Werktagen mitzuteilen.
</p> <h2 data-astro-cid-lsdtcmki>5. Provision / Entgelt</h2> <p data-astro-cid-lsdtcmki>
Der Provisionsanspruch entsteht mit Zustandekommen des Hauptvertrags.<br data-astro-cid-lsdtcmki>
Fälligkeit: 14 Tage ab Rechnungslegung.
</p> <h2 data-astro-cid-lsdtcmki>6. Haftung</h2> <p data-astro-cid-lsdtcmki>
Haftung besteht nur für Vorsatz und grobe Fahrlässigkeit.<br data-astro-cid-lsdtcmki>
Personenschäden sind ausgenommen.
</p> <h2 data-astro-cid-lsdtcmki>7. Datenschutz</h2> <p data-astro-cid-lsdtcmki>
Die Verarbeitung erfolgt gemäß Datenschutzerklärung unter <a href="https://www.vf-immobilien.at/datenschutz" data-astro-cid-lsdtcmki>www.vf-immobilien.at/datenschutz</a>.
</p> <h2 data-astro-cid-lsdtcmki>8. Gerichtsstand / Recht</h2> <p data-astro-cid-lsdtcmki>
Es gilt österreichisches Recht.<br data-astro-cid-lsdtcmki>
Gerichtsstand: Wien, soweit zulässig.
</p> <h2 data-astro-cid-lsdtcmki>9. Salvatorische Klausel</h2> <p data-astro-cid-lsdtcmki>Unwirksame Bestimmungen berühren den Vertrag im Übrigen nicht.</p> </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Legal/AGBText.astro", void 0);

const $$Agb = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AGBText", $$AGBText, {})} ` })}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/agb.astro", void 0);

const $$file = "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/agb.astro";
const $$url = "/agb";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Agb,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
