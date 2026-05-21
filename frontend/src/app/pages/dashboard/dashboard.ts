import { Component, signal, computed, inject, ViewChild, ElementRef, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PlacesService } from '../../services/places.service';
import { MatchService } from '../../services/match.service';
import { ChatService } from '../../services/chat.service';
import { AiChatService } from '../../services/ai-chat.service';
import { GeolocationService } from '../../services/geolocation.service';
import { PlaceCategory } from '../../models/place.model';
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
  }
  ngOnDestroy() { this.ai.disconnect(); }

  private async _loadPlaces() {
    let coords = this.geo.coords();
    if (!coords) {
      coords = await this.geo.request();
    }
    if (coords) {
      this.placesService.fetchNearby(coords.lat, coords.lng);
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
  plannerMessages = computed(() => {
    const arr = this.ai.messages();
    if (arr.length === 0) {
      return [{ role: 'assistant' as const, content: `Hi! 👋 I'm your KYK companion. Tell me the kind of day you'd like — a calm morning, a social evening, an active outing — and I'll suggest places and people nearby that fit your vibe.` }];
    }
    return arr;
  });
  plannerLoading = computed(() => this.ai.typing());

  sendPlannerMessage() {
    const text = this.plannerInput.trim();
    if (!text || this.plannerLoading()) return;
    this.plannerInput = '';
    this.ai.send(text);
    this._shouldScroll = true;
  }

  // Matches
  matches = this.matchService.matches;

  connectMatch(match: any) {
    this.chatService.startConversation(match.id, match.name, match.name.split(' ').map((n: string) => n[0]).join(''), match.compatibility);
    this.activeTab.set('chat');
    this.chatService.setActive(match.id);
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
    if (this._shouldScroll && this.chatEnd) {
      this.chatEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this._shouldScroll = false;
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

  plannerSuggestions = ['Plan a relaxing morning', 'Evening outing with friends', 'Active fitness day', 'Cultural exploration'];
}
