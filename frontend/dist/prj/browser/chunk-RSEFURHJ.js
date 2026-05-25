import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-64IOHUT2.js";
import {
  AuthService,
  Component,
  Injectable,
  PLATFORM_ID,
  Router,
  __spreadValues,
  computed,
  environment,
  inject,
  isPlatformBrowser,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-HQSMC4LD.js";

// src/app/services/geolocation.service.ts
var GeolocationService = class _GeolocationService {
  _platformId = inject(PLATFORM_ID);
  _isBrowser = isPlatformBrowser(this._platformId);
  coords = signal(null, ...ngDevMode ? [{ debugName: "coords" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  status = signal("idle", ...ngDevMode ? [{ debugName: "status" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Per-mode caps. Source of truth = environment.distanceCaps. */
  caps = environment.distanceCaps;
  capFor(mode) {
    return this.caps[mode];
  }
  /** Clamp a desired distance to the cap for the given mode. */
  clamp(mode, km) {
    const cap = this.capFor(mode);
    if (Number.isNaN(km))
      return cap;
    return Math.min(Math.max(1, Math.round(km)), cap);
  }
  /** Ask the browser for location. Resolves to coords or null. */
  async request() {
    if (!this._isBrowser || !("geolocation" in navigator)) {
      this.status.set("unavailable");
      this.error.set("Geolocation is not available.");
      return null;
    }
    this.status.set("requesting");
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const c = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        };
        this.coords.set(c);
        this.status.set("granted");
        this.error.set(null);
        resolve(c);
      }, (err) => {
        this.status.set(err.code === err.PERMISSION_DENIED ? "denied" : "unavailable");
        this.error.set(err.message);
        resolve(null);
      }, { enableHighAccuracy: true, timeout: 1e4, maximumAge: 6e4 });
    });
  }
  static \u0275fac = function GeolocationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GeolocationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GeolocationService, factory: _GeolocationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GeolocationService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/pages/preferences/preferences.ts
var _c0 = () => [1, 2, 3];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.mode;
function PreferencesPage_For_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2713 ");
  }
}
function PreferencesPage_For_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", s_r1, " ");
  }
}
function PreferencesPage_For_10_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 16);
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(s_r1 < ctx_r1.step() ? "bg-gradient-to-r from-violet-500 to-cyan-500" : "bg-white/10");
  }
}
function PreferencesPage_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 14);
    \u0275\u0275conditionalCreate(2, PreferencesPage_For_10_Conditional_2_Template, 1, 0)(3, PreferencesPage_For_10_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, PreferencesPage_For_10_Conditional_4_Template, 1, 2, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(s_r1 <= ctx_r1.step() ? "bg-gradient-to-br from-violet-600 to-cyan-500 text-white" : "bg-white/8 text-slate-500");
    \u0275\u0275advance();
    \u0275\u0275conditional(s_r1 < ctx_r1.step() ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(s_r1 < 3 ? 4 : -1);
  }
}
function PreferencesPage_Conditional_12_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "Detecting your location\u2026");
    \u0275\u0275elementEnd();
  }
}
function PreferencesPage_Conditional_12_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "Location detected \u2713");
    \u0275\u0275elementEnd();
  }
}
function PreferencesPage_Conditional_12_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, "Location permission denied. You can type it instead.");
    \u0275\u0275elementEnd();
  }
}
function PreferencesPage_Conditional_12_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.geo.error());
  }
}
function PreferencesPage_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 17)(2, "div", 18);
    \u0275\u0275text(3, "\u{1F464}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 19);
    \u0275\u0275text(5, "Tell us about yourself");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 20);
    \u0275\u0275text(7, "A few details help us match you with the right people.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 21)(9, "div")(10, "label", 22);
    \u0275\u0275text(11, "Age");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function PreferencesPage_Conditional_12_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.age, $event) || (ctx_r1.age = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div")(14, "label", 22);
    \u0275\u0275text(15, "Your Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 24)(17, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function PreferencesPage_Conditional_12_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.location, $event) || (ctx_r1.location = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 26);
    \u0275\u0275listener("click", function PreferencesPage_Conditional_12_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.useMyLocation());
    });
    \u0275\u0275text(19, "\u{1F4CD} Use mine");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(20, PreferencesPage_Conditional_12_Conditional_20_Template, 2, 0, "p", 27)(21, PreferencesPage_Conditional_12_Conditional_21_Template, 2, 0, "p", 28)(22, PreferencesPage_Conditional_12_Conditional_22_Template, 2, 0, "p", 29)(23, PreferencesPage_Conditional_12_Conditional_23_Template, 2, 1, "p", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div")(25, "label", 22);
    \u0275\u0275text(26, "Short Bio ");
    \u0275\u0275elementStart(27, "span", 30);
    \u0275\u0275text(28, "(optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "textarea", 31);
    \u0275\u0275twoWayListener("ngModelChange", function PreferencesPage_Conditional_12_Template_textarea_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.bio, $event) || (ctx_r1.bio = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.age);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.location);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.geo.status() === "requesting" ? 20 : ctx_r1.geo.status() === "granted" ? 21 : ctx_r1.geo.status() === "denied" ? 22 : ctx_r1.geo.status() === "unavailable" && ctx_r1.geo.error() ? 23 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.bio);
  }
}
function PreferencesPage_Conditional_13_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function PreferencesPage_Conditional_13_For_10_Template_button_click_0_listener() {
      const interest_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleInterest(interest_r5.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const interest_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.isSelected(interest_r5.id) ? "bg-violet-600/30 border-violet-500/60 text-violet-300" : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/8 hover:border-white/20");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", interest_r5.label, " ");
  }
}
function PreferencesPage_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 17)(2, "div", 18);
    \u0275\u0275text(3, "\u{1F3AF}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 19);
    \u0275\u0275text(5, "What do you love?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 20);
    \u0275\u0275text(7, "Pick a few interests \u2014 we'll find people who share them.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 32);
    \u0275\u0275repeaterCreate(9, PreferencesPage_Conditional_13_For_10_Template, 2, 3, "button", 33, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 34);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.interests);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.selected.size, " selected");
  }
}
function PreferencesPage_Conditional_14_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function PreferencesPage_Conditional_14_For_14_Template_button_click_0_listener() {
      const tm_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setTravel(tm_r8.mode));
    });
    \u0275\u0275elementStart(1, "div", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 49);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tm_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.travelMode() === tm_r8.mode ? "bg-violet-600/20 border-violet-500/50 shadow-lg shadow-violet-500/10" : "bg-white/5 border-white/10 hover:bg-white/8");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tm_r8.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tm_r8.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tm_r8.desc);
  }
}
function PreferencesPage_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 17)(2, "div", 18);
    \u0275\u0275text(3, "\u{1F5FA}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 19);
    \u0275\u0275text(5, "How do you get around?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 20);
    \u0275\u0275text(7, "We'll respect your travel style when suggesting matches.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 36)(9, "div")(10, "label", 37);
    \u0275\u0275text(11, "Preferred Travel Mode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 38);
    \u0275\u0275repeaterCreate(13, PreferencesPage_Conditional_14_For_14_Template, 7, 5, "button", 39, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "div", 40)(17, "label", 41);
    \u0275\u0275text(18, "Max Distance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 42);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "input", 43);
    \u0275\u0275listener("input", function PreferencesPage_Conditional_14_Template_input_input_21_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setDistance(+$event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 44)(23, "span");
    \u0275\u0275text(24, "1 km");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "p", 45);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r1.travelModes);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r1.maxDistance(), " km");
    \u0275\u0275advance();
    \u0275\u0275property("max", ctx_r1.cap())("value", ctx_r1.maxDistance());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.cap() / 2, " km");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.cap(), " km");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" Capped at ", ctx_r1.cap(), " km for ", ctx_r1.travelMode(), " travel. ");
  }
}
function PreferencesPage_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "span");
    \u0275\u0275text(2, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.saveError());
  }
}
function PreferencesPage_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function PreferencesPage_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prevStep());
    });
    \u0275\u0275text(1, "\u2190 Back");
    \u0275\u0275elementEnd();
  }
}
function PreferencesPage_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function PreferencesPage_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextStep());
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Continue \u2192");
    \u0275\u0275elementEnd()();
  }
}
function PreferencesPage_Conditional_19_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Saving\u2026 ");
  }
}
function PreferencesPage_Conditional_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u{1F680} Start Exploring!");
    \u0275\u0275elementEnd();
  }
}
function PreferencesPage_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function PreferencesPage_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.finish());
    });
    \u0275\u0275conditionalCreate(1, PreferencesPage_Conditional_19_Conditional_1_Template, 1, 0)(2, PreferencesPage_Conditional_19_Conditional_2_Template, 2, 0, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saving() ? 1 : 2);
  }
}
var ALL_INTERESTS = [
  { id: "travel", label: "\u2708\uFE0F Travel" },
  { id: "food", label: "\u{1F354} Food" },
  { id: "music", label: "\u{1F3B5} Music" },
  { id: "fitness", label: "\u{1F4AA} Fitness" },
  { id: "tech", label: "\u{1F4BB} Tech" },
  { id: "art", label: "\u{1F3A8} Art" },
  { id: "gaming", label: "\u{1F3AE} Gaming" },
  { id: "reading", label: "\u{1F4DA} Reading" },
  { id: "photography", label: "\u{1F4F8} Photography" },
  { id: "yoga", label: "\u{1F9D8} Yoga" },
  { id: "coffee", label: "\u2615 Coffee" },
  { id: "movies", label: "\u{1F3AC} Movies" },
  { id: "sports", label: "\u26BD Sports" },
  { id: "dance", label: "\u{1F483} Dance" },
  { id: "nature", label: "\u{1F33F} Nature" },
  { id: "shopping", label: "\u{1F6CD}\uFE0F Shopping" }
];
var PreferencesPage = class _PreferencesPage {
  auth;
  router;
  geo = inject(GeolocationService);
  step = signal(1, ...ngDevMode ? [{ debugName: "step" }] : (
    /* istanbul ignore next */
    []
  ));
  interests = ALL_INTERESTS;
  selected = /* @__PURE__ */ new Set();
  travelMode = signal("bike", ...ngDevMode ? [{ debugName: "travelMode" }] : (
    /* istanbul ignore next */
    []
  ));
  maxDistance = signal(10, ...ngDevMode ? [{ debugName: "maxDistance" }] : (
    /* istanbul ignore next */
    []
  ));
  bio = "";
  age = "";
  location = "";
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
    /* istanbul ignore next */
    []
  ));
  saveError = signal("", ...ngDevMode ? [{ debugName: "saveError" }] : (
    /* istanbul ignore next */
    []
  ));
  /** The cap for the currently-selected mode. */
  cap = computed(() => this.geo.capFor(this.travelMode()), ...ngDevMode ? [{ debugName: "cap" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
    this.geo.request().then((c) => {
      if (c)
        this.location = `${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}`;
    });
  }
  toggleInterest(id) {
    if (this.selected.has(id))
      this.selected.delete(id);
    else
      this.selected.add(id);
  }
  isSelected(id) {
    return this.selected.has(id);
  }
  setTravel(mode) {
    this.travelMode.set(mode);
    this.maxDistance.set(this.geo.clamp(mode, this.maxDistance()));
  }
  setDistance(v) {
    this.maxDistance.set(this.geo.clamp(this.travelMode(), v));
  }
  async useMyLocation() {
    const c = await this.geo.request();
    if (c)
      this.location = `${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}`;
  }
  nextStep() {
    this.step.update((s) => Math.min(s + 1, 3));
  }
  prevStep() {
    this.step.update((s) => Math.max(s - 1, 1));
  }
  async finish() {
    this.saving.set(true);
    this.saveError.set("");
    const coords = this.geo.coords();
    const user = await this.auth.updatePreferences(__spreadValues({
      interests: [...this.selected],
      travelMode: this.travelMode(),
      maxDistance: this.maxDistance(),
      bio: this.bio,
      age: this.age ? parseInt(this.age) : void 0,
      location: this.location || void 0
    }, coords ? { coords: { lat: coords.lat, lng: coords.lng } } : {}));
    this.saving.set(false);
    if (user)
      this.router.navigate(["/dashboard"]);
    else
      this.saveError.set("Could not save preferences. Are you signed in?");
  }
  travelModes = [
    { mode: "car", icon: "\u{1F697}", label: "Car", desc: "Up to 80 km" },
    { mode: "bike", icon: "\u{1F6B2}", label: "Bike", desc: "Up to 40 km" },
    { mode: "walk", icon: "\u{1F6B6}", label: "Walk", desc: "Up to 20 km" }
  ];
  static \u0275fac = function PreferencesPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PreferencesPage)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PreferencesPage, selectors: [["app-preferences"]], decls: 20, vars: 7, consts: [[1, "bg-mesh", "min-h-screen", "flex", "items-center", "justify-center", "p-4"], [1, "absolute", "top-6", "left-6"], [1, "flex", "items-center", "gap-2"], [1, "text-xl"], [1, "gradient-text", "font-bold"], [1, "w-full", "max-w-xl", "animate-fade-in-up"], [1, "flex", "items-center", "justify-center", "gap-3", "mb-8"], [1, "flex", "items-center", "gap-3"], [1, "glass", "rounded-3xl", "p-8", "border", "border-white/8", "shadow-2xl", "shadow-violet-500/5"], [1, "mt-4", "flex", "items-center", "gap-2", "text-red-400", "text-sm", "bg-red-500/10", "border", "border-red-500/20", "rounded-xl", "px-4", "py-3"], [1, "flex", "gap-3", "mt-8"], [1, "btn-ghost", "flex-1", "py-3", "rounded-xl", "font-medium"], [1, "btn-primary", "flex-1", "py-3", "rounded-xl", "font-semibold"], [1, "btn-primary", "flex-1", "py-3", "rounded-xl", "font-semibold", 3, "disabled"], [1, "w-8", "h-8", "rounded-full", "flex", "items-center", "justify-center", "text-sm", "font-bold", "transition-all", "duration-300"], [1, "w-12", "h-0.5", "transition-all", "duration-500", 3, "class"], [1, "w-12", "h-0.5", "transition-all", "duration-500"], [1, "text-center", "mb-8"], [1, "text-4xl", "mb-3"], [1, "text-2xl", "font-bold", "text-white", "mb-1"], [1, "text-slate-400", "text-sm"], [1, "space-y-4"], [1, "block", "text-xs", "text-slate-400", "mb-1.5", "font-medium"], ["type", "number", "placeholder", "22", 1, "input-field", 3, "ngModelChange", "ngModel"], [1, "flex", "gap-2"], ["type", "text", "placeholder", "Tap '\u{1F4CD} Use mine' to auto-detect", 1, "input-field", "flex-1", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn-ghost", "px-3", "rounded-xl", "text-sm", "whitespace-nowrap", 3, "click"], [1, "text-xs", "text-slate-500", "mt-1"], [1, "text-xs", "text-emerald-400", "mt-1"], [1, "text-xs", "text-amber-400", "mt-1"], [1, "text-slate-600"], ["rows", "3", "placeholder", "Tell others what you love doing\u2026", 1, "input-field", "resize-none", 3, "ngModelChange", "ngModel"], [1, "flex", "flex-wrap", "gap-2.5"], [1, "px-4", "py-2.5", "rounded-xl", "text-sm", "font-medium", "transition-all", "duration-200", "border", 3, "class"], [1, "text-xs", "text-slate-500", "mt-4"], [1, "px-4", "py-2.5", "rounded-xl", "text-sm", "font-medium", "transition-all", "duration-200", "border", 3, "click"], [1, "space-y-6"], [1, "block", "text-xs", "text-slate-400", "mb-3", "font-medium"], [1, "grid", "grid-cols-3", "gap-3"], [1, "p-4", "rounded-2xl", "border", "text-center", "transition-all", "duration-200", 3, "class"], [1, "flex", "justify-between", "items-center", "mb-3"], [1, "text-xs", "text-slate-400", "font-medium"], [1, "text-sm", "font-bold", "gradient-text"], ["type", "range", "min", "1", 1, "w-full", "accent-violet-500", "cursor-pointer", 3, "input", "max", "value"], [1, "flex", "justify-between", "text-xs", "text-slate-600", "mt-1"], [1, "text-xs", "text-slate-500", "mt-2"], [1, "p-4", "rounded-2xl", "border", "text-center", "transition-all", "duration-200", 3, "click"], [1, "text-3xl", "mb-2"], [1, "text-sm", "font-semibold", "text-white"], [1, "text-xs", "text-slate-500", "mt-0.5"], [1, "btn-ghost", "flex-1", "py-3", "rounded-xl", "font-medium", 3, "click"], [1, "btn-primary", "flex-1", "py-3", "rounded-xl", "font-semibold", 3, "click"], [1, "btn-primary", "flex-1", "py-3", "rounded-xl", "font-semibold", 3, "click", "disabled"]], template: function PreferencesPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275text(4, "\u{1F4CD}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "span", 4);
      \u0275\u0275text(6, "KnowYourLocality");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6);
      \u0275\u0275repeaterCreate(9, PreferencesPage_For_10_Template, 5, 4, "div", 7, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 8);
      \u0275\u0275conditionalCreate(12, PreferencesPage_Conditional_12_Template, 30, 4, "div");
      \u0275\u0275conditionalCreate(13, PreferencesPage_Conditional_13_Template, 13, 1, "div");
      \u0275\u0275conditionalCreate(14, PreferencesPage_Conditional_14_Template, 31, 7, "div");
      \u0275\u0275conditionalCreate(15, PreferencesPage_Conditional_15_Template, 5, 1, "div", 9);
      \u0275\u0275elementStart(16, "div", 10);
      \u0275\u0275conditionalCreate(17, PreferencesPage_Conditional_17_Template, 2, 0, "button", 11);
      \u0275\u0275conditionalCreate(18, PreferencesPage_Conditional_18_Template, 3, 0, "button", 12)(19, PreferencesPage_Conditional_19_Template, 3, 2, "button", 13);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(6, _c0));
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.step() === 1 ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.step() === 2 ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.step() === 3 ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.saveError() ? 15 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.step() > 1 ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.step() < 3 ? 18 : 19);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PreferencesPage, [{
    type: Component,
    args: [{ selector: "app-preferences", imports: [FormsModule], template: `<div class="bg-mesh min-h-screen flex items-center justify-center p-4">
  <div class="absolute top-6 left-6">
    <div class="flex items-center gap-2">
      <span class="text-xl">\u{1F4CD}</span>
      <span class="gradient-text font-bold">KnowYourLocality</span>
    </div>
  </div>

  <div class="w-full max-w-xl animate-fade-in-up">
    <div class="flex items-center justify-center gap-3 mb-8">
      @for (s of [1,2,3]; track s) {
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
            [class]="s <= step() ? 'bg-gradient-to-br from-violet-600 to-cyan-500 text-white' : 'bg-white/8 text-slate-500'">
            @if (s < step()) { \u2713 } @else { {{ s }} }
          </div>
          @if (s < 3) {
            <div class="w-12 h-0.5 transition-all duration-500"
              [class]="s < step() ? 'bg-gradient-to-r from-violet-500 to-cyan-500' : 'bg-white/10'"></div>
          }
        </div>
      }
    </div>

    <div class="glass rounded-3xl p-8 border border-white/8 shadow-2xl shadow-violet-500/5">

      <!-- Step 1: Basic Info -->
      @if (step() === 1) {
        <div>
          <div class="text-center mb-8">
            <div class="text-4xl mb-3">\u{1F464}</div>
            <h2 class="text-2xl font-bold text-white mb-1">Tell us about yourself</h2>
            <p class="text-slate-400 text-sm">A few details help us match you with the right people.</p>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-xs text-slate-400 mb-1.5 font-medium">Age</label>
              <input type="number" [(ngModel)]="age" class="input-field" placeholder="22">
            </div>
            <div>
              <label class="block text-xs text-slate-400 mb-1.5 font-medium">Your Location</label>
              <div class="flex gap-2">
                <input type="text" [(ngModel)]="location" class="input-field flex-1" placeholder="Tap '\u{1F4CD} Use mine' to auto-detect">
                <button type="button" (click)="useMyLocation()"
                  class="btn-ghost px-3 rounded-xl text-sm whitespace-nowrap">\u{1F4CD} Use mine</button>
              </div>
              @if (geo.status() === 'requesting') {
                <p class="text-xs text-slate-500 mt-1">Detecting your location\u2026</p>
              } @else if (geo.status() === 'granted') {
                <p class="text-xs text-emerald-400 mt-1">Location detected \u2713</p>
              } @else if (geo.status() === 'denied') {
                <p class="text-xs text-amber-400 mt-1">Location permission denied. You can type it instead.</p>
              } @else if (geo.status() === 'unavailable' && geo.error()) {
                <p class="text-xs text-amber-400 mt-1">{{ geo.error() }}</p>
              }
            </div>
            <div>
              <label class="block text-xs text-slate-400 mb-1.5 font-medium">Short Bio <span class="text-slate-600">(optional)</span></label>
              <textarea [(ngModel)]="bio" class="input-field resize-none" rows="3" placeholder="Tell others what you love doing\u2026"></textarea>
            </div>
          </div>
        </div>
      }

      <!-- Step 2: Interests -->
      @if (step() === 2) {
        <div>
          <div class="text-center mb-8">
            <div class="text-4xl mb-3">\u{1F3AF}</div>
            <h2 class="text-2xl font-bold text-white mb-1">What do you love?</h2>
            <p class="text-slate-400 text-sm">Pick a few interests \u2014 we'll find people who share them.</p>
          </div>
          <div class="flex flex-wrap gap-2.5">
            @for (interest of interests; track interest.id) {
              <button (click)="toggleInterest(interest.id)"
                class="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border"
                [class]="isSelected(interest.id)
                  ? 'bg-violet-600/30 border-violet-500/60 text-violet-300'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/8 hover:border-white/20'">
                {{ interest.label }}
              </button>
            }
          </div>
          <p class="text-xs text-slate-500 mt-4">{{ selected.size }} selected</p>
        </div>
      }

      <!-- Step 3: Travel Preferences -->
      @if (step() === 3) {
        <div>
          <div class="text-center mb-8">
            <div class="text-4xl mb-3">\u{1F5FA}\uFE0F</div>
            <h2 class="text-2xl font-bold text-white mb-1">How do you get around?</h2>
            <p class="text-slate-400 text-sm">We'll respect your travel style when suggesting matches.</p>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-xs text-slate-400 mb-3 font-medium">Preferred Travel Mode</label>
              <div class="grid grid-cols-3 gap-3">
                @for (tm of travelModes; track tm.mode) {
                  <button (click)="setTravel(tm.mode)"
                    class="p-4 rounded-2xl border text-center transition-all duration-200"
                    [class]="travelMode() === tm.mode
                      ? 'bg-violet-600/20 border-violet-500/50 shadow-lg shadow-violet-500/10'
                      : 'bg-white/5 border-white/10 hover:bg-white/8'">
                    <div class="text-3xl mb-2">{{ tm.icon }}</div>
                    <div class="text-sm font-semibold text-white">{{ tm.label }}</div>
                    <div class="text-xs text-slate-500 mt-0.5">{{ tm.desc }}</div>
                  </button>
                }
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-3">
                <label class="text-xs text-slate-400 font-medium">Max Distance</label>
                <span class="text-sm font-bold gradient-text">{{ maxDistance() }} km</span>
              </div>
              <input type="range" min="1" [max]="cap()" [value]="maxDistance()"
                (input)="setDistance(+$any($event.target).value)"
                class="w-full accent-violet-500 cursor-pointer">
              <div class="flex justify-between text-xs text-slate-600 mt-1">
                <span>1 km</span><span>{{ cap() / 2 }} km</span><span>{{ cap() }} km</span>
              </div>
              <p class="text-xs text-slate-500 mt-2">
                Capped at {{ cap() }} km for {{ travelMode() }} travel.
              </p>
            </div>
          </div>
        </div>
      }

      @if (saveError()) {
        <div class="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <span>\u26A0\uFE0F</span> <span>{{ saveError() }}</span>
        </div>
      }

      <div class="flex gap-3 mt-8">
        @if (step() > 1) {
          <button (click)="prevStep()" class="btn-ghost flex-1 py-3 rounded-xl font-medium">\u2190 Back</button>
        }
        @if (step() < 3) {
          <button (click)="nextStep()" class="btn-primary flex-1 py-3 rounded-xl font-semibold">
            <span>Continue \u2192</span>
          </button>
        } @else {
          <button (click)="finish()" [disabled]="saving()" class="btn-primary flex-1 py-3 rounded-xl font-semibold">
            @if (saving()) { Saving\u2026 } @else { <span>\u{1F680} Start Exploring!</span> }
          </button>
        }
      </div>
    </div>
  </div>
</div>
` }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PreferencesPage, { className: "PreferencesPage", filePath: "src/app/pages/preferences/preferences.ts", lineNumber: 24 });
})();
export {
  PreferencesPage
};
//# sourceMappingURL=chunk-RSEFURHJ.js.map
