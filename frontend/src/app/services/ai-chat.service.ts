import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { PlacesService } from './places.service';
import { MatchService } from './match.service';
import { ChatService } from './chat.service';

export interface AiMessage { role: 'user' | 'assistant'; content: string; at?: Date; }

@Injectable({ providedIn: 'root' })
export class AiChatService {
  private _platformId = inject(PLATFORM_ID);
  private _isBrowser = isPlatformBrowser(this._platformId);
  private auth = inject(AuthService);
  private placesService = inject(PlacesService);
  private matchService = inject(MatchService);
  private chatService = inject(ChatService);

  private ws: WebSocket | null = null;

  readonly messages = signal<AiMessage[]>([]);
  readonly typing = signal(false);
  readonly connected = signal(false);
  readonly error = signal<string | null>(null);

  async connect(): Promise<void> {
    if (!this._isBrowser) return;
    const token = this.auth.token();
    if (!token) { this.error.set('Not authenticated'); return; }
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) return;

    // Load history
    try {
      const res = await fetch(`${environment.apiBase}/chat/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        this.messages.set(
          (data.messages || []).map((m: any) => ({ role: m.role, content: m.content, at: new Date(m.at) }))
        );
      }
    } catch { /* ignore */ }

    const url = `${environment.wsBase}/chat?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(url);
    this.ws = ws;
    ws.onopen = () => { this.connected.set(true); this.error.set(null); };
    ws.onclose = () => { this.connected.set(false); };
    ws.onerror = () => { this.error.set('Chat connection error'); };
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === 'typing') this.typing.set(!!msg.content);
        else if (msg.type === 'assistant') {
          this.messages.update((arr) => [...arr, { role: 'assistant', content: msg.content, at: new Date() }]);
          this.typing.set(false);
        } else if (msg.type === 'error') {
          this.error.set(msg.content);
          this.typing.set(false);
        } else if (msg.type === 'dm') {
          // Real-time DM received — push to ChatService
          this.chatService.onIncomingMessage(msg.message);
        }
      } catch { /* ignore */ }
    };
  }

  send(content: string): void {
    const text = content.trim();
    if (!text) return;
    this.messages.update((arr) => [...arr, { role: 'user', content: text, at: new Date() }]);

    const context = this._buildContext();

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'user', content: text, context }));
      this.typing.set(true);
    } else {
      // REST fallback
      this.sendRest(text, context);
    }
  }

  private _buildContext(): { places: any[]; matches: any[] } {
    const places = this.placesService.filteredPlaces().slice(0, 10).map(p => ({
      name: p.name,
      category: p.category,
      distance: p.distance,
      travelTime: p.travelTime[this.placesService.selectedTravelMode()],
    }));
    const matches = this.matchService.matches().slice(0, 5).map(m => ({
      name: m.name,
      compatibility: m.compatibility,
      mutualInterests: m.mutualInterests,
    }));
    return { places, matches };
  }

  private async sendRest(content: string, context: { places: any[]; matches: any[] }): Promise<void> {
    const token = this.auth.token();
    if (!token) return;
    this.typing.set(true);
    try {
      const res = await fetch(`${environment.apiBase}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content, places: context.places, matches: context.matches }),
      });
      if (res.ok) {
        const { reply } = await res.json();
        this.messages.update((arr) => [...arr, { role: 'assistant', content: reply, at: new Date() }]);
      } else {
        this.error.set('AI service error');
      }
    } catch {
      this.error.set('Network error');
    } finally {
      this.typing.set(false);
    }
  }

  disconnect(): void {
    this.ws?.close();
    this.ws = null;
    this.connected.set(false);
  }
}
