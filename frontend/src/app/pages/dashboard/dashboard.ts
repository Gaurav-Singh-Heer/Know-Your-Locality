import { Component, signal, computed, inject, ViewChild, ElementRef, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PlacesService } from '../../services/places.service';
import { MatchService } from '../../services/match.service';
import { ChatService } from '../../services/chat.service';
import { AiChatService } from '../../services/ai-chat.service';
import { GeolocationService } from '../../services/geolocation.service';
import { Place, PlaceCategory } from '../../models/place.model';
import { TravelMode } from '../../models/user.model';

type Tab = 'explore' | 'planner' | 'matches' | 'chat';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardPage implements AfterViewChecked, OnInit, OnDestroy {
  @ViewChild('chatEnd') chatEnd?: ElementRef;
  @ViewChild('plannerEnd') plannerEnd?: ElementRef;

  readonly auth = inject(AuthService);
  readonly placesService = inject(PlacesService);
  readonly matchService = inject(MatchService);
  readonly chatService = inject(ChatService);
  readonly ai = inject(AiChatService);
  readonly geo = inject(GeolocationService);
  private router = inject(Router);

  ngOnInit() {
    this.ai.connect();
    this._loadPlaces();
    this.matchService.fetchMatches();
    this.chatService.loadConversations();
  }
  ngOnDestroy() { this.ai.disconnect(); }

  private async _loadPlaces() {
    let coords = this.geo.coords();
    if (!coords) coords = await this.geo.request();
    if (coords) this.placesService.fetchNearby(coords.lat, coords.lng, 'Current Location');
  }

  // Location editing
  editingLocation = false;
  locationInput = '';
  locationSearching = false;
  locationError = '';

  startEditLocation() { this.editingLocation = true; this.locationInput = ''; this.locationError = ''; }
  cancelEditLocation() { this.editingLocation = false; this.locationError = ''; }

  async useGPS() {
    this.editingLocation = false;
    const coords = await this.geo.request();
    if (coords) this.placesService.fetchNearby(coords.lat, coords.lng, 'Current Location');
  }

  async applyLocation() {
    const q = this.locationInput.trim();
    if (!q) return;
    this.locationSearching = true;
    this.locationError = '';
    const result = await this.placesService.searchLocation(q);
    this.locationSearching = false;
    if (result) {
      this.editingLocation = false;
      this.placesService.fetchNearby(result.lat, result.lng, result.name);
    } else {
      this.locationError = 'Location not found. Try a different name.';
    }
  }

  activeTab = signal<Tab>('explore');
  sidebarOpen = signal(false);

  // Explore
  places = this.placesService.filteredPlaces;
  categories: { id: PlaceCategory | 'all'; label: string; emoji: string }[] = [
    { id: 'all', label: 'All', emoji: '🌐' },
    { id: 'park', label: 'Parks', emoji: '🌳' },
    { id: 'restaurant', label: 'Restaurants', emoji: '🍽️' },
    { id: 'club', label: 'Clubs', emoji: '🎵' },
    { id: 'cafe', label: 'Cafes', emoji: '☕' },
    { id: 'museum', label: 'Museums', emoji: '🏛️' },
    { id: 'gym', label: 'Gyms', emoji: '💪' },
    { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  ];
  travelModes: { mode: TravelMode; icon: string; label: string }[] = [
    { mode: 'car', icon: '🚗', label: 'Car' },
    { mode: 'bike', icon: '🚲', label: 'Bike' },
    { mode: 'walk', icon: '🚶', label: 'Walk' },
  ];

  setCategory(cat: PlaceCategory | 'all') { this.placesService.setCategory(cat); }

  setTravelMode(mode: TravelMode) {
    this.placesService.setTravelMode(mode);
    const cap = this.geo.capFor(mode);
    if (this.placesService.maxDistance() > cap) {
      this.placesService.setMaxDistance(cap);
    }
    this.placesService.refresh();
  }

  onDistanceRelease() { this.placesService.refresh(); }

  getTravelTime(place: any) { return this.placesService.getTravelTime(place); }

  // AI Planner — backed by the WebSocket-powered Gemini service
  plannerInput = '';
  private _shouldScrollPlanner = false;
  private _lastPlannerMsgCount = 0;

  plannerMessages = computed(() => this.ai.messages());
  plannerLoading = computed(() => this.ai.typing());

  plannerFeatures = [
    { icon: '🗺️', label: 'Discover places nearby' },
    { icon: '👥', label: 'Match with locals' },
    { icon: '📅', label: 'Plan your full day' },
    { icon: '✨', label: 'Personalized to your vibe' },
  ];

  sendPlannerMessage() {
    const text = this.plannerInput.trim();
    if (!text || this.plannerLoading()) return;
    this.plannerInput = '';
    this.ai.setLocationContext(this._buildLocationContext());
    this.ai.send(text);
    this._shouldScrollPlanner = true;
  }

  private _buildLocationContext(): string {
    const locationName = this.placesService.locationName();
    const coords = this.geo.coords();
    const travelMode = this.placesService.selectedTravelMode();
    const maxDist = this.placesService.maxDistance();
    const places = this.placesService.filteredPlaces();

    const lines: string[] = [];
    if (locationName) lines.push(`User's location: ${locationName}`);
    if (coords) lines.push(`Coordinates: ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
    lines.push(`Travel mode: ${travelMode} | Max distance: ${maxDist}km`);
    if (places.length > 0) {
      lines.push(`Nearby places (${places.length} found):`);
      places.slice(0, 20).forEach((p: Place) => {
        const status = p.openNow ? 'open' : 'closed';
        lines.push(`- ${p.name} (${p.category}, ${p.distance}km away, ${status}, ★${p.rating})`);
      });
    } else {
      lines.push('No nearby places loaded yet — suggest the user explore the Explore tab first.');
    }
    return lines.join('\n');
  }

  formatTime(d: Date | undefined): string {
    if (!d) return '';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Matches
  matches = this.matchService.matches;

  async connectMatch(match: any) {
    await this.chatService.startConversation(
      match.id, match.name,
      match.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
      match.compatibility
    );
    this.activeTab.set('chat');
  }

  // Chat
  conversations = this.chatService.conversations;
  activeConvoId = this.chatService.activeId;
  activeConvo = computed(() => {
    const id = this.activeConvoId();
    return id ? this.chatService.getConvo(id) : null;
  });
  chatInput = '';
  private _shouldScroll = false;
  private _lastChatMsgCount = 0;

  selectConvo(userId: string) {
    this.chatService.setActive(userId);
    this._shouldScroll = true;
  }

  sendChat() {
    const convoId = this.activeConvoId();
    if (!this.chatInput.trim() || !convoId) return;
    this.chatService.sendMessage(convoId, this.chatInput.trim());
    this.chatInput = '';
    this._shouldScroll = true;
  }

  ngAfterViewChecked() {
    // Auto-scroll chat when new messages arrive (sent or received)
    const chatMsgCount = this.chatService.messages().length;
    if (chatMsgCount > this._lastChatMsgCount) {
      this._lastChatMsgCount = chatMsgCount;
      this._shouldScroll = true;
    }
    if (this._shouldScroll && this.chatEnd) {
      this.chatEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this._shouldScroll = false;
    }
    // Auto-scroll planner whenever a new message arrives (user or AI)
    const msgCount = this.ai.messages().length;
    if (msgCount > this._lastPlannerMsgCount) {
      this._lastPlannerMsgCount = msgCount;
      this._shouldScrollPlanner = true;
    }
    if (this._shouldScrollPlanner && this.plannerEnd) {
      this.plannerEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this._shouldScrollPlanner = false;
    }
  }

  setTab(tab: Tab) { this.activeTab.set(tab); }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  navItems: { tab: Tab; icon: string; label: string }[] = [
    { tab: 'explore', icon: '🗺️', label: 'Explore' },
    { tab: 'planner', icon: '🤖', label: 'AI Planner' },
    { tab: 'matches', icon: '💡', label: 'Matches' },
    { tab: 'chat', icon: '💬', label: 'Chat' },
  ];

  totalUnread = computed(() => this.conversations().reduce((sum, c) => sum + c.unread, 0));

  getStars(rating: number): string[] {
    return Array(5).fill('').map((_, i) => i < Math.floor(rating) ? '★' : '☆');
  }

  plannerSuggestions = ['🌅 Plan a relaxing morning', '🎉 Evening outing with friends', '💪 Active fitness day', '🎭 Cultural exploration', '☕ Best cafes nearby', '🌿 Parks & nature walks'];
}
