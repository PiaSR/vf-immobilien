import { c as createSvgComponent, $ as $$MainLayout } from '../chunks/MainLayout_DU7Rr5R3.mjs';
import { c as createComponent, m as maybeRenderHead, r as renderComponent, b as renderScript, a as renderTemplate, d as createAstro, e as addAttribute } from '../chunks/astro/server_lfFasKkK.mjs';
import 'piccolore';
import { $ as $$CTAServicesSection } from '../chunks/CTAServicesSection_AH1FUqs1.mjs';
import { $ as $$ButtonArrow } from '../chunks/ButtonArrow_C6883PUt.mjs';
/* empty css                                   */
import { $ as $$HeroHeader } from '../chunks/HeroHeader_CLQrIJ7L.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_B2RpSsLg.mjs';
import { s as sanityClient } from '../chunks/sanityClient_DUM2tGat.mjs';
export { renderers } from '../renderers.mjs';

const $$ContactForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="contact-form-section" class="contact-section" data-astro-cid-4nrac7gn> <div class="site-container padding-section" data-astro-cid-4nrac7gn> <div class="contact-card-wrapper" data-astro-cid-4nrac7gn> <div class="section-header-wrapper" data-astro-cid-4nrac7gn> <h2 class="heading-h2" data-astro-cid-4nrac7gn>Kontaktieren Sie uns</h2> <p class="text-description" data-astro-cid-4nrac7gn>
Für Anfragen, Informationen oder Terminvereinbarungen – wir stehen
          Ihnen gerne zur Verfügung.
</p> </div> <div class="contact-form-container" data-astro-cid-4nrac7gn> <form id="contact-form" name="contact-form" data-name="contact form" method="POST" action="/api/contactFormSend" novalidate data-astro-cid-4nrac7gn> <div class="form-grid-2-col" data-astro-cid-4nrac7gn> <div class="form-field-group" data-astro-cid-4nrac7gn> <label for="first-name" data-astro-cid-4nrac7gn>Vorname</label> <input class="form-input" maxlength="256" name="first-name" placeholder="" type="text" id="first-name" required data-astro-cid-4nrac7gn> <span id="error-first-name" class="input-error-message" data-astro-cid-4nrac7gn></span> </div> <div class="form-field-group" data-astro-cid-4nrac7gn> <label for="last-name" data-astro-cid-4nrac7gn>Nachname</label> <input class="form-input" maxlength="256" name="last-name" placeholder="" type="text" id="last-name" required data-astro-cid-4nrac7gn> <span id="error-last-name" class="input-error-message" data-astro-cid-4nrac7gn></span> </div> </div> <div class="padding-bottom padding-small" data-astro-cid-4nrac7gn></div> <div class="form-field-group" data-astro-cid-4nrac7gn> <label for="email" data-astro-cid-4nrac7gn>Email</label> <input class="form-input" maxlength="256" name="email" placeholder="" type="email" id="email" required data-astro-cid-4nrac7gn> <span id="error-email" class="input-error-message" data-astro-cid-4nrac7gn></span> </div> <div class="form-field-group" data-astro-cid-4nrac7gn> <label for="phone" data-astro-cid-4nrac7gn>Telefonnummer</label> <input class="form-input" maxlength="256" name="phone" placeholder="" type="tel" id="phone" required data-astro-cid-4nrac7gn> <span id="error-phone" class="input-error-message" data-astro-cid-4nrac7gn></span> </div> <div class="padding-bottom padding-small" data-astro-cid-4nrac7gn></div> <div class="form-field-group" data-astro-cid-4nrac7gn> <label for="message" data-astro-cid-4nrac7gn>Ihre Nachricht</label> <textarea id="message" name="message" maxlength="5000" placeholder="" class="form-textarea" required data-astro-cid-4nrac7gn></textarea> <span id="error-message" class="input-error-message" data-astro-cid-4nrac7gn></span> </div> <div class="padding-bottom padding-medium" data-astro-cid-4nrac7gn></div> <label class="form-checkbox-label" data-astro-cid-4nrac7gn> <input type="checkbox" name="TandCs" id="TandCs" data-name="TandCs" required data-astro-cid-4nrac7gn> <span class="checkbox-custom-indicator" data-astro-cid-4nrac7gn></span> <span class="checkbox-text" for="TandCs" data-astro-cid-4nrac7gn>Ich habe die <a href="/agb" data-astro-cid-4nrac7gn>AGB</a> und <a href="/datenschutz" data-astro-cid-4nrac7gn>Datenschutzbestimmungen</a> gelesen und erkläre mich damit einverstanden.</span> </label> <div class="checkbox-error-wrapper" data-astro-cid-4nrac7gn> <span id="error-TandCs" class="input-error-message" data-astro-cid-4nrac7gn></span> </div> ${renderComponent($$result, "ButtonArrow", $$ButtonArrow, { "type": "submit", "class": "button-orange", "data-astro-cid-4nrac7gn": true }, { "default": async ($$result2) => renderTemplate`
Anfrage absenden
` })} </form> <div id="form-success" class="form-success-message" data-astro-cid-4nrac7gn> <div data-astro-cid-4nrac7gn>
Danke für Ihre Anfrage! Unser Team wird sich bald bei Ihnen melden.
</div> </div> <div id="form-error" class="form-error-message" data-astro-cid-4nrac7gn> <div data-astro-cid-4nrac7gn>
Beim Absenden des Formulars ist ein Fehler aufgetreten. Bitte
            versuchen Sie es erneut.
</div> </div> </div> </div> </div> </section>  ${renderScript($$result, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/contact/ContactForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/contact/ContactForm.astro", void 0);

const $$ContactHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="about-hero" class="hero" data-astro-cid-oua53shv> <div class="site-container hero-grid-content padding-section" data-astro-cid-oua53shv> <div class="container-align-left" data-astro-cid-oua53shv> ${renderComponent($$result, "HeroHeader", $$HeroHeader, { "header": "Jederzeit f\xFCr Sie da.", "text": "Wir freuen uns, von Ihnen zu h\xF6ren.", "headerColor": "var(--color-neutral-white)", "textColor": "var(--color-neutral-white)", "data-astro-cid-oua53shv": true })} </div> </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/contact/ContactHero.astro", void 0);

const emailIcon = createSvgComponent({"meta":{"src":"/_astro/email-icon-1.DVQ7UITX.svg","width":18,"height":16,"format":"svg"},"attributes":{"width":"18","height":"16","fill":"none"},"children":"<path stroke=\"#fff\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M17.333 3c0-.917-.75-1.667-1.667-1.667H2.333C1.416 1.333.666 2.083.666 3m16.667 0v10c0 .917-.75 1.667-1.667 1.667H2.333c-.917 0-1.667-.75-1.667-1.667V3m16.667 0L8.999 8.834.666 3\" />"});

const phoneIcon = createSvgComponent({"meta":{"src":"/_astro/phone-icon-1.g-I07rv6.svg","width":19,"height":19,"format":"svg"},"attributes":{"width":"19","height":"19","fill":"none"},"children":"<path stroke=\"#fff\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M11.541 4.167a4.166 4.166 0 0 1 3.292 3.292M11.541.832a7.5 7.5 0 0 1 6.625 6.617m-.833 6.65v2.5a1.667 1.667 0 0 1-1.816 1.667 16.492 16.492 0 0 1-7.192-2.558 16.25 16.25 0 0 1-5-5A16.492 16.492 0 0 1 .767 3.483a1.667 1.667 0 0 1 1.658-1.816h2.5A1.667 1.667 0 0 1 6.592 3.1c.105.8.3 1.586.583 2.342A1.667 1.667 0 0 1 6.8 7.2L5.742 8.258a13.333 13.333 0 0 0 5 5L11.8 12.2a1.666 1.666 0 0 1 1.758-.375 10.7 10.7 0 0 0 2.342.584 1.666 1.666 0 0 1 1.433 1.691Z\" />"});

const locationIcon = createSvgComponent({"meta":{"src":"/_astro/location-icon-1.DTNUnAc6.svg","width":16,"height":20,"format":"svg"},"attributes":{"width":"16","height":"20","fill":"none"},"children":"<path stroke=\"#fff\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15.5 8.334c0 5.833-7.5 10.833-7.5 10.833s-7.5-5-7.5-10.834a7.5 7.5 0 0 1 15 0Z\" /><path stroke=\"#fff\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8 10.834a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z\" />"});

const clockIcon = createSvgComponent({"meta":{"src":"/_astro/time-clock-1.S_k1d-TI.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","fill":"none"},"children":"<path fill=\"#fff\" d=\"m15.96 17.64 1.68-1.68-4.44-4.44V6h-2.4v6.48l5.16 5.16ZM12 24c-1.66 0-3.22-.315-4.68-.945a12.118 12.118 0 0 1-3.81-2.565 12.118 12.118 0 0 1-2.565-3.81C.315 15.22 0 13.66 0 12c0-1.66.315-3.22.945-4.68.63-1.46 1.485-2.73 2.565-3.81A12.118 12.118 0 0 1 7.32.945C8.78.315 10.34 0 12 0c1.66 0 3.22.315 4.68.945 1.46.63 2.73 1.485 3.81 2.565a12.118 12.118 0 0 1 2.565 3.81c.63 1.46.945 3.02.945 4.68 0 1.66-.315 3.22-.945 4.68a12.118 12.118 0 0 1-2.565 3.81 12.118 12.118 0 0 1-3.81 2.565c-1.46.63-3.02.945-4.68.945Zm0-2.4c2.66 0 4.925-.935 6.795-2.805S21.6 14.66 21.6 12s-.935-4.925-2.805-6.795S14.66 2.4 12 2.4s-4.925.935-6.795 2.805S2.4 9.34 2.4 12s.935 4.925 2.805 6.795S9.34 21.6 12 21.6Z\" />"});

const $$Astro = createAstro();
const $$ContactOfficeInfo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContactOfficeInfo;
  const officeDetailsQuery = `
  *[_type == "officeDetails"][0] {
    email,
    phone,
    streetAddress,
    cityPostal,
    additionalInfo,
    officeHours[] {
      days,
      time
    }
  }
`;
  const officeDetails = await sanityClient.fetch(officeDetailsQuery);
  const fallback = {
    email: "office@yourdomain.at",
    phone: "+43 1 123 45 67",
    streetAddress: "Hauptstra\xDFe 10",
    cityPostal: "1140 Wien, \xD6sterreich",
    additionalInfo: "Termin nach telefonischer Vereinbarung erbeten.",
    officeHours: [
      { days: "Montag - Donnerstag", time: "9:00 - 16:00" },
      { days: "Freitag", time: "9:00 - 12:00" }
    ]
  };
  const data = officeDetails || fallback;
  const rawAddress = `${data.streetAddress}, ${data.cityPostal}`;
  const mapAddress = encodeURIComponent(rawAddress);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapAddress}`;
  const cleanPhoneNumber = data.phone.replace(/[\s\-\(\)]/g, "");
  return renderTemplate`${maybeRenderHead()}<section id="contact-details-section" class="details-section slide-in-section" data-astro-cid-gs74fodm> <div class="site-container padding-section" data-astro-cid-gs74fodm> <div class="details-content-wrapper" data-astro-cid-gs74fodm> <div class="map-embed-container" data-astro-cid-gs74fodm> <iframe${addAttribute(`https://maps.google.com/maps?q=${mapAddress}&output=embed`, "src")}${addAttribute(`Google Maps location for ${rawAddress}`, "title")} style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-astro-cid-gs74fodm></iframe> </div> <div class="details-card" data-astro-cid-gs74fodm> <div class="details-header-wrapper" data-astro-cid-gs74fodm> <h3 class="heading-h3" data-astro-cid-gs74fodm>Hier sind wir zuhause.</h3> <div class="padding-bottom padding-small" data-astro-cid-gs74fodm></div> <p class="details-subheader" data-astro-cid-gs74fodm>
Unser Büro im Westen Wiens – leicht zu finden und immer offen für
            ein persönliches Gespräch rund um Ihre Immobilie.
</p> <div class="padding-bottom padding-medium" data-astro-cid-gs74fodm></div> </div> <div class="contact-items-list" data-astro-cid-gs74fodm> <div class="contact-item" data-astro-cid-gs74fodm> ${renderComponent($$result, "Image", $$Image, { "src": emailIcon, "loading": "lazy", "alt": "Email Icon", "class": "item-icon", "data-astro-cid-gs74fodm": true })} <div class="contact-item-text" data-astro-cid-gs74fodm> <a${addAttribute(`mailto:${data.email}`, "href")} data-astro-cid-gs74fodm> <p data-astro-cid-gs74fodm>${data.email}</p> </a> </div> </div> <div class="contact-item" data-astro-cid-gs74fodm> ${renderComponent($$result, "Image", $$Image, { "src": phoneIcon, "loading": "lazy", "alt": "Phone Icon", "class": "item-icon", "data-astro-cid-gs74fodm": true })} <div class="contact-item-text" data-astro-cid-gs74fodm> <a${addAttribute(`tel:${cleanPhoneNumber}`, "href")} data-astro-cid-gs74fodm> <p data-astro-cid-gs74fodm>${data.phone}</p> </a> </div> </div> <div class="contact-item" data-astro-cid-gs74fodm> ${renderComponent($$result, "Image", $$Image, { "src": locationIcon, "loading": "lazy", "alt": "Location Icon", "class": "item-icon", "data-astro-cid-gs74fodm": true })} <div class="contact-item-text" data-astro-cid-gs74fodm> <a${addAttribute(googleMapsUrl, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-gs74fodm> <p data-astro-cid-gs74fodm>${data.streetAddress}</p> <p data-astro-cid-gs74fodm>${data.cityPostal}</p> </a> </div> </div> <div class="contact-item contact-item-hours" data-astro-cid-gs74fodm> ${renderComponent($$result, "Image", $$Image, { "src": clockIcon, "loading": "lazy", "alt": "Time Clock Icon", "class": "item-icon", "data-astro-cid-gs74fodm": true })} <div class="contact-item-text" data-astro-cid-gs74fodm> ${data.officeHours.map((hours) => renderTemplate`<p data-astro-cid-gs74fodm> ${hours.days}: ${hours.time} </p>`)} ${data.additionalInfo && renderTemplate`<div class="notice-text" data-astro-cid-gs74fodm>${data.additionalInfo}</div>`} </div> </div> </div> </div> </div> </div> </section> `;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/components/Sections/contact/ContactOfficeInfo.astro", void 0);

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContactHero", $$ContactHero, {})} ${renderComponent($$result2, "ContactForm", $$ContactForm, {})} ${renderComponent($$result2, "ContactOfficeInfo", $$ContactOfficeInfo, {})} ${renderComponent($$result2, "CTAServicesSection", $$CTAServicesSection, {})} ` })}`;
}, "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/contact.astro", void 0);

const $$file = "/Users/piasmith-richling/Code/VF Immobilien/astro/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
