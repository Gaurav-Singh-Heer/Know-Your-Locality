export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

export interface Conversation {
  userId: string;
  userName: string;
  userAvatar: string;
  compatibility: number;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
  online: boolean;
}
