
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZAF6SE45.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-3N4SXRVB.js",
      "chunk-LJNUYHUS.js"
    ],
    "route": "/auth"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-Q2ZFKXE4.js",
      "chunk-ZO5VZAFG.js",
      "chunk-LJNUYHUS.js"
    ],
    "route": "/preferences"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WZWJ2UFE.js",
      "chunk-ZO5VZAFG.js",
      "chunk-LJNUYHUS.js"
    ],
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24823, hash: 'dc2d33cb31887b36019d0453cbea8d2978e77a64ac6d06b7c293abafef3ed835', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1090, hash: '0237dc5fe41896460a9e826d1dfc68a3e2c361e0b10c83358c8436fa4c8979a3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'preferences/index.html': {size: 237, hash: 'aaaf1e9c33387caae270f427ed4e16fa371c84718fab174b7ab8a5a68f7bab58', text: () => import('./assets-chunks/preferences_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 237, hash: 'aaaf1e9c33387caae270f427ed4e16fa371c84718fab174b7ab8a5a68f7bab58', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'index.html': {size: 49520, hash: '337cd26dece8a867f5671b8867ae69bf10f6a63d1029179c4a99bef1a1a895b0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 36698, hash: '1f9ae2415e5cb24e3df58e246efcb7c16ff35523daec5a0f44616a719ea88b85', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'styles-3NWODXVN.css': {size: 70851, hash: 't3iVltpaSSI', text: () => import('./assets-chunks/styles-3NWODXVN_css.mjs').then(m => m.default)}
  },
};
