import type { ToolCall } from './tool.js';

/**
 * Valid HTML heading levels for accessibility and semantic structure
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface Agent {
  id: string;
  name: string;
  description?: string;
}

export type SlashCommandId = 'clear' | 'export' | 'info' | 'debug';

export type SlashCommandGroup = 'Conversation' | 'Help';

export interface SlashCommand {
  id: SlashCommandId;
  name: string;
  group: SlashCommandGroup;
}

export interface ForgeAiSlashCommandMenuSelectEventData {
  command: SlashCommand;
  index: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp: number;
  status: 'pending' | 'streaming' | 'complete' | 'error';
  toolCalls?: ToolCall[];
  toolCallId?: string;
  feedback?: ResponseFeedback;
  children?: ResponseItem[];
  clientOnly?: boolean;
  kind?: ClientMessageKind;
  header?: string;
  actions?: ClientMessageAction[];
}

/**
 * Visual treatment for a client-only message. `text` matches the plain,
 * italic system-message style; the others render as a Forge inline-message
 * banner with a matching icon.
 */
export type ClientMessageKind = 'text' | 'info' | 'warning' | 'error' | 'success';

export interface ClientMessageAction {
  id: string;
  label: string;
  onClick: () => void;
}

/**
 * Input for adding a client-only message. Pass the same `id` on a later call to upsert (replace)
 * a previously added client message.
 */
export interface ClientMessageInput {
  id?: string;
  content: string;
  kind?: ClientMessageKind;
  header?: string;
  actions?: ClientMessageAction[];
}

export type ResponseItem = { type: 'text'; messageId: string; content: string; status: 'streaming' | 'complete' } | { type: 'toolCall'; data: ToolCall };

export type FeedbackType = 'positive' | 'negative';

export interface ResponseFeedback {
  type: FeedbackType;
  reason?: string;
}

export interface AssistantResponse {
  id: string;
  children: ResponseItem[];
  status: 'streaming' | 'complete' | 'error';
  timestamp: number;
  feedback?: ResponseFeedback;
  isThinking?: boolean;
}

export type MessageItem = { type: 'message'; data: ChatMessage } | { type: 'toolCall'; data: ToolCall } | { type: 'assistant'; data: AssistantResponse };

export interface ContextItem {
  id: string;
  label: string;
  removable?: boolean;
  sublabel?: string;
  loading?: boolean;
  type?: 'file' | 'context';
}

export interface Suggestion {
  text: string;
  value: string;
}
