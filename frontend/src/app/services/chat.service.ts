import { Injectable, signal, inject, effect } from '@angular/core';
import { Conversation, Message } from '../models/message.model';
import { AuthService } from './auth.service';
import { AiChatService } from './ai-chat.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private auth = inject(AuthService);
  private ai = inject(AiChatService);

  readonly conversations = signal<Conversation[]>([]);
  readonly messages = signal<Message[]>([]);
  readonly activeId = signal<string | null>(null);
  readonly loading = signal(false);
  readonly convsLoading = signal(false);

  constructor() {
    // React to incoming real-time DM notifications pushed over the AI WS channel
    effect(() => {
      const dm = this.ai.lastDm();
      if (dm) this._handleIncomingDm(dm);
    });
  }

  // ── Conversations ──────────────────────────────────────────────────────────

  async loadConversations(): Promise<void> {
    const token = this.auth.token();
    if (!token) return;
    this.convsLoading.set(true);
    try {
      const res = await fetch(`${environment.apiBase}/dm/conversations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) this.conversations.set(await res.json());
    } catch { /* silent */ } finally {
      this.convsLoading.set(false);
    }
  }

  getConvo(userId: string): Conversation | undefined {
    return this.conversations().find((c) => c.userId === userId);
  }

  // ── Active conversation ────────────────────────────────────────────────────

  async setActive(userId: string): Promise<void> {
    this.activeId.set(userId);
    this.conversations.update((cs) =>
      cs.map((c) => (c.userId === userId ? { ...c, unread: 0 } : c))
    );
    await this._loadMessages(userId);
  }

  private async _loadMessages(partnerId: string): Promise<void> {
    const token = this.auth.token();
    if (!token) return;
    this.loading.set(true);
    try {
      const res = await fetch(`${environment.apiBase}/dm/${partnerId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) this.messages.set(await res.json());
    } catch { /* silent */ } finally {
      this.loading.set(false);
    }
  }

  // ── Send ──────────────────────────────────────────────────────────────────

  async sendMessage(partnerId: string, content: string): Promise<void> {
    const token = this.auth.token();
    const text = content.trim();
    if (!token || !text) return;

    // Optimistic message shown immediately
    const optimistic: Message = {
      id: `opt-${Date.now()}`,
      senderId: this.auth.currentUser()?.id ?? '',
      content: text,
      timestamp: new Date(),
      isOwn: true,
    };
    this.messages.update((ms) => [...ms, optimistic]);
    this._updateConvoPreview(partnerId, text);

    try {
      const res = await fetch(`${environment.apiBase}/dm/${partnerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: text }),
      });
      if (res.ok) {
        const saved: Message = await res.json();
        // Replace optimistic entry with real persisted message
        this.messages.update((ms) => ms.map((m) => (m.id === optimistic.id ? saved : m)));
      }
    } catch { /* keep optimistic in place */ }
  }

  // ── Start conversation from Matches tab ───────────────────────────────────

  async startConversation(
    userId: string,
    userName: string,
    userAvatar: string,
    compatibility: number
  ): Promise<void> {
    const alreadyExists = this.conversations().some((c) => c.userId === userId);
    if (!alreadyExists) {
      this.conversations.update((cs) => [
        { userId, userName, userAvatar, compatibility, lastMessage: '', lastTime: 'just now', unread: 0, online: false },
        ...cs,
      ]);
      await this.sendMessage(
        userId,
        `Hi! I saw we matched with ${compatibility}% compatibility. Would love to explore places together! 👋`
      );
    }
    await this.setActive(userId);
  }

  // ── Real-time DM handler ──────────────────────────────────────────────────

  private _handleIncomingDm(dm: {
    id: string; senderId: string; senderName: string; content: string; timestamp: string;
  }): void {
    const isActive = this.activeId() === dm.senderId;

    if (isActive) {
      this.messages.update((ms) => [
        ...ms,
        { id: dm.id, senderId: dm.senderId, content: dm.content, timestamp: new Date(dm.timestamp), isOwn: false },
      ]);
    }

    this.conversations.update((cs) => {
      const idx = cs.findIndex((c) => c.userId === dm.senderId);
      if (idx >= 0) {
        return cs.map((c) =>
          c.userId === dm.senderId
            ? { ...c, lastMessage: dm.content, lastTime: 'just now', unread: isActive ? 0 : c.unread + 1 }
            : c
        );
      }
      return [
        {
          userId: dm.senderId,
          userName: dm.senderName,
          userAvatar: dm.senderName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
          compatibility: 0,
          lastMessage: dm.content,
          lastTime: 'just now',
          unread: 1,
          online: true,
        },
        ...cs,
      ];
    });
  }

  private _updateConvoPreview(userId: string, content: string): void {
    this.conversations.update((cs) =>
      cs.map((c) => (c.userId === userId ? { ...c, lastMessage: content, lastTime: 'just now' } : c))
    );
  }
}
