import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DxxqT-Cc.mjs';
import { manifest } from './manifest_DdV74BRR.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/agb.astro.mjs');
const _page4 = () => import('./pages/api/contactformsend.astro.mjs');
const _page5 = () => import('./pages/api/filter-properties.astro.mjs');
const _page6 = () => import('./pages/contact.astro.mjs');
const _page7 = () => import('./pages/datenschutz.astro.mjs');
const _page8 = () => import('./pages/faqs.astro.mjs');
const _page9 = () => import('./pages/impressum.astro.mjs');
const _page10 = () => import('./pages/properties/propertysearch.astro.mjs');
const _page11 = () => import('./pages/properties/_slug_.astro.mjs');
const _page12 = () => import('./pages/services.astro.mjs');
const _page13 = () => import('./pages/subscription.astro.mjs');
const _page14 = () => import('./pages/test.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/agb.astro", _page3],
    ["src/pages/api/contactFormSend.ts", _page4],
    ["src/pages/api/filter-properties.ts", _page5],
    ["src/pages/contact.astro", _page6],
    ["src/pages/datenschutz.astro", _page7],
    ["src/pages/faqs.astro", _page8],
    ["src/pages/impressum.astro", _page9],
    ["src/pages/properties/propertySearch.astro", _page10],
    ["src/pages/properties/[slug].astro", _page11],
    ["src/pages/services.astro", _page12],
    ["src/pages/subscription.astro", _page13],
    ["src/pages/test.astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "3de9d6cd-4bd9-4fb3-a050-47a52fece25d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
