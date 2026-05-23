import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Conversation, Message } from '../models/message.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private _platformId = inject(PLATFORM_ID);
  private _isBrowser = isPlatformBrowser(this._platformId);
  private auth = inject(AuthService);

  private _convos = signal<Conversation[]>([]);
  private _activeId = signal<string | null>(null);
  readonly loading = signal(false);

  readonly conversations = this._convos.asReadonly();
  readonly activeId = this._activeId.asReadonly();

  getConvo(userId: string): Conversation | undefined {
    return this._convos().find(c => c.userId === userId);
  }

  /** Fetches conversations from backend. Merges with any locally-started conversations. */
  async loadConversations(): Promise<void> {
    if (!this._isBrowser) return;
    const token = this.auth.token();
    if (!token) return;
    this.loading.set(true);
    try {
      const res = await fetch(`${environment.apiBase}/dm/conversations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      const serverConvos: Conversation[] = data.map((c: any) => ({
        ...c,
        messages: [],
        online: false,
      }));

      // Merge: keep locally-started conversations that aren't in server response
      const serverIds = new Set(serverConvos.map((c: Conversation) => c.userId));
      const localOnly = this._convos().filter(c => !serverIds.has(c.userId));
      this._convos.set([...serverConvos, ...localOnly]);
    } catch { /* keep existing */ }
    finally { this.loading.set(false); }
  }

  /** Clears local state (call on logout / account switch). */
  reset(): void {
    this._convos.set([]);
    this._activeId.set(null);
  }

  async setActive(userId: string): Promise<void> {
    this._activeId.set(userId);
    this._convos.update(cs => cs.map(c =>
      c.userId === userId ? { ...c, unread: 0 } : c
    ));
    await this._loadMessages(userId, true);
  }

  private async _loadMessages(partnerId: string, showLoading: boolean): Promise<void> {
    if (!this._isBrowser) return;
    const token = this.auth.token();
    if (!token) return;
    if (showLoading) this.loading.set(true);
    try {
      const res = await fetch(`${environment.apiBase}/dm/${partnerId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const messages: Message[] = await res.json();
      this._convos.update(cs => cs.map(c =>
        c.userId === partnerId ? { ...c, messages, unread: 0 } : c
      ));
    } catch { /* ignore */ }
    finally { if (showLoading) this.loading.set(false); }
  }

  async sendMessage(userId: string, content: string): Promise<void> {
    const token = this.auth.token();
    if (!token) return;

    // Optimistic update
    const tempMsg: Message = {
      id: Date.now().toString(), senderId: 'me', content, timestamp: new Date(), isOwn: true
    };
    this._convos.update(cs => cs.map(c =>
      c.userId === userId
        ? { ...c, messages: [...c.messages, tempMsg], lastMessage: content, lastTime: 'just now' }
        : c
    ));

    try {
      const res = await fetch(`${environment.apiBase}/dm/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error('Send failed');
      const saved: Message = await res.json();
      // Replace temp message with real one
      this._convos.update(cs => cs.map(c =>
        c.userId === userId
          ? { ...c, messages: c.messages.map(m => m.id === tempMsg.id ? { ...saved, isOwn: true } : m) }
          : c
      ));
    } catch {
      // Rollback optimistic update
      this._convos.update(cs => cs.map(c =>
        c.userId === userId
          ? { ...c, messages: c.messages.filter(m => m.id !== tempMsg.id) }
          : c
      ));
    }
  }

  startConversation(userId: string, userName: string, userAvatar: string, compatibility: number): void {
    const exists = this._convos().some(c => c.userId === userId);
    if (!exists) {
      const convo: Conversation = {
        userId, userName, userAvatar, compatibility,
        lastMessage: '', lastTime: 'just now', unread: 0, online: false,
        messages: []
      };
      this._convos.update(cs => [convo, ...cs]);
    }
    this.setActive(userId);
  }

  /** Called by WebSocket when a real-time DM arrives from another user. */
  onIncomingMessage(msg: { id: string; senderId: string; senderName: string; content: string; timestamp: string }): void {
    const senderId = msg.senderId;
    const newMsg: Message = {
      id: msg.id,
      senderId,
      content: msg.content,
      timestamp: new Date(msg.timestamp),
      isOwn: false,
    };

    const existing = this._convos().find(c => c.userId === senderId);
    if (existing) {
      // Append message to existing conversation
      const isActive = this._activeId() === senderId;
      this._convos.update(cs => cs.map(c =>
        c.userId === senderId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: msg.content,
              lastTime: 'just now',
              unread: isActive ? 0 : c.unread + 1,
            }
          : c
      ));
    } else {
      // Create new conversation entry for this sender
      const initials = msg.senderName.split(' ').map(n => n[0]).join('').slice(0, 2);
      const convo: Conversation = {
        userId: senderId,
        userName: msg.senderName,
        userAvatar: initials,
        compatibility: 0,
        lastMessage: msg.content,
        lastTime: 'just now',
        unread: 1,
        online: false,
        messages: [newMsg],
      };
      this._convos.update(cs => [convo, ...cs]);
    }
  }
}
