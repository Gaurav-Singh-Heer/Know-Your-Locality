import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-64IOHUT2.js";
import {
  AuthService,
  Component,
  Injectable,
  PLATFORM_ID,
  Router,
  ViewChild,
  __spreadProps,
  __spreadValues,
  computed,
  environment,
  inject,
  isPlatformBrowser,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵarrowFunction,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-HQSMC4LD.js";

// src/app/services/places.service.ts
var MOCK_PLACES = [
  { id: "1", name: "Sukhna Lake Park", category: "park", description: "Serene lake-side park perfect for morning walks and evening strolls with stunning sunset views.", distance: 1.2, rating: 4.8, emoji: "\u{1F333}", address: "Sukhna Lake, Sector 1, Chandigarh", openNow: true, tags: ["nature", "walking", "family"], travelTime: { car: 5, bike: 8, walk: 15 } },
  { id: "2", name: "The Grand Spice", category: "restaurant", description: "Award-winning restaurant offering authentic North Indian cuisine with a modern twist.", distance: 0.8, rating: 4.6, emoji: "\u{1F35B}", address: "Sector 17, Chandigarh", openNow: true, tags: ["indian", "fine dining", "vegetarian"], travelTime: { car: 3, bike: 5, walk: 10 } },
  { id: "3", name: "Club Nexus", category: "club", description: "Premier nightclub with live DJs, rooftop bar, and an electric atmosphere every weekend.", distance: 3.5, rating: 4.3, emoji: "\u{1F3B5}", address: "Industrial Area, Chandigarh", openNow: false, tags: ["nightlife", "music", "rooftop"], travelTime: { car: 12, bike: 18, walk: 42 } },
  { id: "4", name: "Brew & Beans", category: "cafe", description: "Cozy specialty coffee shop with artisan brews, vegan pastries, and a great work atmosphere.", distance: 0.5, rating: 4.9, emoji: "\u2615", address: "Sector 35, Chandigarh", openNow: true, tags: ["coffee", "work-friendly", "vegan"], travelTime: { car: 2, bike: 4, walk: 6 } },
  { id: "5", name: "Government Museum", category: "museum", description: "Rich collection of Gandharan sculpture, natural history exhibits, and modern art galleries.", distance: 2.1, rating: 4.4, emoji: "\u{1F3DB}\uFE0F", address: "Sector 10, Chandigarh", openNow: true, tags: ["history", "art", "culture"], travelTime: { car: 8, bike: 12, walk: 25 } },
  { id: "6", name: "Iron Temple Gym", category: "gym", description: "State-of-the-art fitness center with Olympic equipment, personal trainers, and yoga classes.", distance: 1.5, rating: 4.5, emoji: "\u{1F4AA}", address: "Sector 22, Chandigarh", openNow: true, tags: ["fitness", "yoga", "training"], travelTime: { car: 6, bike: 9, walk: 18 } },
  { id: "7", name: "Elante Mall", category: "shopping", description: "Premium shopping destination with 200+ stores, food court, multiplex cinema, and entertainment zone.", distance: 4.2, rating: 4.7, emoji: "\u{1F6CD}\uFE0F", address: "Industrial Area Phase I, Chandigarh", openNow: true, tags: ["shopping", "food", "entertainment"], travelTime: { car: 15, bike: 22, walk: 50 } },
  { id: "8", name: "Terraza Rooftop", category: "restaurant", description: "Stunning rooftop dining with panoramic city views, Mediterranean fusion menu, and craft cocktails.", distance: 1.9, rating: 4.7, emoji: "\u{1F303}", address: "Sector 26, Chandigarh", openNow: true, tags: ["rooftop", "mediterranean", "cocktails"], travelTime: { car: 7, bike: 11, walk: 23 } },
  { id: "9", name: "Rock Garden", category: "park", description: "Unique sculpture garden featuring recycled industrial materials, waterfalls, and artistic walkways.", distance: 2.8, rating: 4.8, emoji: "\u{1FAA8}", address: "Rock Garden, Sector 1, Chandigarh", openNow: true, tags: ["art", "nature", "sculpture"], travelTime: { car: 10, bike: 15, walk: 34 } },
  { id: "10", name: "Skyline Lounge", category: "club", description: "Exclusive sky bar with live jazz, premium cocktails, and the best city views in town.", distance: 3.1, rating: 4.5, emoji: "\u{1F378}", address: "Sector 43, Chandigarh", openNow: true, tags: ["jazz", "cocktails", "views"], travelTime: { car: 11, bike: 17, walk: 37 } },
  { id: "11", name: "Matcha & More", category: "cafe", description: "Japanese-inspired cafe with matcha drinks, acai bowls, and a tranquil zen garden setting.", distance: 1.1, rating: 4.6, emoji: "\u{1F375}", address: "Sector 8, Chandigarh", openNow: false, tags: ["matcha", "healthy", "zen"], travelTime: { car: 4, bike: 7, walk: 13 } },
  { id: "12", name: "FitZone Arena", category: "gym", description: "Modern sports complex with indoor swimming pool, squash courts, and CrossFit facilities.", distance: 3.8, rating: 4.4, emoji: "\u{1F3CA}", address: "Sector 38, Chandigarh", openNow: true, tags: ["swimming", "crossfit", "sports"], travelTime: { car: 14, bike: 20, walk: 46 } }
];
var PlacesService = class _PlacesService {
  _category = signal("all", ...ngDevMode ? [{ debugName: "_category" }] : (
    /* istanbul ignore next */
    []
  ));
  _travelMode = signal("car", ...ngDevMode ? [{ debugName: "_travelMode" }] : (
    /* istanbul ignore next */
    []
  ));
  _maxDistance = signal(10, ...ngDevMode ? [{ debugName: "_maxDistance" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedCategory = this._category.asReadonly();
  selectedTravelMode = this._travelMode.asReadonly();
  maxDistance = this._maxDistance.asReadonly();
  filteredPlaces = computed(() => {
    return MOCK_PLACES.filter((p) => {
      const catMatch = this._category() === "all" || p.category === this._category();
      const distMatch = p.distance <= this._maxDistance();
      return catMatch && distMatch;
    });
  }, ...ngDevMode ? [{ debugName: "filteredPlaces" }] : (
    /* istanbul ignore next */
    []
  ));
  setCategory(cat) {
    this._category.set(cat);
  }
  setTravelMode(mode) {
    this._travelMode.set(mode);
  }
  setMaxDistance(d) {
    this._maxDistance.set(d);
  }
  getTravelTime(place) {
    return place.travelTime[this._travelMode()];
  }
  static \u0275fac = function PlacesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlacesService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlacesService, factory: _PlacesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlacesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/services/match.service.ts
var MOCK_MATCHES = [
  { id: "m1", name: "Priya Singh", email: "priya@example.com", age: 21, location: "Sector 17, Chandigarh", interests: ["travel", "photography", "food", "yoga"], travelMode: "bike", maxDistance: 8, bio: "Avid traveler and food blogger. Always looking for the next hidden gem!", preferencesSet: true, compatibility: 92, mutualInterests: ["travel", "food"] },
  { id: "m2", name: "Rahul Verma", email: "rahul@example.com", age: 23, location: "Sector 22, Chandigarh", interests: ["music", "tech", "gaming", "coffee"], travelMode: "car", maxDistance: 15, bio: "Software developer by day, music producer by night. Let's grab coffee!", preferencesSet: true, compatibility: 87, mutualInterests: ["music", "tech"] },
  { id: "m3", name: "Sarah Johnson", email: "sarah@example.com", age: 22, location: "Sector 35, Chandigarh", interests: ["fitness", "travel", "reading", "art"], travelMode: "walk", maxDistance: 5, bio: "Fitness enthusiast and art lover. Coffee shops and bookstores are my happy place.", preferencesSet: true, compatibility: 85, mutualInterests: ["travel", "art"] },
  { id: "m4", name: "Arjun Kapoor", email: "arjun@example.com", age: 24, location: "Sector 43, Chandigarh", interests: ["sports", "food", "movies", "travel"], travelMode: "bike", maxDistance: 12, bio: "Sports fanatic who loves trying new restaurants. Weekend hiker and movie buff.", preferencesSet: true, compatibility: 79, mutualInterests: ["food", "travel"] },
  { id: "m5", name: "Natasha Sharma", email: "natasha@example.com", age: 20, location: "Sector 8, Chandigarh", interests: ["music", "dance", "food", "fashion"], travelMode: "car", maxDistance: 10, bio: "Classical dancer meets EDM lover. Foodie at heart, always up for new experiences!", preferencesSet: true, compatibility: 74, mutualInterests: ["music", "food"] },
  { id: "m6", name: "Alex Chen", email: "alex@example.com", age: 25, location: "Sector 26, Chandigarh", interests: ["tech", "gaming", "coffee", "cycling"], travelMode: "bike", maxDistance: 10, bio: "Frontend developer who loves building things and exploring on two wheels.", preferencesSet: true, compatibility: 68, mutualInterests: ["tech"] }
];
var MatchService = class _MatchService {
  getMatches() {
    return MOCK_MATCHES;
  }
  static \u0275fac = function MatchService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatchService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MatchService, factory: _MatchService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatchService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/services/chat.service.ts
var INITIAL_CONVOS = [
  {
    userId: "m1",
    userName: "Priya Singh",
    userAvatar: "PS",
    compatibility: 92,
    lastMessage: "That sounds amazing! When are you free?",
    lastTime: "2m ago",
    unread: 2,
    online: true,
    messages: [
      { id: "1", senderId: "m1", content: "Hey! I saw we matched on KYL. Your travel interests align perfectly with mine!", timestamp: /* @__PURE__ */ new Date(), isOwn: false },
      { id: "2", senderId: "1", content: "Hi Priya! Yes, I love exploring new places. Have you been to Rock Garden?", timestamp: /* @__PURE__ */ new Date(), isOwn: true },
      { id: "3", senderId: "m1", content: "Yes! It's incredible. I was thinking we could check out Sukhna Lake this weekend?", timestamp: /* @__PURE__ */ new Date(), isOwn: false },
      { id: "4", senderId: "m1", content: "That sounds amazing! When are you free?", timestamp: /* @__PURE__ */ new Date(), isOwn: false }
    ]
  },
  {
    userId: "m2",
    userName: "Rahul Verma",
    userAvatar: "RV",
    compatibility: 87,
    lastMessage: "Let me know if you want to check it out!",
    lastTime: "1h ago",
    unread: 0,
    online: true,
    messages: [
      { id: "5", senderId: "m2", content: "Yo! Fellow techie here. Do you use the Brew & Beans cafe for work?", timestamp: /* @__PURE__ */ new Date(), isOwn: false },
      { id: "6", senderId: "1", content: "All the time! Great wifi and amazing matcha lattes haha", timestamp: /* @__PURE__ */ new Date(), isOwn: true },
      { id: "7", senderId: "m2", content: "There's a tech meetup at Elante this Saturday. Let me know if you want to check it out!", timestamp: /* @__PURE__ */ new Date(), isOwn: false }
    ]
  },
  {
    userId: "m3",
    userName: "Sarah Johnson",
    userAvatar: "SJ",
    compatibility: 85,
    lastMessage: "See you there at 10am!",
    lastTime: "3h ago",
    unread: 1,
    online: false,
    messages: [
      { id: "8", senderId: "m3", content: "Hi! I noticed you're interested in art. Have you been to the Government Museum?", timestamp: /* @__PURE__ */ new Date(), isOwn: false },
      { id: "9", senderId: "1", content: "Not yet but it's on my list! Want to go together?", timestamp: /* @__PURE__ */ new Date(), isOwn: true },
      { id: "10", senderId: "m3", content: "Yes! They have a new modern art exhibition. How about this Sunday?", timestamp: /* @__PURE__ */ new Date(), isOwn: false },
      { id: "11", senderId: "m3", content: "See you there at 10am!", timestamp: /* @__PURE__ */ new Date(), isOwn: false }
    ]
  }
];
var ChatService = class _ChatService {
  _convos = signal(INITIAL_CONVOS, ...ngDevMode ? [{ debugName: "_convos" }] : (
    /* istanbul ignore next */
    []
  ));
  _activeId = signal(null, ...ngDevMode ? [{ debugName: "_activeId" }] : (
    /* istanbul ignore next */
    []
  ));
  conversations = this._convos.asReadonly();
  activeId = this._activeId.asReadonly();
  getConvo(userId) {
    return this._convos().find((c) => c.userId === userId);
  }
  setActive(userId) {
    this._activeId.set(userId);
    this._convos.update((cs) => cs.map((c) => c.userId === userId ? __spreadProps(__spreadValues({}, c), { unread: 0 }) : c));
  }
  sendMessage(userId, content) {
    const msg = {
      id: Date.now().toString(),
      senderId: "1",
      content,
      timestamp: /* @__PURE__ */ new Date(),
      isOwn: true
    };
    this._convos.update((cs) => cs.map((c) => c.userId === userId ? __spreadProps(__spreadValues({}, c), { messages: [...c.messages, msg], lastMessage: content, lastTime: "just now" }) : c));
    setTimeout(() => this._simulateReply(userId), 1500);
  }
  startConversation(userId, userName, userAvatar, compatibility) {
    const exists = this._convos().some((c) => c.userId === userId);
    if (!exists) {
      const convo = {
        userId,
        userName,
        userAvatar,
        compatibility,
        lastMessage: "New connection!",
        lastTime: "just now",
        unread: 0,
        online: true,
        messages: [{ id: Date.now().toString(), senderId: userId, content: `Hi! I saw we matched with ${compatibility}% compatibility. Would love to explore places together!`, timestamp: /* @__PURE__ */ new Date(), isOwn: false }]
      };
      this._convos.update((cs) => [convo, ...cs]);
    }
    this.setActive(userId);
  }
  _simulateReply(userId) {
    const replies = [
      "That sounds great! \u{1F60A}",
      "Totally agree!",
      "Let's plan something soon!",
      "I love that idea! When are you free?",
      "Amazing! I know the perfect spot."
    ];
    const msg = {
      id: Date.now().toString(),
      senderId: userId,
      content: replies[Math.floor(Math.random() * replies.length)],
      timestamp: /* @__PURE__ */ new Date(),
      isOwn: false
    };
    this._convos.update((cs) => cs.map((c) => c.userId === userId ? __spreadProps(__spreadValues({}, c), { messages: [...c.messages, msg], lastMessage: msg.content, lastTime: "just now" }) : c));
  }
  static \u0275fac = function ChatService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChatService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ChatService, factory: _ChatService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChatService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/services/ai-chat.service.ts
var AiChatService = class _AiChatService {
  _platformId = inject(PLATFORM_ID);
  _isBrowser = isPlatformBrowser(this._platformId);
  auth = inject(AuthService);
  ws = null;
  messages = signal([], ...ngDevMode ? [{ debugName: "messages" }] : (
    /* istanbul ignore next */
    []
  ));
  typing = signal(false, ...ngDevMode ? [{ debugName: "typing" }] : (
    /* istanbul ignore next */
    []
  ));
  connected = signal(false, ...ngDevMode ? [{ debugName: "connected" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  async connect() {
    if (!this._isBrowser)
      return;
    const token = this.auth.token();
    if (!token) {
      this.error.set("Not authenticated");
      return;
    }
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING))
      return;
    try {
      const res = await fetch(`${environment.apiBase}/chat/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        this.messages.set((data.messages || []).map((m) => ({ role: m.role, content: m.content, at: new Date(m.at) })));
      }
    } catch {
    }
    const url = `${environment.wsBase}/chat?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(url);
    this.ws = ws;
    ws.onopen = () => {
      this.connected.set(true);
      this.error.set(null);
    };
    ws.onclose = () => {
      this.connected.set(false);
    };
    ws.onerror = () => {
      this.error.set("Chat connection error");
    };
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === "typing")
          this.typing.set(!!msg.content);
        else if (msg.type === "assistant") {
          this.messages.update((arr) => [...arr, { role: "assistant", content: msg.content, at: /* @__PURE__ */ new Date() }]);
          this.typing.set(false);
        } else if (msg.type === "error") {
          this.error.set(msg.content);
          this.typing.set(false);
        }
      } catch {
      }
    };
  }
  send(content) {
    const text = content.trim();
    if (!text)
      return;
    this.messages.update((arr) => [...arr, { role: "user", content: text, at: /* @__PURE__ */ new Date() }]);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "user", content: text }));
      this.typing.set(true);
    } else {
      this.sendRest(text);
    }
  }
  async sendRest(content) {
    const token = this.auth.token();
    if (!token)
      return;
    this.typing.set(true);
    try {
      const res = await fetch(`${environment.apiBase}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content })
      });
      if (res.ok) {
        const { reply } = await res.json();
        this.messages.update((arr) => [...arr, { role: "assistant", content: reply, at: /* @__PURE__ */ new Date() }]);
      } else {
        this.error.set("AI service error");
      }
    } catch {
      this.error.set("Network error");
    } finally {
      this.typing.set(false);
    }
  }
  disconnect() {
    this.ws?.close();
    this.ws = null;
    this.connected.set(false);
  }
  static \u0275fac = function AiChatService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AiChatService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AiChatService, factory: _AiChatService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AiChatService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/pages/dashboard/dashboard.ts
var _c0 = ["chatEnd"];
var _c1 = () => [];
var _forTrack0 = ($index, $item) => $item.tab;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.mode;
var arrowFn0 = (ctx, view) => (n) => n[0];
var _forTrack3 = ($index, $item) => $item.userId;
function DashboardPage_For_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.totalUnread());
  }
}
function DashboardPage_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function DashboardPage_For_7_Template_button_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setTab(item_r2.tab));
    });
    \u0275\u0275elementStart(1, "span", 9);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, DashboardPage_For_7_Conditional_5_Template, 2, 1, "span", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activeTab() === item_r2.tab);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r2.tab === "chat" && ctx_r2.totalUnread() > 0 ? 5 : -1);
  }
}
function DashboardPage_Case_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F5FA}\uFE0F Explore Places ");
  }
}
function DashboardPage_Case_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F916} AI Travel Planner ");
  }
}
function DashboardPage_Case_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F4A1} Find Matches ");
  }
}
function DashboardPage_Case_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F4AC} Messages ");
  }
}
function DashboardPage_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function DashboardPage_For_32_Template_button_click_0_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setTab(item_r5.tab));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.activeTab() === item_r5.tab ? "bg-violet-500/20 text-violet-300" : "text-slate-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r5.icon, " ");
  }
}
function DashboardPage_Conditional_34_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function DashboardPage_Conditional_34_For_5_Template_button_click_0_listener() {
      const cat_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setCategory(cat_r8.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r2.placesService.selectedCategory() === cat_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", cat_r8.emoji, " ", cat_r8.label, " ");
  }
}
function DashboardPage_Conditional_34_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function DashboardPage_Conditional_34_For_11_Template_button_click_0_listener() {
      const tm_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setTravelMode(tm_r10.mode));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tm_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r2.placesService.selectedTravelMode() === tm_r10.mode);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", tm_r10.icon, " ", tm_r10.label, " ");
  }
}
function DashboardPage_Conditional_34_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 45);
    \u0275\u0275text(2, "\u{1F50D}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 46);
    \u0275\u0275text(4, "No places match your filters. Try expanding the distance.");
    \u0275\u0275elementEnd()();
  }
}
function DashboardPage_Conditional_34_For_26_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1, "\u25CF Open");
    \u0275\u0275elementEnd();
  }
}
function DashboardPage_Conditional_34_For_26_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 55);
    \u0275\u0275text(1, "\u25CF Closed");
    \u0275\u0275elementEnd();
  }
}
function DashboardPage_Conditional_34_For_26_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r11 = ctx.$implicit;
    \u0275\u0275classMap(s_r11 === "\u2605" ? "star" : "text-slate-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r11);
  }
}
function DashboardPage_Conditional_34_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 47)(2, "div", 14)(3, "div", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h3", 49);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 50);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "p", 51);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 52)(13, "span", 53);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, DashboardPage_Conditional_34_For_26_Conditional_15_Template, 2, 0, "span", 54)(16, DashboardPage_Conditional_34_For_26_Conditional_16_Template, 2, 0, "span", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 56)(18, "div", 57);
    \u0275\u0275repeaterCreate(19, DashboardPage_Conditional_34_For_26_For_20_Template, 2, 3, "span", 58, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(21, "span", 59);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 60)(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 61);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const place_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", place_r12.emoji, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(place_r12.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(place_r12.address);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(place_r12.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(place_r12.category);
    \u0275\u0275advance();
    \u0275\u0275conditional(place_r12.openNow ? 15 : 16);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.getStars(place_r12.rating));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(place_r12.rating);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4CD} ", place_r12.distance, "km");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u23F1 ", ctx_r2.getTravelTime(place_r12), "min");
  }
}
function DashboardPage_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 27)(2, "div", 28)(3, "div", 29);
    \u0275\u0275repeaterCreate(4, DashboardPage_Conditional_34_For_5_Template, 2, 4, "button", 30, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 31)(7, "span", 32);
    \u0275\u0275text(8, "Travel:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 33);
    \u0275\u0275repeaterCreate(10, DashboardPage_Conditional_34_For_11_Template, 2, 4, "button", 30, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 34)(13, "span", 35);
    \u0275\u0275text(14, "Max:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 36);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 37);
    \u0275\u0275listener("input", function DashboardPage_Conditional_34_Template_input_input_17_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.placesService.setMaxDistance(+$event.target.value));
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(18, "div", 38)(19, "p", 39)(20, "span", 40);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275text(22, " places found nearby");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(23, DashboardPage_Conditional_34_Conditional_23_Template, 5, 0, "div", 41);
    \u0275\u0275elementStart(24, "div", 42);
    \u0275\u0275repeaterCreate(25, DashboardPage_Conditional_34_For_26_Template, 28, 9, "div", 43, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.categories);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r2.travelModes);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r2.placesService.maxDistance(), "km");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.placesService.maxDistance());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.places().length);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.places().length === 0 ? 23 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.places());
  }
}
function DashboardPage_Conditional_35_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275text(1, "\u{1F916}");
    \u0275\u0275elementEnd();
  }
}
function DashboardPage_Conditional_35_For_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (((tmp_12_0 = ctx_r2.auth.currentUser()) == null ? null : tmp_12_0.name) || "U")[0], " ");
  }
}
function DashboardPage_Conditional_35_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275conditionalCreate(1, DashboardPage_Conditional_35_For_3_Conditional_1_Template, 2, 0, "div", 72);
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, DashboardPage_Conditional_35_For_3_Conditional_4_Template, 2, 1, "div", 73);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const msg_r14 = ctx.$implicit;
    \u0275\u0275classProp("justify-end", msg_r14.role === "user");
    \u0275\u0275advance();
    \u0275\u0275conditional(msg_r14.role === "assistant" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap(msg_r14.role === "assistant" ? "chat-bubble-ai text-slate-200" : "chat-bubble-user text-white");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", msg_r14.content, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(msg_r14.role === "user" ? 4 : -1);
  }
}
function DashboardPage_Conditional_35_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "div", 72);
    \u0275\u0275text(2, "\u{1F916}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 74);
    \u0275\u0275element(4, "span", 75)(5, "span", 76)(6, "span", 77);
    \u0275\u0275elementEnd()();
  }
}
function DashboardPage_Conditional_35_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 78);
    \u0275\u0275listener("click", function DashboardPage_Conditional_35_For_8_Template_button_click_0_listener() {
      const s_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.plannerInput = s_r16;
      return \u0275\u0275resetView(ctx_r2.sendPlannerMessage());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r16);
  }
}
function DashboardPage_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 62);
    \u0275\u0275repeaterCreate(2, DashboardPage_Conditional_35_For_3_Template, 5, 7, "div", 63, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275conditionalCreate(4, DashboardPage_Conditional_35_Conditional_4_Template, 7, 0, "div", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 65)(6, "div", 66);
    \u0275\u0275repeaterCreate(7, DashboardPage_Conditional_35_For_8_Template, 2, 1, "button", 67, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 68)(10, "div", 69)(11, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function DashboardPage_Conditional_35_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.plannerInput, $event) || (ctx_r2.plannerInput = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keydown.enter", function DashboardPage_Conditional_35_Template_input_keydown_enter_11_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.sendPlannerMessage());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 71);
    \u0275\u0275listener("click", function DashboardPage_Conditional_35_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.sendPlannerMessage());
    });
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "Send");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "\u2192");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.plannerMessages());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.plannerLoading() ? 4 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.plannerSuggestions);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.plannerInput);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.plannerLoading());
  }
}
function DashboardPage_Conditional_36_For_13_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const interest_r18 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2713 ", interest_r18);
  }
}
function DashboardPage_Conditional_36_For_13_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 98);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const interest_r19 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(interest_r19);
  }
}
function DashboardPage_Conditional_36_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 83)(1, "div", 84)(2, "div", 85);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 86)(5, "div", 87)(6, "h3", 88);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 35);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 89);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 90)(13, "div", 91)(14, "span", 92);
    \u0275\u0275text(15, "Compatibility");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 93);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 94);
    \u0275\u0275element(19, "div", 95);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "p", 96);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 97);
    \u0275\u0275repeaterCreate(23, DashboardPage_Conditional_36_For_13_For_24_Template, 2, 1, "span", 53, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275repeaterCreate(25, DashboardPage_Conditional_36_For_13_For_26_Template, 2, 1, "span", 98, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 99)(28, "span");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "button", 100);
    \u0275\u0275listener("click", function DashboardPage_Conditional_36_For_13_Template_button_click_32_listener() {
      const match_r20 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.connectMatch(match_r20));
    });
    \u0275\u0275elementStart(33, "span");
    \u0275\u0275text(34, "\u{1F4AC}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span");
    \u0275\u0275text(36, "Connect");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const match_r20 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", match_r20.name.split(" ").map(\u0275\u0275arrowFunction(11, arrowFn0, ctx)).join(""), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(match_r20.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", match_r20.age, "y");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4CD} ", match_r20.location);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", match_r20.compatibility, "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", match_r20.compatibility, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r20.bio);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(match_r20.mutualInterests);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(match_r20.interests.slice(0, 2));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", match_r20.travelMode === "car" ? "\u{1F697}" : match_r20.travelMode === "bike" ? "\u{1F6B2}" : "\u{1F6B6}", " ", match_r20.travelMode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4CD} Within ", match_r20.maxDistance, "km");
  }
}
function DashboardPage_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 27)(2, "div", 79)(3, "div", 14)(4, "span", 80);
    \u0275\u0275text(5, "\u2728");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "p", 40);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 81);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(11, "div", 82);
    \u0275\u0275repeaterCreate(12, DashboardPage_Conditional_36_For_13_Template, 37, 12, "div", 83, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx_r2.matches.length, " Compatible Matches Found!");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Based on your interests: ", (((tmp_2_0 = ctx_r2.auth.currentUser()) == null ? null : tmp_2_0.interests) || \u0275\u0275pureFunction0(2, _c1)).slice(0, 3).join(", "));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.matches);
  }
}
function DashboardPage_Conditional_37_For_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 110);
  }
}
function DashboardPage_Conditional_37_For_6_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 115);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const convo_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", convo_r22.unread, " ");
  }
}
function DashboardPage_Conditional_37_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 107);
    \u0275\u0275listener("click", function DashboardPage_Conditional_37_For_6_Template_button_click_0_listener() {
      const convo_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectConvo(convo_r22.userId));
    });
    \u0275\u0275elementStart(1, "div", 108)(2, "div", 109);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, DashboardPage_Conditional_37_For_6_Conditional_4_Template, 1, 0, "span", 110);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 86)(6, "div", 111)(7, "span", 112);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 35);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 113)(12, "p", 114);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, DashboardPage_Conditional_37_For_6_Conditional_14_Template, 2, 1, "span", 115);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const convo_r22 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r2.activeConvoId() === convo_r22.userId ? "bg-violet-600/10 border-l-2 border-l-violet-500" : "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", convo_r22.userAvatar, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(convo_r22.online ? 4 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(convo_r22.userName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(convo_r22.lastTime);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(convo_r22.lastMessage);
    \u0275\u0275advance();
    \u0275\u0275conditional(convo_r22.unread > 0 ? 14 : -1);
  }
}
function DashboardPage_Conditional_37_Conditional_8_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 119);
  }
}
function DashboardPage_Conditional_37_Conditional_8_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 122);
    \u0275\u0275text(1, "\u25CF Online");
    \u0275\u0275elementEnd();
  }
}
function DashboardPage_Conditional_37_Conditional_8_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 123);
    \u0275\u0275text(1, "Offline");
    \u0275\u0275elementEnd();
  }
}
function DashboardPage_Conditional_37_Conditional_8_For_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 130);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.activeConvo().userAvatar, " ");
  }
}
function DashboardPage_Conditional_37_Conditional_8_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275conditionalCreate(1, DashboardPage_Conditional_37_Conditional_8_For_15_Conditional_1_Template, 2, 1, "div", 130);
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const msg_r24 = ctx.$implicit;
    \u0275\u0275classProp("justify-end", msg_r24.isOwn);
    \u0275\u0275advance();
    \u0275\u0275conditional(!msg_r24.isOwn ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap(msg_r24.isOwn ? "chat-bubble-user" : "chat-bubble-ai text-slate-200");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", msg_r24.content, " ");
  }
}
function DashboardPage_Conditional_37_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 116)(1, "div", 117)(2, "div", 118);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, DashboardPage_Conditional_37_Conditional_8_Conditional_4_Template, 1, 0, "span", 119);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "p", 120);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 121);
    \u0275\u0275conditionalCreate(9, DashboardPage_Conditional_37_Conditional_8_Conditional_9_Template, 2, 0, "span", 122)(10, DashboardPage_Conditional_37_Conditional_8_Conditional_10_Template, 2, 0, "span", 123);
    \u0275\u0275elementStart(11, "span", 124);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(13, "div", 125);
    \u0275\u0275repeaterCreate(14, DashboardPage_Conditional_37_Conditional_8_For_15_Template, 4, 6, "div", 126, _forTrack1);
    \u0275\u0275element(16, "div", null, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 127)(19, "input", 128);
    \u0275\u0275twoWayListener("ngModelChange", function DashboardPage_Conditional_37_Conditional_8_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.chatInput, $event) || (ctx_r2.chatInput = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keydown.enter", function DashboardPage_Conditional_37_Conditional_8_Template_input_keydown_enter_19_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.sendChat());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 129);
    \u0275\u0275listener("click", function DashboardPage_Conditional_37_Conditional_8_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.sendChat());
    });
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Send");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24, "\u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.activeConvo().userAvatar, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeConvo().online ? 4 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.activeConvo().userName);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.activeConvo().online ? 9 : 10);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r2.activeConvo().compatibility, "% match");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.activeConvo().messages);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.chatInput);
  }
}
function DashboardPage_Conditional_37_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 106)(1, "div")(2, "div", 131);
    \u0275\u0275text(3, "\u{1F4AC}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 132);
    \u0275\u0275text(5, "No conversation selected");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 81);
    \u0275\u0275text(7, "Pick a chat from the list or connect with a match!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 133);
    \u0275\u0275listener("click", function DashboardPage_Conditional_37_Conditional_9_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setTab("matches"));
    });
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "\u{1F4A1}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12, "Find Matches");
    \u0275\u0275elementEnd()()()();
  }
}
function DashboardPage_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 101)(2, "div", 102)(3, "h3", 103);
    \u0275\u0275text(4, "Messages");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(5, DashboardPage_Conditional_37_For_6_Template, 15, 8, "button", 104, _forTrack3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 105);
    \u0275\u0275conditionalCreate(8, DashboardPage_Conditional_37_Conditional_8_Template, 25, 6)(9, DashboardPage_Conditional_37_Conditional_9_Template, 13, 0, "div", 106);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.conversations());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.activeConvo() ? 8 : 9);
  }
}
var DashboardPage = class _DashboardPage {
  chatEnd;
  auth = inject(AuthService);
  placesService = inject(PlacesService);
  matchService = inject(MatchService);
  chatService = inject(ChatService);
  ai = inject(AiChatService);
  router = inject(Router);
  ngOnInit() {
    this.ai.connect();
  }
  ngOnDestroy() {
    this.ai.disconnect();
  }
  activeTab = signal("explore", ...ngDevMode ? [{ debugName: "activeTab" }] : (
    /* istanbul ignore next */
    []
  ));
  sidebarOpen = signal(false, ...ngDevMode ? [{ debugName: "sidebarOpen" }] : (
    /* istanbul ignore next */
    []
  ));
  // Explore
  places = this.placesService.filteredPlaces;
  categories = [
    { id: "all", label: "All", emoji: "\u{1F310}" },
    { id: "park", label: "Parks", emoji: "\u{1F333}" },
    { id: "restaurant", label: "Restaurants", emoji: "\u{1F37D}\uFE0F" },
    { id: "club", label: "Clubs", emoji: "\u{1F3B5}" },
    { id: "cafe", label: "Cafes", emoji: "\u2615" },
    { id: "museum", label: "Museums", emoji: "\u{1F3DB}\uFE0F" },
    { id: "gym", label: "Gyms", emoji: "\u{1F4AA}" },
    { id: "shopping", label: "Shopping", emoji: "\u{1F6CD}\uFE0F" }
  ];
  travelModes = [
    { mode: "car", icon: "\u{1F697}", label: "Car" },
    { mode: "bike", icon: "\u{1F6B2}", label: "Bike" },
    { mode: "walk", icon: "\u{1F6B6}", label: "Walk" }
  ];
  setCategory(cat) {
    this.placesService.setCategory(cat);
  }
  setTravelMode(mode) {
    this.placesService.setTravelMode(mode);
  }
  getTravelTime(place) {
    return this.placesService.getTravelTime(place);
  }
  // AI Planner — backed by the WebSocket-powered Gemini service
  plannerInput = "";
  plannerMessages = computed(() => {
    const arr = this.ai.messages();
    if (arr.length === 0) {
      return [{ role: "assistant", content: `Hi! \u{1F44B} I'm your KYK companion. Tell me the kind of day you'd like \u2014 a calm morning, a social evening, an active outing \u2014 and I'll suggest places and people nearby that fit your vibe.` }];
    }
    return arr;
  }, ...ngDevMode ? [{ debugName: "plannerMessages" }] : (
    /* istanbul ignore next */
    []
  ));
  plannerLoading = computed(() => this.ai.typing(), ...ngDevMode ? [{ debugName: "plannerLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  sendPlannerMessage() {
    const text = this.plannerInput.trim();
    if (!text || this.plannerLoading())
      return;
    this.plannerInput = "";
    this.ai.send(text);
    this._shouldScroll = true;
  }
  // Matches
  matches = this.matchService.getMatches();
  connectMatch(match) {
    this.chatService.startConversation(match.id, match.name, match.name.split(" ").map((n) => n[0]).join(""), match.compatibility);
    this.activeTab.set("chat");
    this.chatService.setActive(match.id);
  }
  // Chat
  conversations = this.chatService.conversations;
  activeConvoId = this.chatService.activeId;
  activeConvo = computed(() => {
    const id = this.activeConvoId();
    return id ? this.chatService.getConvo(id) : null;
  }, ...ngDevMode ? [{ debugName: "activeConvo" }] : (
    /* istanbul ignore next */
    []
  ));
  chatInput = "";
  _shouldScroll = false;
  selectConvo(userId) {
    this.chatService.setActive(userId);
    this._shouldScroll = true;
  }
  sendChat() {
    const convoId = this.activeConvoId();
    if (!this.chatInput.trim() || !convoId)
      return;
    this.chatService.sendMessage(convoId, this.chatInput.trim());
    this.chatInput = "";
    this._shouldScroll = true;
  }
  ngAfterViewChecked() {
    if (this._shouldScroll && this.chatEnd) {
      this.chatEnd.nativeElement.scrollIntoView({ behavior: "smooth" });
      this._shouldScroll = false;
    }
  }
  setTab(tab) {
    this.activeTab.set(tab);
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/"]);
  }
  navItems = [
    { tab: "explore", icon: "\u{1F5FA}\uFE0F", label: "Explore" },
    { tab: "planner", icon: "\u{1F916}", label: "AI Planner" },
    { tab: "matches", icon: "\u{1F4A1}", label: "Matches" },
    { tab: "chat", icon: "\u{1F4AC}", label: "Chat" }
  ];
  totalUnread = computed(() => this.conversations().reduce((sum, c) => sum + c.unread, 0), ...ngDevMode ? [{ debugName: "totalUnread" }] : (
    /* istanbul ignore next */
    []
  ));
  getStars(rating) {
    return Array(5).fill("").map((_, i) => i < Math.floor(rating) ? "\u2605" : "\u2606");
  }
  plannerSuggestions = ["Plan a relaxing morning", "Evening outing with friends", "Active fitness day", "Cultural exploration"];
  static \u0275fac = function DashboardPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardPage, selectors: [["app-dashboard"]], viewQuery: function DashboardPage_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.chatEnd = _t.first);
    }
  }, decls: 38, vars: 8, consts: [["chatEnd", ""], [1, "bg-mesh", "min-h-screen", "flex"], [1, "hidden", "md:flex", "flex-col", "w-20", "glass", "border-r", "border-white/5", "py-6", "px-2", "fixed", "top-0", "left-0", "h-screen", "z-40"], [1, "text-center", "mb-8"], [1, "text-2xl"], [1, "flex", "flex-col", "gap-2", "flex-1"], [1, "sidebar-nav-item", 3, "active"], [1, "mt-auto"], [1, "sidebar-nav-item", "text-red-400/60", "hover:text-red-400", 3, "click"], [1, "icon"], [1, "flex-1", "md:ml-20", "flex", "flex-col"], [1, "glass", "border-b", "border-white/5", "px-6", "py-4", "flex", "items-center", "justify-between", "sticky", "top-0", "z-30"], [1, "font-bold", "text-white", "text-lg", "leading-tight"], [1, "text-slate-500", "text-xs"], [1, "flex", "items-center", "gap-3"], [1, "hidden", "sm:flex", "items-center", "gap-2", "glass", "px-3", "py-1.5", "rounded-xl", "border", "border-white/8"], [1, "w-6", "h-6", "rounded-lg", "bg-gradient-to-br", "from-violet-500", "to-cyan-500", "flex", "items-center", "justify-center", "text-xs", "font-bold"], [1, "text-sm", "text-slate-300", "font-medium"], [1, "flex", "md:hidden", "gap-1"], [1, "p-2", "rounded-lg", "text-lg", "transition-all", 3, "class"], [1, "flex-1", "overflow-hidden"], [1, "h-full", "overflow-y-auto"], [1, "h-full", "flex", "flex-col", 2, "height", "calc(100vh - 73px)"], [1, "h-full", "flex", 2, "height", "calc(100vh - 73px)"], [1, "sidebar-nav-item", 3, "click"], [1, "absolute", "top-1", "right-1", "w-4", "h-4", "bg-violet-500", "rounded-full", "text-[9px]", "font-bold", "flex", "items-center", "justify-center"], [1, "p-2", "rounded-lg", "text-lg", "transition-all", 3, "click"], [1, "p-6", "max-w-5xl", "mx-auto"], [1, "glass", "rounded-2xl", "p-4", "mb-6", "border", "border-white/5", "space-y-4"], [1, "flex", "flex-wrap", "gap-2"], [1, "filter-chip", 3, "active"], [1, "flex", "items-center", "gap-4", "pt-1", "border-t", "border-white/5"], [1, "text-xs", "text-slate-400", "font-medium"], [1, "flex", "gap-2"], [1, "ml-auto", "flex", "items-center", "gap-2"], [1, "text-xs", "text-slate-500"], [1, "text-xs", "gradient-text", "font-bold"], ["type", "range", "min", "1", "max", "20", 1, "w-24", "accent-violet-500", "cursor-pointer", 3, "input", "value"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-sm", "text-slate-400"], [1, "text-white", "font-semibold"], [1, "text-center", "py-20"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-4"], [1, "place-card"], [1, "filter-chip", 3, "click"], [1, "text-5xl", "mb-4"], [1, "text-slate-400"], [1, "flex", "items-start", "justify-between", "mb-3"], [1, "w-12", "h-12", "rounded-xl", "bg-gradient-to-br", "from-violet-600/20", "to-cyan-600/20", "flex", "items-center", "justify-center", "text-2xl", "border", "border-white/8"], [1, "font-semibold", "text-white", "text-sm", "leading-tight"], [1, "text-slate-500", "text-xs", "mt-0.5"], [1, "text-slate-400", "text-xs", "leading-relaxed", "mb-3"], [1, "flex", "items-center", "gap-2", "mb-3"], [1, "tag"], [1, "tag", 2, "background", "rgba(34,197,94,0.1)", "border-color", "rgba(34,197,94,0.3)", "color", "#4ade80"], [1, "tag", 2, "background", "rgba(239,68,68,0.1)", "border-color", "rgba(239,68,68,0.3)", "color", "#f87171"], [1, "flex", "items-center", "justify-between", "text-xs"], [1, "flex", "items-center", "gap-1"], [3, "class"], [1, "text-slate-400", "ml-1"], [1, "flex", "items-center", "gap-3", "text-slate-400"], [1, "gradient-text", "font-semibold"], [1, "flex-1", "overflow-y-auto", "p-6", "space-y-4", "max-w-3xl", "mx-auto", "w-full"], [1, "flex", "gap-3", 3, "justify-end"], [1, "flex", "gap-3"], [1, "px-6", "pb-2", "max-w-3xl", "mx-auto", "w-full"], [1, "flex", "gap-2", "overflow-x-auto", "pb-1"], [1, "filter-chip", "flex-shrink-0", "text-xs"], [1, "p-4", "border-t", "border-white/5", "glass"], [1, "flex", "gap-3", "max-w-3xl", "mx-auto"], ["placeholder", "Ask me to plan your perfect day...", 1, "input-field", "flex-1", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "btn-primary", "px-5", "py-3", "rounded-xl", "font-semibold", "flex", "items-center", "gap-1", 3, "click", "disabled"], [1, "w-8", "h-8", "rounded-full", "bg-gradient-to-br", "from-violet-500", "to-cyan-500", "flex", "items-center", "justify-center", "text-sm", "flex-shrink-0"], [1, "w-8", "h-8", "rounded-full", "bg-gradient-to-br", "from-violet-600", "to-indigo-600", "flex", "items-center", "justify-center", "text-sm", "font-bold", "flex-shrink-0"], [1, "chat-bubble-ai", "flex", "items-center", "gap-2"], [1, "w-2", "h-2", "rounded-full", "bg-violet-400", "animate-bounce", 2, "animation-delay", "0ms"], [1, "w-2", "h-2", "rounded-full", "bg-violet-400", "animate-bounce", 2, "animation-delay", "150ms"], [1, "w-2", "h-2", "rounded-full", "bg-violet-400", "animate-bounce", 2, "animation-delay", "300ms"], [1, "filter-chip", "flex-shrink-0", "text-xs", 3, "click"], [1, "glass", "rounded-2xl", "p-5", "mb-6", "border", "border-violet-500/10", "bg-gradient-to-r", "from-violet-600/5", "to-cyan-600/5"], [1, "text-3xl"], [1, "text-slate-400", "text-sm"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-5"], [1, "match-card"], [1, "flex", "items-start", "gap-3", "mb-4"], [1, "w-12", "h-12", "rounded-2xl", "bg-gradient-to-br", "from-violet-500", "to-cyan-500", "flex", "items-center", "justify-center", "text-lg", "font-bold", "flex-shrink-0"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "gap-2"], [1, "font-semibold", "text-white"], [1, "text-slate-500", "text-xs", "truncate"], [1, "mb-4"], [1, "flex", "justify-between", "items-center", "mb-1.5"], [1, "text-xs", "text-slate-400"], [1, "text-sm", "font-bold", "gradient-text"], [1, "compat-bar"], [1, "compat-fill"], [1, "text-slate-400", "text-xs", "leading-relaxed", "mb-4", "line-clamp-2"], [1, "flex", "flex-wrap", "gap-1.5", "mb-4"], [1, "tag", 2, "background", "rgba(255,255,255,0.05)", "border-color", "rgba(255,255,255,0.1)", "color", "rgba(255,255,255,0.4)"], [1, "flex", "items-center", "justify-between", "mb-4", "text-xs", "text-slate-500"], [1, "btn-primary", "w-full", "py-2.5", "rounded-xl", "text-sm", "font-semibold", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "w-72", "flex-shrink-0", "border-r", "border-white/5", "overflow-y-auto", "hidden", "sm:block"], [1, "p-4", "border-b", "border-white/5"], [1, "text-sm", "font-semibold", "text-slate-300"], [1, "w-full", "text-left", "p-4", "flex", "items-center", "gap-3", "border-b", "border-white/3", "transition-all", "hover:bg-white/4", 3, "class"], [1, "flex-1", "flex", "flex-col"], [1, "flex-1", "flex", "items-center", "justify-center", "text-center", "p-8"], [1, "w-full", "text-left", "p-4", "flex", "items-center", "gap-3", "border-b", "border-white/3", "transition-all", "hover:bg-white/4", 3, "click"], [1, "relative", "flex-shrink-0"], [1, "w-10", "h-10", "rounded-xl", "bg-gradient-to-br", "from-violet-500", "to-cyan-500", "flex", "items-center", "justify-center", "text-sm", "font-bold"], [1, "absolute", "-bottom-0.5", "-right-0.5", "w-3", "h-3", "rounded-full", "bg-green-500", "border-2", "border-[#070711]"], [1, "flex", "justify-between", "items-center"], [1, "text-sm", "font-medium", "text-white"], [1, "flex", "justify-between", "items-center", "mt-0.5"], [1, "text-xs", "text-slate-500", "truncate", "flex-1"], [1, "w-5", "h-5", "rounded-full", "bg-violet-500", "text-white", "text-[10px]", "font-bold", "flex", "items-center", "justify-center", "ml-2", "flex-shrink-0"], [1, "p-4", "border-b", "border-white/5", "flex", "items-center", "gap-3", "glass"], [1, "relative"], [1, "w-9", "h-9", "rounded-xl", "bg-gradient-to-br", "from-violet-500", "to-cyan-500", "flex", "items-center", "justify-center", "text-sm", "font-bold"], [1, "absolute", "-bottom-0.5", "-right-0.5", "w-2.5", "h-2.5", "rounded-full", "bg-green-500", "border-2", "border-[#070711]"], [1, "text-sm", "font-semibold", "text-white"], [1, "text-xs"], [1, "text-green-400"], [1, "text-slate-500"], [1, "text-slate-600", "ml-2"], [1, "flex-1", "overflow-y-auto", "p-4", "space-y-3"], [1, "flex", "gap-2", 3, "justify-end"], [1, "p-4", "border-t", "border-white/5", "flex", "gap-3"], ["placeholder", "Type a message...", 1, "input-field", "flex-1", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "btn-primary", "px-4", "py-3", "rounded-xl", "flex", "items-center", "gap-1.5", "font-semibold", 3, "click"], [1, "w-7", "h-7", "rounded-lg", "bg-gradient-to-br", "from-violet-500", "to-cyan-500", "flex", "items-center", "justify-center", "text-xs", "font-bold", "flex-shrink-0"], [1, "text-6xl", "mb-4"], [1, "text-white", "font-semibold", "text-lg", "mb-2"], [1, "btn-primary", "px-6", "py-2.5", "rounded-xl", "text-sm", "font-semibold", "mt-4", "inline-flex", "items-center", "gap-2", 3, "click"]], template: function DashboardPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "aside", 2)(2, "div", 3)(3, "span", 4);
      \u0275\u0275text(4, "\u{1F4CD}");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "nav", 5);
      \u0275\u0275repeaterCreate(6, DashboardPage_For_7_Template, 6, 5, "button", 6, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 7)(9, "button", 8);
      \u0275\u0275listener("click", function DashboardPage_Template_button_click_9_listener() {
        return ctx.logout();
      });
      \u0275\u0275elementStart(10, "span", 9);
      \u0275\u0275text(11, "\u{1F6AA}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "span");
      \u0275\u0275text(13, "Exit");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(14, "div", 10)(15, "header", 11)(16, "div")(17, "h1", 12);
      \u0275\u0275conditionalCreate(18, DashboardPage_Case_18_Template, 1, 0)(19, DashboardPage_Case_19_Template, 1, 0)(20, DashboardPage_Case_20_Template, 1, 0)(21, DashboardPage_Case_21_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "p", 13);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 14)(25, "div", 15)(26, "span", 16);
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "span", 17);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 18);
      \u0275\u0275repeaterCreate(31, DashboardPage_For_32_Template, 2, 3, "button", 19, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "main", 20);
      \u0275\u0275conditionalCreate(34, DashboardPage_Conditional_34_Template, 27, 4, "div", 21);
      \u0275\u0275conditionalCreate(35, DashboardPage_Conditional_35_Template, 17, 3, "div", 22);
      \u0275\u0275conditionalCreate(36, DashboardPage_Conditional_36_Template, 14, 3, "div", 21);
      \u0275\u0275conditionalCreate(37, DashboardPage_Conditional_37_Template, 10, 1, "div", 23);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.navItems);
      \u0275\u0275advance(12);
      \u0275\u0275conditional((tmp_1_0 = ctx.activeTab()) === "explore" ? 18 : tmp_1_0 === "planner" ? 19 : tmp_1_0 === "matches" ? 20 : tmp_1_0 === "chat" ? 21 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_2_0 = ctx.auth.currentUser()) == null ? null : tmp_2_0.location) || "Chandigarh, India");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", (((tmp_3_0 = ctx.auth.currentUser()) == null ? null : tmp_3_0.name) || "U")[0], " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate((((tmp_4_0 = ctx.auth.currentUser()) == null ? null : tmp_4_0.name) || "User").split(" ")[0]);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.navItems);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.activeTab() === "explore" ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "planner" ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "matches" ? 36 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "chat" ? 37 : -1);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.sidebar-nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  padding: 10px 8px;\n  border-radius: 14px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-size: 0.65rem;\n  color: rgba(255, 255, 255, 0.4);\n  border: 1px solid transparent;\n  width: 100%;\n}\n.sidebar-nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.06);\n  color: rgba(255, 255, 255, 0.7);\n}\n.sidebar-nav-item.active[_ngcontent-%COMP%] {\n  background: rgba(124, 58, 237, 0.2);\n  border-color: rgba(124, 58, 237, 0.3);\n  color: #a78bfa;\n}\n.sidebar-nav-item[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n}\n.place-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.07);\n  border-radius: 16px;\n  padding: 16px;\n  transition: all 0.25s ease;\n  cursor: pointer;\n}\n.place-card[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.07);\n  border-color: rgba(139, 92, 246, 0.25);\n  transform: translateY(-2px);\n  box-shadow: 0 16px 32px rgba(139, 92, 246, 0.08);\n}\n.match-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.07);\n  border-radius: 20px;\n  padding: 20px;\n  transition: all 0.25s ease;\n}\n.match-card[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.07);\n  border-color: rgba(139, 92, 246, 0.2);\n  transform: translateY(-2px);\n  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.08);\n}\n.chat-bubble-ai[_ngcontent-%COMP%] {\n  background: rgba(139, 92, 246, 0.12);\n  border: 1px solid rgba(139, 92, 246, 0.2);\n  border-radius: 18px 18px 18px 4px;\n  padding: 12px 16px;\n  max-width: 80%;\n  font-size: 0.875rem;\n  line-height: 1.6;\n  white-space: pre-wrap;\n}\n.chat-bubble-user[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(124, 58, 237, 0.5),\n      rgba(14, 165, 233, 0.4));\n  border: 1px solid rgba(124, 58, 237, 0.3);\n  border-radius: 18px 18px 4px 18px;\n  padding: 12px 16px;\n  max-width: 80%;\n  font-size: 0.875rem;\n  line-height: 1.6;\n  margin-left: auto;\n}\n.filter-chip[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(255, 255, 255, 0.04);\n  color: rgba(255, 255, 255, 0.6);\n  white-space: nowrap;\n}\n.filter-chip[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: white;\n}\n.filter-chip.active[_ngcontent-%COMP%] {\n  background: rgba(124, 58, 237, 0.25);\n  border-color: rgba(124, 58, 237, 0.5);\n  color: #c4b5fd;\n}\n/*# sourceMappingURL=dashboard.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardPage, [{
    type: Component,
    args: [{ selector: "app-dashboard", imports: [FormsModule], template: `<div class="bg-mesh min-h-screen flex">

  <!-- Sidebar -->
  <aside class="hidden md:flex flex-col w-20 glass border-r border-white/5 py-6 px-2 fixed top-0 left-0 h-screen z-40">
    <div class="text-center mb-8">
      <span class="text-2xl">\u{1F4CD}</span>
    </div>

    <nav class="flex flex-col gap-2 flex-1">
      @for (item of navItems; track item.tab) {
        <button class="sidebar-nav-item" [class.active]="activeTab() === item.tab" (click)="setTab(item.tab)">
          <span class="icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
          @if (item.tab === 'chat' && totalUnread() > 0) {
            <span class="absolute top-1 right-1 w-4 h-4 bg-violet-500 rounded-full text-[9px] font-bold flex items-center justify-center">{{ totalUnread() }}</span>
          }
        </button>
      }
    </nav>

    <div class="mt-auto">
      <button (click)="logout()" class="sidebar-nav-item text-red-400/60 hover:text-red-400">
        <span class="icon">\u{1F6AA}</span>
        <span>Exit</span>
      </button>
    </div>
  </aside>

  <!-- Main content -->
  <div class="flex-1 md:ml-20 flex flex-col">

    <!-- Top bar -->
    <header class="glass border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 class="font-bold text-white text-lg leading-tight">
          @switch (activeTab()) {
            @case ('explore') { \u{1F5FA}\uFE0F Explore Places }
            @case ('planner') { \u{1F916} AI Travel Planner }
            @case ('matches') { \u{1F4A1} Find Matches }
            @case ('chat') { \u{1F4AC} Messages }
          }
        </h1>
        <p class="text-slate-500 text-xs">{{ auth.currentUser()?.location || 'Chandigarh, India' }}</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2 glass px-3 py-1.5 rounded-xl border border-white/8">
          <span class="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold">
            {{ (auth.currentUser()?.name || 'U')[0] }}
          </span>
          <span class="text-sm text-slate-300 font-medium">{{ (auth.currentUser()?.name || 'User').split(' ')[0] }}</span>
        </div>
        <!-- Mobile nav -->
        <div class="flex md:hidden gap-1">
          @for (item of navItems; track item.tab) {
            <button (click)="setTab(item.tab)" class="p-2 rounded-lg text-lg transition-all"
              [class]="activeTab() === item.tab ? 'bg-violet-500/20 text-violet-300' : 'text-slate-500'">
              {{ item.icon }}
            </button>
          }
        </div>
      </div>
    </header>

    <!-- TAB CONTENT -->
    <main class="flex-1 overflow-hidden">

      <!-- ===== EXPLORE TAB ===== -->
      @if (activeTab() === 'explore') {
        <div class="h-full overflow-y-auto">
          <div class="p-6 max-w-5xl mx-auto">

            <!-- Filters -->
            <div class="glass rounded-2xl p-4 mb-6 border border-white/5 space-y-4">
              <div class="flex flex-wrap gap-2">
                @for (cat of categories; track cat.id) {
                  <button class="filter-chip" [class.active]="placesService.selectedCategory() === cat.id"
                    (click)="setCategory(cat.id)">
                    {{ cat.emoji }} {{ cat.label }}
                  </button>
                }
              </div>
              <div class="flex items-center gap-4 pt-1 border-t border-white/5">
                <span class="text-xs text-slate-400 font-medium">Travel:</span>
                <div class="flex gap-2">
                  @for (tm of travelModes; track tm.mode) {
                    <button class="filter-chip" [class.active]="placesService.selectedTravelMode() === tm.mode"
                      (click)="setTravelMode(tm.mode)">
                      {{ tm.icon }} {{ tm.label }}
                    </button>
                  }
                </div>
                <div class="ml-auto flex items-center gap-2">
                  <span class="text-xs text-slate-500">Max:</span>
                  <span class="text-xs gradient-text font-bold">{{ placesService.maxDistance() }}km</span>
                  <input type="range" min="1" max="20" [value]="placesService.maxDistance()"
                    (input)="placesService.setMaxDistance(+$any($event.target).value)"
                    class="w-24 accent-violet-500 cursor-pointer">
                </div>
              </div>
            </div>

            <!-- Results count -->
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm text-slate-400"><span class="text-white font-semibold">{{ places().length }}</span> places found nearby</p>
            </div>

            <!-- Places grid -->
            @if (places().length === 0) {
              <div class="text-center py-20">
                <div class="text-5xl mb-4">\u{1F50D}</div>
                <p class="text-slate-400">No places match your filters. Try expanding the distance.</p>
              </div>
            }
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              @for (place of places(); track place.id) {
                <div class="place-card">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 flex items-center justify-center text-2xl border border-white/8">
                        {{ place.emoji }}
                      </div>
                      <div>
                        <h3 class="font-semibold text-white text-sm leading-tight">{{ place.name }}</h3>
                        <p class="text-slate-500 text-xs mt-0.5">{{ place.address }}</p>
                      </div>
                    </div>
                  </div>

                  <p class="text-slate-400 text-xs leading-relaxed mb-3">{{ place.description }}</p>

                  <div class="flex items-center gap-2 mb-3">
                    <span class="tag">{{ place.category }}</span>
                    @if (place.openNow) {
                      <span class="tag" style="background:rgba(34,197,94,0.1);border-color:rgba(34,197,94,0.3);color:#4ade80">\u25CF Open</span>
                    } @else {
                      <span class="tag" style="background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.3);color:#f87171">\u25CF Closed</span>
                    }
                  </div>

                  <div class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-1">
                      @for (s of getStars(place.rating); track $index) {
                        <span [class]="s === '\u2605' ? 'star' : 'text-slate-600'">{{ s }}</span>
                      }
                      <span class="text-slate-400 ml-1">{{ place.rating }}</span>
                    </div>
                    <div class="flex items-center gap-3 text-slate-400">
                      <span>\u{1F4CD} {{ place.distance }}km</span>
                      <span class="gradient-text font-semibold">\u23F1 {{ getTravelTime(place) }}min</span>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }

      <!-- ===== AI PLANNER TAB ===== -->
      @if (activeTab() === 'planner') {
        <div class="h-full flex flex-col" style="height: calc(100vh - 73px)">

          <!-- Chat messages -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4 max-w-3xl mx-auto w-full">
            @for (msg of plannerMessages(); track $index) {
              <div class="flex gap-3" [class.justify-end]="msg.role === 'user'">
                @if (msg.role === 'assistant') {
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-sm flex-shrink-0">\u{1F916}</div>
                }
                <div [class]="msg.role === 'assistant' ? 'chat-bubble-ai text-slate-200' : 'chat-bubble-user text-white'">
                  {{ msg.content }}
                </div>
                @if (msg.role === 'user') {
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {{ (auth.currentUser()?.name || 'U')[0] }}
                  </div>
                }
              </div>
            }

            @if (plannerLoading()) {
              <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-sm flex-shrink-0">\u{1F916}</div>
                <div class="chat-bubble-ai flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style="animation-delay:0ms"></span>
                  <span class="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style="animation-delay:150ms"></span>
                  <span class="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style="animation-delay:300ms"></span>
                </div>
              </div>
            }
          </div>

          <!-- Quick suggestions -->
          <div class="px-6 pb-2 max-w-3xl mx-auto w-full">
            <div class="flex gap-2 overflow-x-auto pb-1">
              @for (s of plannerSuggestions; track s) {
                <button (click)="plannerInput = s; sendPlannerMessage()"
                  class="filter-chip flex-shrink-0 text-xs">{{ s }}</button>
              }
            </div>
          </div>

          <!-- Input -->
          <div class="p-4 border-t border-white/5 glass">
            <div class="flex gap-3 max-w-3xl mx-auto">
              <input [(ngModel)]="plannerInput" (keydown.enter)="sendPlannerMessage()"
                class="input-field flex-1" placeholder="Ask me to plan your perfect day...">
              <button (click)="sendPlannerMessage()" [disabled]="plannerLoading()"
                class="btn-primary px-5 py-3 rounded-xl font-semibold flex items-center gap-1">
                <span>Send</span><span>\u2192</span>
              </button>
            </div>
          </div>
        </div>
      }

      <!-- ===== MATCHES TAB ===== -->
      @if (activeTab() === 'matches') {
        <div class="h-full overflow-y-auto">
          <div class="p-6 max-w-5xl mx-auto">
            <div class="glass rounded-2xl p-5 mb-6 border border-violet-500/10 bg-gradient-to-r from-violet-600/5 to-cyan-600/5">
              <div class="flex items-center gap-3">
                <span class="text-3xl">\u2728</span>
                <div>
                  <p class="text-white font-semibold">{{ matches.length }} Compatible Matches Found!</p>
                  <p class="text-slate-400 text-sm">Based on your interests: {{ (auth.currentUser()?.interests || []).slice(0,3).join(', ') }}</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              @for (match of matches; track match.id) {
                <div class="match-card">
                  <div class="flex items-start gap-3 mb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {{ match.name.split(' ').map(n => n[0]).join('') }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2">
                        <h3 class="font-semibold text-white">{{ match.name }}</h3>
                        <span class="text-xs text-slate-500">{{ match.age }}y</span>
                      </div>
                      <p class="text-slate-500 text-xs truncate">\u{1F4CD} {{ match.location }}</p>
                    </div>
                  </div>

                  <!-- Compatibility -->
                  <div class="mb-4">
                    <div class="flex justify-between items-center mb-1.5">
                      <span class="text-xs text-slate-400">Compatibility</span>
                      <span class="text-sm font-bold gradient-text">{{ match.compatibility }}%</span>
                    </div>
                    <div class="compat-bar">
                      <div class="compat-fill" [style.width.%]="match.compatibility"></div>
                    </div>
                  </div>

                  <p class="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">{{ match.bio }}</p>

                  <!-- Mutual interests -->
                  <div class="flex flex-wrap gap-1.5 mb-4">
                    @for (interest of match.mutualInterests; track interest) {
                      <span class="tag">\u2713 {{ interest }}</span>
                    }
                    @for (interest of match.interests.slice(0,2); track interest) {
                      <span class="tag" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:rgba(255,255,255,0.4)">{{ interest }}</span>
                    }
                  </div>

                  <!-- Travel mode -->
                  <div class="flex items-center justify-between mb-4 text-xs text-slate-500">
                    <span>{{ match.travelMode === 'car' ? '\u{1F697}' : match.travelMode === 'bike' ? '\u{1F6B2}' : '\u{1F6B6}' }} {{ match.travelMode }}</span>
                    <span>\u{1F4CD} Within {{ match.maxDistance }}km</span>
                  </div>

                  <button (click)="connectMatch(match)"
                    class="btn-primary w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                    <span>\u{1F4AC}</span><span>Connect</span>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      }

      <!-- ===== CHAT TAB ===== -->
      @if (activeTab() === 'chat') {
        <div class="h-full flex" style="height: calc(100vh - 73px)">

          <!-- Conversations list -->
          <div class="w-72 flex-shrink-0 border-r border-white/5 overflow-y-auto hidden sm:block">
            <div class="p-4 border-b border-white/5">
              <h3 class="text-sm font-semibold text-slate-300">Messages</h3>
            </div>
            @for (convo of conversations(); track convo.userId) {
              <button class="w-full text-left p-4 flex items-center gap-3 border-b border-white/3 transition-all hover:bg-white/4"
                [class]="activeConvoId() === convo.userId ? 'bg-violet-600/10 border-l-2 border-l-violet-500' : ''"
                (click)="selectConvo(convo.userId)">
                <div class="relative flex-shrink-0">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                    {{ convo.userAvatar }}
                  </div>
                  @if (convo.online) {
                    <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#070711]"></span>
                  }
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-white">{{ convo.userName }}</span>
                    <span class="text-xs text-slate-500">{{ convo.lastTime }}</span>
                  </div>
                  <div class="flex justify-between items-center mt-0.5">
                    <p class="text-xs text-slate-500 truncate flex-1">{{ convo.lastMessage }}</p>
                    @if (convo.unread > 0) {
                      <span class="w-5 h-5 rounded-full bg-violet-500 text-white text-[10px] font-bold flex items-center justify-center ml-2 flex-shrink-0">
                        {{ convo.unread }}
                      </span>
                    }
                  </div>
                </div>
              </button>
            }
          </div>

          <!-- Chat area -->
          <div class="flex-1 flex flex-col">
            @if (activeConvo()) {
              <!-- Chat header -->
              <div class="p-4 border-b border-white/5 flex items-center gap-3 glass">
                <div class="relative">
                  <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                    {{ activeConvo()!.userAvatar }}
                  </div>
                  @if (activeConvo()!.online) {
                    <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#070711]"></span>
                  }
                </div>
                <div>
                  <p class="text-sm font-semibold text-white">{{ activeConvo()!.userName }}</p>
                  <p class="text-xs">
                    @if (activeConvo()!.online) { <span class="text-green-400">\u25CF Online</span> } @else { <span class="text-slate-500">Offline</span> }
                    <span class="text-slate-600 ml-2">{{ activeConvo()!.compatibility }}% match</span>
                  </p>
                </div>
              </div>

              <!-- Messages -->
              <div class="flex-1 overflow-y-auto p-4 space-y-3">
                @for (msg of activeConvo()!.messages; track msg.id) {
                  <div class="flex gap-2" [class.justify-end]="msg.isOwn">
                    @if (!msg.isOwn) {
                      <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {{ activeConvo()!.userAvatar }}
                      </div>
                    }
                    <div [class]="msg.isOwn ? 'chat-bubble-user' : 'chat-bubble-ai text-slate-200'">
                      {{ msg.content }}
                    </div>
                  </div>
                }
                <div #chatEnd></div>
              </div>

              <!-- Input -->
              <div class="p-4 border-t border-white/5 flex gap-3">
                <input [(ngModel)]="chatInput" (keydown.enter)="sendChat()"
                  class="input-field flex-1" placeholder="Type a message...">
                <button (click)="sendChat()" class="btn-primary px-4 py-3 rounded-xl flex items-center gap-1.5 font-semibold">
                  <span>Send</span> <span>\u2192</span>
                </button>
              </div>
            } @else {
              <div class="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <div class="text-6xl mb-4">\u{1F4AC}</div>
                  <h3 class="text-white font-semibold text-lg mb-2">No conversation selected</h3>
                  <p class="text-slate-400 text-sm">Pick a chat from the list or connect with a match!</p>
                  <button (click)="setTab('matches')" class="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold mt-4 inline-flex items-center gap-2">
                    <span>\u{1F4A1}</span><span>Find Matches</span>
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      }

    </main>
  </div>
</div>
`, styles: ["/* src/app/pages/dashboard/dashboard.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.sidebar-nav-item {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  padding: 10px 8px;\n  border-radius: 14px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-size: 0.65rem;\n  color: rgba(255, 255, 255, 0.4);\n  border: 1px solid transparent;\n  width: 100%;\n}\n.sidebar-nav-item:hover {\n  background: rgba(255, 255, 255, 0.06);\n  color: rgba(255, 255, 255, 0.7);\n}\n.sidebar-nav-item.active {\n  background: rgba(124, 58, 237, 0.2);\n  border-color: rgba(124, 58, 237, 0.3);\n  color: #a78bfa;\n}\n.sidebar-nav-item .icon {\n  font-size: 1.3rem;\n}\n.place-card {\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.07);\n  border-radius: 16px;\n  padding: 16px;\n  transition: all 0.25s ease;\n  cursor: pointer;\n}\n.place-card:hover {\n  background: rgba(255, 255, 255, 0.07);\n  border-color: rgba(139, 92, 246, 0.25);\n  transform: translateY(-2px);\n  box-shadow: 0 16px 32px rgba(139, 92, 246, 0.08);\n}\n.match-card {\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.07);\n  border-radius: 20px;\n  padding: 20px;\n  transition: all 0.25s ease;\n}\n.match-card:hover {\n  background: rgba(255, 255, 255, 0.07);\n  border-color: rgba(139, 92, 246, 0.2);\n  transform: translateY(-2px);\n  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.08);\n}\n.chat-bubble-ai {\n  background: rgba(139, 92, 246, 0.12);\n  border: 1px solid rgba(139, 92, 246, 0.2);\n  border-radius: 18px 18px 18px 4px;\n  padding: 12px 16px;\n  max-width: 80%;\n  font-size: 0.875rem;\n  line-height: 1.6;\n  white-space: pre-wrap;\n}\n.chat-bubble-user {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(124, 58, 237, 0.5),\n      rgba(14, 165, 233, 0.4));\n  border: 1px solid rgba(124, 58, 237, 0.3);\n  border-radius: 18px 18px 4px 18px;\n  padding: 12px 16px;\n  max-width: 80%;\n  font-size: 0.875rem;\n  line-height: 1.6;\n  margin-left: auto;\n}\n.filter-chip {\n  padding: 6px 14px;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(255, 255, 255, 0.04);\n  color: rgba(255, 255, 255, 0.6);\n  white-space: nowrap;\n}\n.filter-chip:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: white;\n}\n.filter-chip.active {\n  background: rgba(124, 58, 237, 0.25);\n  border-color: rgba(124, 58, 237, 0.5);\n  color: #c4b5fd;\n}\n/*# sourceMappingURL=dashboard.css.map */\n"] }]
  }], null, { chatEnd: [{
    type: ViewChild,
    args: ["chatEnd"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardPage, { className: "DashboardPage", filePath: "src/app/pages/dashboard/dashboard.ts", lineNumber: 20 });
})();
export {
  DashboardPage
};
//# sourceMappingURL=chunk-XX3KB4KK.js.map
