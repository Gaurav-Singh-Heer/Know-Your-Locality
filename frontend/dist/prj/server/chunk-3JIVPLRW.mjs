import './polyfills.server.mjs';
import {
  AuthService,
  Component,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵpureFunction0,
  ɵɵpureFunction3,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-KJMH4Q3T.mjs";
import "./chunk-T2KOBY73.mjs";

// src/app/pages/landing/landing.ts
var _c0 = () => ({ emoji: "\u{1F333}", name: "Sukhna Lake", dist: "1.2km", cat: "park" });
var _c1 = () => ({ emoji: "\u{1F35B}", name: "The Grand Spice", dist: "0.8km", cat: "restaurant" });
var _c2 = () => ({ emoji: "\u2615", name: "Brew & Beans", dist: "0.5km", cat: "cafe" });
var _c3 = (a0, a1, a2) => [a0, a1, a2];
var _c4 = () => ({ n: "01", icon: "\u270D\uFE0F", title: "Create Account", desc: "Register and set up your profile with your interests and travel preferences." });
var _c5 = () => ({ n: "02", icon: "\u{1F50D}", title: "Explore Nearby", desc: "Discover places around you filtered by category and your preferred travel mode." });
var _c6 = () => ({ n: "03", icon: "\u{1F91D}", title: "Connect & Plan", desc: "Get matched with like-minded people and plan outings with AI-generated itineraries." });
var _forTrack0 = ($index, $item) => $item.name;
var _forTrack1 = ($index, $item) => $item.label;
var _forTrack2 = ($index, $item) => $item.title;
var _forTrack3 = ($index, $item) => $item.n;
function LandingPage_For_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 32)(1, "div", 60);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 61);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 62);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "span", 63);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const place_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(place_r1.emoji);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(place_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", place_r1.dist, " away");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(place_r1.cat);
  }
}
function LandingPage_For_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 42)(1, "div", 64);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 65);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const stat_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r2.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r2.label);
  }
}
function LandingPage_For_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 49)(1, "div", 66);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h3", 67);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p", 68);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const f_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r3.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r3.desc);
  }
}
function LandingPage_For_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 53)(1, "div", 69)(2, "div", 70);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div", 71);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "h3", 72);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "p", 68);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const step_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r4.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("STEP ", step_r4.n);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r4.desc);
  }
}
var LandingPage = class _LandingPage {
  router;
  auth;
  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
  }
  goToApp() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate([this.auth.hasPreferences() ? "/dashboard" : "/preferences"]);
    } else {
      this.router.navigate(["/auth"]);
    }
  }
  features = [
    { icon: "\u{1F5FA}\uFE0F", title: "Smart Discovery", desc: "Explore nearby parks, restaurants, clubs and more \u2014 filtered by category and distance." },
    { icon: "\u{1F697}", title: "Travel Modes", desc: "Get accurate travel times for car, bike, or walking to every location." },
    { icon: "\u{1F916}", title: "AI Travel Planner", desc: "Get personalized itineraries generated by AI based on your interests and preferences." },
    { icon: "\u{1F4A1}", title: "Smart Matching", desc: "Connect with like-minded people in your locality using our compatibility algorithm." },
    { icon: "\u{1F4AC}", title: "Real-Time Chat", desc: "Instantly connect and plan outings with your matches via built-in messaging." },
    { icon: "\u{1F3AF}", title: "Category Filters", desc: "Narrow down places by type so you always find exactly what you're looking for." }
  ];
  stats = [
    { value: "500+", label: "Places Listed" },
    { value: "1K+", label: "Active Users" },
    { value: "92%", label: "Match Accuracy" },
    { value: "24/7", label: "Always On" }
  ];
  static \u0275fac = function LandingPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LandingPage)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LandingPage, selectors: [["app-landing"]], decls: 108, vars: 14, consts: [[1, "bg-mesh", "min-h-screen"], [1, "fixed", "top-0", "left-0", "right-0", "z-50", "glass", "border-b", "border-white/5"], [1, "max-w-7xl", "mx-auto", "px-6", "h-16", "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-2"], [1, "text-2xl"], [1, "font-bold", "text-lg", "gradient-text"], [1, "flex", "items-center", "gap-3"], [1, "btn-ghost", "text-sm", "px-5", "py-2", "rounded-xl", "font-medium", 3, "click"], [1, "btn-primary", "text-sm", "px-5", "py-2", "rounded-xl", "font-medium", "flex", "items-center", "gap-1", 3, "click"], [1, "pt-32", "pb-20", "px-6", "text-center", "relative", "overflow-hidden"], [1, "absolute", "inset-0", "pointer-events-none"], [1, "absolute", "top-20", "left-1/4", "w-96", "h-96", "bg-violet-600/10", "rounded-full", "blur-3xl", "animate-float"], [1, "absolute", "top-40", "right-1/4", "w-64", "h-64", "bg-cyan-500/8", "rounded-full", "blur-3xl", "animate-float", 2, "animation-delay", "-3s"], [1, "relative", "z-10", "max-w-4xl", "mx-auto"], [1, "inline-flex", "items-center", "gap-2", "glass", "px-4", "py-2", "rounded-full", "text-sm", "text-slate-300", "mb-8", "border", "border-violet-500/20"], [1, "glow-dot", "inline-block"], [1, "text-5xl", "md:text-7xl", "font-black", "leading-none", "mb-6", "tracking-tight"], [1, "gradient-text-warm"], [1, "text-white"], [1, "gradient-text"], [1, "text-slate-400", "text-lg", "md:text-xl", "max-w-2xl", "mx-auto", "mb-10", "leading-relaxed"], [1, "flex", "flex-col", "sm:flex-row", "gap-4", "justify-center"], [1, "btn-primary", "px-8", "py-4", "rounded-2xl", "text-base", "font-semibold", 3, "click"], [1, "btn-ghost", "px-8", "py-4", "rounded-2xl", "text-base", "font-medium"], [1, "mt-16", "relative"], [1, "glass", "card-shine", "rounded-3xl", "p-1", "max-w-3xl", "mx-auto", "shadow-2xl", "shadow-violet-500/10", "border", "border-violet-500/10"], [1, "rounded-[22px]", "overflow-hidden", "bg-gradient-to-b", "from-slate-900/80", "to-slate-950/80", "p-6"], [1, "flex", "items-center", "gap-2", "mb-4"], [1, "w-3", "h-3", "rounded-full", "bg-red-500/70"], [1, "w-3", "h-3", "rounded-full", "bg-yellow-500/70"], [1, "w-3", "h-3", "rounded-full", "bg-green-500/70"], [1, "grid", "grid-cols-3", "gap-3"], [1, "glass", "rounded-xl", "p-3", "text-left", "border", "border-white/5"], [1, "mt-4", "glass", "rounded-xl", "p-3", "flex", "items-center", "gap-3"], [1, "text-xl"], [1, "flex-1"], [1, "text-xs", "text-slate-400", "mb-1"], [1, "h-1.5", "rounded-full", "bg-white/5"], [1, "h-full", "w-3/4", "rounded-full", "bg-gradient-to-r", "from-violet-500", "to-cyan-500"], [1, "text-xs", "text-violet-400", "font-medium"], [1, "py-16", "px-6"], [1, "max-w-4xl", "mx-auto", "grid", "grid-cols-2", "md:grid-cols-4", "gap-6"], [1, "glass", "rounded-2xl", "p-6", "text-center", "border", "border-white/5"], [1, "py-20", "px-6"], [1, "max-w-6xl", "mx-auto"], [1, "text-center", "mb-14"], [1, "text-4xl", "font-bold", "text-white", "mb-4"], [1, "text-slate-400", "text-lg", "max-w-xl", "mx-auto"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-5"], [1, "glass", "glass-hover", "rounded-2xl", "p-6", "border", "border-white/5"], [1, "max-w-4xl", "mx-auto", "text-center"], [1, "text-4xl", "font-bold", "text-white", "mb-14"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-8"], [1, "relative"], [1, "max-w-3xl", "mx-auto", "text-center", "glass", "rounded-3xl", "p-14", "border", "border-violet-500/15", "shadow-2xl", "shadow-violet-500/5"], [1, "text-slate-400", "text-lg", "mb-8"], [1, "btn-primary", "px-10", "py-4", "rounded-2xl", "text-base", "font-semibold", "inline-flex", "items-center", "gap-2", 3, "click"], [1, "py-8", "px-6", "border-t", "border-white/5", "text-center", "text-slate-500", "text-sm"], [1, "flex", "items-center", "justify-center", "gap-2", "mb-2"], [1, "gradient-text", "font-semibold"], [1, "text-2xl", "mb-2"], [1, "text-xs", "font-semibold", "text-white", "truncate"], [1, "text-xs", "text-slate-500", "mt-0.5"], [1, "tag", "mt-1.5"], [1, "text-3xl", "font-black", "gradient-text", "mb-1"], [1, "text-sm", "text-slate-400"], [1, "text-3xl", "mb-4"], [1, "text-white", "font-semibold", "text-lg", "mb-2"], [1, "text-slate-400", "text-sm", "leading-relaxed"], [1, "glass", "rounded-2xl", "p-8", "border", "border-white/5", "h-full"], [1, "text-5xl", "mb-4"], [1, "text-xs", "font-mono", "text-violet-400", "mb-2"], [1, "text-white", "font-semibold", "text-lg", "mb-3"]], template: function LandingPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "nav", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "\u{1F4CD}");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "span", 5);
      \u0275\u0275text(7, "KnowYourLocality");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "div", 6)(9, "button", 7);
      \u0275\u0275domListener("click", function LandingPage_Template_button_click_9_listener() {
        return ctx.goToApp();
      });
      \u0275\u0275text(10, "Sign In");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(11, "button", 8);
      \u0275\u0275domListener("click", function LandingPage_Template_button_click_11_listener() {
        return ctx.goToApp();
      });
      \u0275\u0275domElementStart(12, "span");
      \u0275\u0275text(13, "Get Started");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "span");
      \u0275\u0275text(15, "\u2192");
      \u0275\u0275domElementEnd()()()()();
      \u0275\u0275domElementStart(16, "section", 9)(17, "div", 10);
      \u0275\u0275domElement(18, "div", 11)(19, "div", 12);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(20, "div", 13)(21, "div", 14);
      \u0275\u0275domElement(22, "span", 15);
      \u0275\u0275domElementStart(23, "span");
      \u0275\u0275text(24, "AI-Powered Locality Explorer");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(25, "h1", 16)(26, "span", 17);
      \u0275\u0275text(27, "Explore.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElement(28, "br");
      \u0275\u0275domElementStart(29, "span", 18);
      \u0275\u0275text(30, "Connect.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElement(31, "br");
      \u0275\u0275domElementStart(32, "span", 19);
      \u0275\u0275text(33, "Discover.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(34, "p", 20);
      \u0275\u0275text(35, " A smart platform that helps you discover nearby places, build social connections, and get AI-powered travel plans \u2014 all tailored to your locality. ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(36, "div", 21)(37, "button", 22);
      \u0275\u0275domListener("click", function LandingPage_Template_button_click_37_listener() {
        return ctx.goToApp();
      });
      \u0275\u0275domElementStart(38, "span");
      \u0275\u0275text(39, "Start Exploring Free \u2192");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(40, "button", 23);
      \u0275\u0275text(41, " Watch Demo ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(42, "div", 24)(43, "div", 25)(44, "div", 26)(45, "div", 27);
      \u0275\u0275domElement(46, "div", 28)(47, "div", 29)(48, "div", 30);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(49, "div", 31);
      \u0275\u0275repeaterCreate(50, LandingPage_For_51_Template, 9, 4, "div", 32, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(52, "div", 33)(53, "span", 34);
      \u0275\u0275text(54, "\u{1F916}");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(55, "div", 35)(56, "div", 36);
      \u0275\u0275text(57, "AI Travel Plan");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(58, "div", 37);
      \u0275\u0275domElement(59, "div", 38);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(60, "span", 39);
      \u0275\u0275text(61, "Generating...");
      \u0275\u0275domElementEnd()()()()()()();
      \u0275\u0275domElementStart(62, "section", 40)(63, "div", 41);
      \u0275\u0275repeaterCreate(64, LandingPage_For_65_Template, 5, 2, "div", 42, _forTrack1);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(66, "section", 43)(67, "div", 44)(68, "div", 45)(69, "h2", 46);
      \u0275\u0275text(70, "Everything you need to ");
      \u0275\u0275domElementStart(71, "span", 19);
      \u0275\u0275text(72, "explore smarter");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(73, "p", 47);
      \u0275\u0275text(74, "One platform combining location discovery, AI intelligence, and social connectivity.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(75, "div", 48);
      \u0275\u0275repeaterCreate(76, LandingPage_For_77_Template, 7, 3, "div", 49, _forTrack2);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(78, "section", 43)(79, "div", 50)(80, "h2", 51);
      \u0275\u0275text(81, "Get started in ");
      \u0275\u0275domElementStart(82, "span", 19);
      \u0275\u0275text(83, "3 simple steps");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(84, "div", 52);
      \u0275\u0275repeaterCreate(85, LandingPage_For_86_Template, 10, 4, "div", 53, _forTrack3);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(87, "section", 43)(88, "div", 54)(89, "h2", 46);
      \u0275\u0275text(90, "Ready to know your ");
      \u0275\u0275domElementStart(91, "span", 19);
      \u0275\u0275text(92, "locality?");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(93, "p", 55);
      \u0275\u0275text(94, "Join thousands discovering and connecting in their neighborhoods.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(95, "button", 56);
      \u0275\u0275domListener("click", function LandingPage_Template_button_click_95_listener() {
        return ctx.goToApp();
      });
      \u0275\u0275domElementStart(96, "span");
      \u0275\u0275text(97, "\u{1F4CD}");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(98, "span");
      \u0275\u0275text(99, "Start Exploring Now");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(100, "footer", 57)(101, "div", 58)(102, "span");
      \u0275\u0275text(103, "\u{1F4CD}");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(104, "span", 59);
      \u0275\u0275text(105, "KnowYourLocality");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(106, "p");
      \u0275\u0275text(107, "Built with \u2665 by Gaurav, Ansh, Prakhar & Nishan \xB7 CSE VI Sem \xB7 22CS038");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(50);
      \u0275\u0275repeater(\u0275\u0275pureFunction3(3, _c3, \u0275\u0275pureFunction0(0, _c0), \u0275\u0275pureFunction0(1, _c1), \u0275\u0275pureFunction0(2, _c2)));
      \u0275\u0275advance(14);
      \u0275\u0275repeater(ctx.stats);
      \u0275\u0275advance(12);
      \u0275\u0275repeater(ctx.features);
      \u0275\u0275advance(9);
      \u0275\u0275repeater(\u0275\u0275pureFunction3(10, _c3, \u0275\u0275pureFunction0(7, _c4), \u0275\u0275pureFunction0(8, _c5), \u0275\u0275pureFunction0(9, _c6)));
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LandingPage, [{
    type: Component,
    args: [{ selector: "app-landing", template: `<div class="bg-mesh min-h-screen">

  <!-- Navbar -->
  <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-2xl">\u{1F4CD}</span>
        <span class="font-bold text-lg gradient-text">KnowYourLocality</span>
      </div>
      <div class="flex items-center gap-3">
        <button (click)="goToApp()" class="btn-ghost text-sm px-5 py-2 rounded-xl font-medium">Sign In</button>
        <button (click)="goToApp()" class="btn-primary text-sm px-5 py-2 rounded-xl font-medium flex items-center gap-1">
          <span>Get Started</span><span>\u2192</span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="pt-32 pb-20 px-6 text-center relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute top-40 right-1/4 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl animate-float" style="animation-delay: -3s"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto">
      <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-slate-300 mb-8 border border-violet-500/20">
        <span class="glow-dot inline-block"></span>
        <span>AI-Powered Locality Explorer</span>
      </div>

      <h1 class="text-5xl md:text-7xl font-black leading-none mb-6 tracking-tight">
        <span class="gradient-text-warm">Explore.</span><br>
        <span class="text-white">Connect.</span><br>
        <span class="gradient-text">Discover.</span>
      </h1>

      <p class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        A smart platform that helps you discover nearby places, build social connections, and get AI-powered travel plans \u2014 all tailored to your locality.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button (click)="goToApp()" class="btn-primary px-8 py-4 rounded-2xl text-base font-semibold">
          <span>Start Exploring Free \u2192</span>
        </button>
        <button class="btn-ghost px-8 py-4 rounded-2xl text-base font-medium">
          Watch Demo
        </button>
      </div>

      <!-- Floating UI Preview -->
      <div class="mt-16 relative">
        <div class="glass card-shine rounded-3xl p-1 max-w-3xl mx-auto shadow-2xl shadow-violet-500/10 border border-violet-500/10">
          <div class="rounded-[22px] overflow-hidden bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500/70"></div>
              <div class="w-3 h-3 rounded-full bg-green-500/70"></div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              @for (place of [
                {emoji:'\u{1F333}', name:'Sukhna Lake', dist:'1.2km', cat:'park'},
                {emoji:'\u{1F35B}', name:'The Grand Spice', dist:'0.8km', cat:'restaurant'},
                {emoji:'\u2615', name:'Brew & Beans', dist:'0.5km', cat:'cafe'}
              ]; track place.name) {
                <div class="glass rounded-xl p-3 text-left border border-white/5">
                  <div class="text-2xl mb-2">{{ place.emoji }}</div>
                  <div class="text-xs font-semibold text-white truncate">{{ place.name }}</div>
                  <div class="text-xs text-slate-500 mt-0.5">{{ place.dist }} away</div>
                  <span class="tag mt-1.5">{{ place.cat }}</span>
                </div>
              }
            </div>
            <div class="mt-4 glass rounded-xl p-3 flex items-center gap-3">
              <span class="text-xl">\u{1F916}</span>
              <div class="flex-1">
                <div class="text-xs text-slate-400 mb-1">AI Travel Plan</div>
                <div class="h-1.5 rounded-full bg-white/5">
                  <div class="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"></div>
                </div>
              </div>
              <span class="text-xs text-violet-400 font-medium">Generating...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats -->
  <section class="py-16 px-6">
    <div class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
      @for (stat of stats; track stat.label) {
        <div class="glass rounded-2xl p-6 text-center border border-white/5">
          <div class="text-3xl font-black gradient-text mb-1">{{ stat.value }}</div>
          <div class="text-sm text-slate-400">{{ stat.label }}</div>
        </div>
      }
    </div>
  </section>

  <!-- Features -->
  <section class="py-20 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-14">
        <h2 class="text-4xl font-bold text-white mb-4">Everything you need to <span class="gradient-text">explore smarter</span></h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto">One platform combining location discovery, AI intelligence, and social connectivity.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        @for (f of features; track f.title) {
          <div class="glass glass-hover rounded-2xl p-6 border border-white/5">
            <div class="text-3xl mb-4">{{ f.icon }}</div>
            <h3 class="text-white font-semibold text-lg mb-2">{{ f.title }}</h3>
            <p class="text-slate-400 text-sm leading-relaxed">{{ f.desc }}</p>
          </div>
        }
      </div>
    </div>
  </section>

  <!-- How it works -->
  <section class="py-20 px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-white mb-14">Get started in <span class="gradient-text">3 simple steps</span></h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        @for (step of [
          {n:'01', icon:'\u270D\uFE0F', title:'Create Account', desc:'Register and set up your profile with your interests and travel preferences.'},
          {n:'02', icon:'\u{1F50D}', title:'Explore Nearby', desc:'Discover places around you filtered by category and your preferred travel mode.'},
          {n:'03', icon:'\u{1F91D}', title:'Connect & Plan', desc:'Get matched with like-minded people and plan outings with AI-generated itineraries.'}
        ]; track step.n) {
          <div class="relative">
            <div class="glass rounded-2xl p-8 border border-white/5 h-full">
              <div class="text-5xl mb-4">{{ step.icon }}</div>
              <div class="text-xs font-mono text-violet-400 mb-2">STEP {{ step.n }}</div>
              <h3 class="text-white font-semibold text-lg mb-3">{{ step.title }}</h3>
              <p class="text-slate-400 text-sm leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        }
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 px-6">
    <div class="max-w-3xl mx-auto text-center glass rounded-3xl p-14 border border-violet-500/15 shadow-2xl shadow-violet-500/5">
      <h2 class="text-4xl font-bold text-white mb-4">Ready to know your <span class="gradient-text">locality?</span></h2>
      <p class="text-slate-400 text-lg mb-8">Join thousands discovering and connecting in their neighborhoods.</p>
      <button (click)="goToApp()" class="btn-primary px-10 py-4 rounded-2xl text-base font-semibold inline-flex items-center gap-2">
        <span>\u{1F4CD}</span><span>Start Exploring Now</span>
      </button>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-8 px-6 border-t border-white/5 text-center text-slate-500 text-sm">
    <div class="flex items-center justify-center gap-2 mb-2">
      <span>\u{1F4CD}</span>
      <span class="gradient-text font-semibold">KnowYourLocality</span>
    </div>
    <p>Built with \u2665 by Gaurav, Ansh, Prakhar & Nishan \xB7 CSE VI Sem \xB7 22CS038</p>
  </footer>
</div>
` }]
  }], () => [{ type: Router }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LandingPage, { className: "LandingPage", filePath: "src/app/pages/landing/landing.ts", lineNumber: 9 });
})();
export {
  LandingPage
};
//# sourceMappingURL=chunk-3JIVPLRW.mjs.map
