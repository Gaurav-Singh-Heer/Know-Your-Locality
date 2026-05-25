import { Injectable, signal } from '@angular/core';
import { Conversation, Message } from '../models/message.model';

const INITIAL_CONVOS: Conversation[] = [
  {
    userId: 'm1', userName: 'Priya Singh', userAvatar: 'PS', compatibility: 92,
    lastMessage: 'That sounds amazing! When are you free?', lastTime: '2m ago', unread: 2, online: true,
    messages: [
      { id: '1', senderId: 'm1', content: 'Hey! I saw we matched on KYL. Your travel interests align perfectly with mine!', timestamp: new Date(), isOwn: false },
      { id: '2', senderId: '1', content: 'Hi Priya! Yes, I love exploring new places. Have you been to Rock Garden?', timestamp: new Date(), isOwn: true },
      { id: '3', senderId: 'm1', content: 'Yes! It\'s incredible. I was thinking we could check out Sukhna Lake this weekend?', timestamp: new Date(), isOwn: false },
      { id: '4', senderId: 'm1', content: 'That sounds amazing! When are you free?', timestamp: new Date(), isOwn: false },
    ]
  },
  {
    userId: 'm2', userName: 'Rahul Verma', userAvatar: 'RV', compatibility: 87,
    lastMessage: 'Let me know if you want to check it out!', lastTime: '1h ago', unread: 0, online: true,
    messages: [
      { id: '5', senderId: 'm2', content: 'Yo! Fellow techie here. Do you use the Brew & Beans cafe for work?', timestamp: new Date(), isOwn: false },
      { id: '6', senderId: '1', content: 'All the time! Great wifi and amazing matcha lattes haha', timestamp: new Date(), isOwn: true },
      { id: '7', senderId: 'm2', content: 'There\'s a tech meetup at Elante this Saturday. Let me know if you want to check it out!', timestamp: new Date(), isOwn: false },
    ]
  },
  {
    userId: 'm3', userName: 'Sarah Johnson', userAvatar: 'SJ', compatibility: 85,
    lastMessage: 'See you there at 10am!', lastTime: '3h ago', unread: 1, online: false,
    messages: [
      { id: '8', senderId: 'm3', content: 'Hi! I noticed you\'re interested in art. Have you been to the Government Museum?', timestamp: new Date(), isOwn: false },
      { id: '9', senderId: '1', content: 'Not yet but it\'s on my list! Want to go together?', timestamp: new Date(), isOwn: true },
      { id: '10', senderId: 'm3', content: 'Yes! They have a new modern art exhibition. How about this Sunday?', timestamp: new Date(), isOwn: false },
      { id: '11', senderId: 'm3', content: 'See you there at 10am!', timestamp: new Date(), isOwn: false },
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class ChatService {
  private _convos = signal<Conversation[]>(INITIAL_CONVOS);
  private _activeId = signal<string | null>(null);

  readonly conversations = this._convos.asReadonly();
  readonly activeId = this._activeId.asReadonly();

  getConvo(userId: string): Conversation | undefined {
    return this._convos().find(c => c.userId === userId);
  }

  setActive(userId: string): void {
    this._activeId.set(userId);
    this._convos.update(cs => cs.map(c =>
      c.userId === userId ? { ...c, unread: 0 } : c
    ));
  }

  sendMessage(userId: string, content: string): void {
    const msg: Message = {
      id: Date.now().toString(), senderId: '1', content, timestamp: new Date(), isOwn: true
    };
    this._convos.update(cs => cs.map(c =>
      c.userId === userId
        ? { ...c, messages: [...c.messages, msg], lastMessage: content, lastTime: 'just now' }
        : c
    ));
    setTimeout(() => this._simulateReply(userId), 1500);
  }

  startConversation(userId: string, userName: string, userAvatar: string, compatibility: number): void {
    const exists = this._convos().some(c => c.userId === userId);
    if (!exists) {
      const convo: Conversation = {
        userId, userName, userAvatar, compatibility,
        lastMessage: 'New connection!', lastTime: 'just now', unread: 0, online: true,
        messages: [{ id: Date.now().toString(), senderId: userId, content: `Hi! I saw we matched with ${compatibility}% compatibility. Would love to explore places together!`, timestamp: new Date(), isOwn: false }]
      };
      this._convos.update(cs => [convo, ...cs]);
    }
    this.setActive(userId);
  }

  private _simulateReply(userId: string): void {
    const replies = [
      'That sounds great! 😊', 'Totally agree!', 'Let\'s plan something soon!',
      'I love that idea! When are you free?', 'Amazing! I know the perfect spot.',
    ];
    const msg: Message = {
      id: Date.now().toString(), senderId: userId,
      content: replies[Math.floor(Math.random() * replies.length)],
      timestamp: new Date(), isOwn: false
    };
    this._convos.update(cs => cs.map(c =>
      c.userId === userId
        ? { ...c, messages: [...c.messages, msg], lastMessage: msg.content, lastTime: 'just now' }
        : c
    ));
  }
}
