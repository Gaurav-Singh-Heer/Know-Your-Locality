import {
  AuthService,
  Component,
  Router,
  RouterOutlet,
  __spreadValues,
  bootstrapApplication,
  inject,
  provideBrowserGlobalErrorListeners,
  provideClientHydration,
  provideRouter,
  setClassMetadata,
  withEventReplay,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-HQSMC4LD.js";

// src/app/guards/auth.guard.ts
var authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn())
    return true;
  return router.createUrlTree(["/auth"]);
};
var preferencesGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn())
    return router.createUrlTree(["/auth"]);
  if (!auth.hasPreferences())
    return router.createUrlTree(["/preferences"]);
  return true;
};

// src/app/app.routes.ts
var routes = [
  __spreadValues({ path: "", loadComponent: () => import("./chunk-QXQ66T6T.js").then((m) => m.LandingPage) }, false ? { \u0275entryName: "src/app/pages/landing/landing.ts" } : {}),
  __spreadValues({ path: "auth", loadComponent: () => import("./chunk-2MTFI6VT.js").then((m) => m.AuthPage) }, false ? { \u0275entryName: "src/app/pages/auth/auth.ts" } : {}),
  __spreadValues({ path: "preferences", loadComponent: () => import("./chunk-RSEFURHJ.js").then((m) => m.PreferencesPage), canActivate: [authGuard] }, false ? { \u0275entryName: "src/app/pages/preferences/preferences.ts" } : {}),
  __spreadValues({ path: "dashboard", loadComponent: () => import("./chunk-XX3KB4KK.js").then((m) => m.DashboardPage), canActivate: [preferencesGuard] }, false ? { \u0275entryName: "src/app/pages/dashboard/dashboard.ts" } : {}),
  { path: "**", redirectTo: "" }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay())
  ]
};

// src/app/app.ts
var App = class _App {
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 1, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n}\n/*# sourceMappingURL=app.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet], template: "<router-outlet />", styles: ["/* angular:styles/component:css;b12e85be7d455115f6d554170e92b6088ef37ef9bf708b0eae91cd65079b1ecd;/Users/gauravsinghheer/Library/CloudStorage/OneDrive-FICO/Desktop/prj/frontend/src/app/app.ts */\n:host {\n  display: block;\n  min-height: 100vh;\n}\n/*# sourceMappingURL=app.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 10 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
