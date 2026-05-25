import './polyfills.server.mjs';
import {
  AuthService,
  Component,
  NgZone,
  PLATFORM_ID,
  Router,
  ViewChild,
  environment,
  inject,
  isPlatformBrowser,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵqueryRefresh,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-KJMH4Q3T.mjs";
import "./chunk-T2KOBY73.mjs";

// src/app/pages/auth/auth.ts
var _c0 = ["googleBtn"];
function AuthPage_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 13);
    \u0275\u0275domElement(1, "span", 17);
    \u0275\u0275domElementStart(2, "span");
    \u0275\u0275text(3, "Signing you in\u2026");
    \u0275\u0275domElementEnd()();
  }
}
function AuthPage_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 14);
    \u0275\u0275text(1, " Google sign-in is not configured yet. Set ");
    \u0275\u0275domElementStart(2, "code");
    \u0275\u0275text(3, "googleClientId");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(4, " in ");
    \u0275\u0275domElementStart(5, "code");
    \u0275\u0275text(6, "environments/environment.ts");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(7, " and add the same client ID to the backend ");
    \u0275\u0275domElementStart(8, "code");
    \u0275\u0275text(9, ".env");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(10, ". ");
    \u0275\u0275domElementEnd();
  }
}
function AuthPage_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 15)(1, "span");
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
var AuthPage = class _AuthPage {
  auth;
  router;
  zone;
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  configured = signal(true, ...ngDevMode ? [{ debugName: "configured" }] : (
    /* istanbul ignore next */
    []
  ));
  googleBtn;
  constructor(auth, router, zone) {
    this.auth = auth;
    this.router = router;
    this.zone = zone;
    if (this.auth.isLoggedIn()) {
      this.router.navigate([this.auth.hasPreferences() ? "/dashboard" : "/preferences"]);
    }
  }
  ngAfterViewInit() {
    if (!this.isBrowser)
      return;
    if (!environment.googleClientId || environment.googleClientId.startsWith("YOUR_")) {
      this.configured.set(false);
      return;
    }
    const tryInit = () => {
      if (typeof google === "undefined" || !google?.accounts?.id) {
        setTimeout(tryInit, 200);
        return;
      }
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (resp) => this.zone.run(() => this.onCredential(resp.credential)),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      if (this.googleBtn?.nativeElement) {
        google.accounts.id.renderButton(this.googleBtn.nativeElement, {
          theme: "filled_black",
          size: "large",
          shape: "pill",
          text: "continue_with",
          logo_alignment: "left",
          width: 320
        });
      }
      google.accounts.id.prompt();
    };
    tryInit();
  }
  async onCredential(credential) {
    this.loading.set(true);
    this.error.set("");
    try {
      const user = await this.auth.signInWithGoogle(credential);
      this.router.navigate([user.preferencesSet ? "/dashboard" : "/preferences"]);
    } catch (e) {
      this.error.set(e?.message || "Sign-in failed");
    } finally {
      this.loading.set(false);
    }
  }
  static \u0275fac = function AuthPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthPage)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(NgZone));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthPage, selectors: [["app-auth"]], viewQuery: function AuthPage_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.googleBtn = _t.first);
    }
  }, decls: 26, vars: 3, consts: [["googleBtn", ""], [1, "bg-mesh", "min-h-screen", "flex", "items-center", "justify-center", "p-4", "relative", "overflow-hidden"], [1, "absolute", "top-1/4", "left-1/4", "w-80", "h-80", "bg-violet-600/10", "rounded-full", "blur-3xl", "pointer-events-none", "animate-float"], [1, "absolute", "bottom-1/4", "right-1/4", "w-64", "h-64", "bg-cyan-500/8", "rounded-full", "blur-3xl", "pointer-events-none", "animate-float", 2, "animation-delay", "-3s"], ["href", "/", 1, "absolute", "top-6", "left-6", "flex", "items-center", "gap-2", "text-slate-400", "hover:text-white", "transition-colors", "text-sm"], [1, "gradient-text", "font-semibold"], [1, "glass", "rounded-3xl", "p-8", "w-full", "max-w-md", "border", "border-white/8", "shadow-2xl", "shadow-violet-500/5", "animate-fade-in-up"], [1, "text-center", "mb-8"], [1, "text-5xl", "mb-3"], [1, "text-2xl", "font-bold", "text-white", "mb-1"], [1, "text-slate-400", "text-sm"], [1, "flex", "flex-col", "items-center", "gap-4"], [1, "flex", "justify-center", "min-h-[44px]"], [1, "flex", "items-center", "gap-2", "text-slate-300", "text-sm"], [1, "text-amber-300", "text-xs", "bg-amber-500/10", "border", "border-amber-500/20", "rounded-xl", "px-4", "py-3", "leading-relaxed"], [1, "flex", "items-center", "gap-2", "text-red-400", "text-sm", "bg-red-500/10", "border", "border-red-500/20", "rounded-xl", "px-4", "py-3", "w-full"], [1, "text-center", "text-xs", "text-slate-500", "mt-8", "leading-relaxed"], [1, "inline-block", "w-4", "h-4", "border-2", "border-white/30", "border-t-white", "rounded-full", "animate-spin"]], template: function AuthPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 1);
      \u0275\u0275domElement(1, "div", 2)(2, "div", 3);
      \u0275\u0275domElementStart(3, "a", 4)(4, "span");
      \u0275\u0275text(5, "\u2190");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "span", 5);
      \u0275\u0275text(7, "\u{1F4CD} KYL");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "div", 6)(9, "div", 7)(10, "div", 8);
      \u0275\u0275text(11, "\u{1F4CD}");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "h1", 9);
      \u0275\u0275text(13, "Welcome to KYL");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "p", 10);
      \u0275\u0275text(15, "Find people nearby who share your vibe.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(16, "div", 11);
      \u0275\u0275domElement(17, "div", 12, 0);
      \u0275\u0275conditionalCreate(19, AuthPage_Conditional_19_Template, 4, 0, "div", 13);
      \u0275\u0275conditionalCreate(20, AuthPage_Conditional_20_Template, 11, 0, "div", 14);
      \u0275\u0275conditionalCreate(21, AuthPage_Conditional_21_Template, 5, 1, "div", 15);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(22, "p", 16);
      \u0275\u0275text(23, " By continuing, you agree to share your name, email, and profile picture from Google.");
      \u0275\u0275domElement(24, "br");
      \u0275\u0275text(25, " We never post on your behalf. ");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(19);
      \u0275\u0275conditional(ctx.loading() ? 19 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.configured() ? 20 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 21 : -1);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthPage, [{
    type: Component,
    args: [{ selector: "app-auth", imports: [], template: '<div class="bg-mesh min-h-screen flex items-center justify-center p-4 relative overflow-hidden">\n  <div class="absolute top-1/4 left-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none animate-float"></div>\n  <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none animate-float" style="animation-delay:-3s"></div>\n\n  <a href="/" class="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">\n    <span>\u2190</span> <span class="gradient-text font-semibold">\u{1F4CD} KYL</span>\n  </a>\n\n  <div class="glass rounded-3xl p-8 w-full max-w-md border border-white/8 shadow-2xl shadow-violet-500/5 animate-fade-in-up">\n    <div class="text-center mb-8">\n      <div class="text-5xl mb-3">\u{1F4CD}</div>\n      <h1 class="text-2xl font-bold text-white mb-1">Welcome to KYL</h1>\n      <p class="text-slate-400 text-sm">Find people nearby who share your vibe.</p>\n    </div>\n\n    <div class="flex flex-col items-center gap-4">\n      <div #googleBtn class="flex justify-center min-h-[44px]"></div>\n\n      @if (loading()) {\n        <div class="flex items-center gap-2 text-slate-300 text-sm">\n          <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>\n          <span>Signing you in\u2026</span>\n        </div>\n      }\n\n      @if (!configured()) {\n        <div class="text-amber-300 text-xs bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 leading-relaxed">\n          Google sign-in is not configured yet. Set <code>googleClientId</code> in\n          <code>environments/environment.ts</code> and add the same client ID to the backend\n          <code>.env</code>.\n        </div>\n      }\n\n      @if (error()) {\n        <div class="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 w-full">\n          <span>\u26A0\uFE0F</span> <span>{{ error() }}</span>\n        </div>\n      }\n    </div>\n\n    <p class="text-center text-xs text-slate-500 mt-8 leading-relaxed">\n      By continuing, you agree to share your name, email, and profile picture from Google.<br>\n      We never post on your behalf.\n    </p>\n  </div>\n</div>\n' }]
  }], () => [{ type: AuthService }, { type: Router }, { type: NgZone }], { googleBtn: [{
    type: ViewChild,
    args: ["googleBtn", { static: false }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthPage, { className: "AuthPage", filePath: "src/app/pages/auth/auth.ts", lineNumber: 14 });
})();
export {
  AuthPage
};
//# sourceMappingURL=chunk-XQ24HOMA.mjs.map
