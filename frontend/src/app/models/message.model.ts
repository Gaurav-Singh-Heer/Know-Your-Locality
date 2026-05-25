export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date | string;
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
  online: boolean;
}
