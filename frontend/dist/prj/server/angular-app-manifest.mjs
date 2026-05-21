
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-QXQ66T6T.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2MTFI6VT.js"
    ],
    "route": "/auth"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RSEFURHJ.js",
      "chunk-64IOHUT2.js"
    ],
    "route": "/preferences"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XX3KB4KK.js",
      "chunk-64IOHUT2.js"
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
    'index.csr.html': {size: 667, hash: 'a6cd6eb22e3de1d2ab5f49de3ade7ef4bdd7776520e80faec5dc031fd5f0083a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1207, hash: '30add43c29423c85017d01fab280a3457378c039abe9148e7879c427d89cdd47', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 237, hash: 'aaaf1e9c33387caae270f427ed4e16fa371c84718fab174b7ab8a5a68f7bab58', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 2498, hash: 'd2a60afe19f5c41e7bfebc1fdfe71b9462a4a45f0a8ec599e09dbfc687188d0a', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'index.html': {size: 11439, hash: '0696153293f77d94f8ec019a3a5d187da8bd8797a248533cf1679c3aec5e81d1', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'preferences/index.html': {size: 237, hash: 'aaaf1e9c33387caae270f427ed4e16fa371c84718fab174b7ab8a5a68f7bab58', text: () => import('./assets-chunks/preferences_index_html.mjs').then(m => m.default)}
  },
};
