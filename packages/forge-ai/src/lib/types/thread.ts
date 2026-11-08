import type { ChatMessage } from './chat.js';

export interface Thread {
  id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  messageCount?: number;
}

export interface ThreadState {
  threadId?: string;
  messages: ChatMessage[];
  timestamp?: number;
  selectedAgentId?: string;
}
