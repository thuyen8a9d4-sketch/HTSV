export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
  status?: 'sending' | 'success' | 'error';
  isMock?: boolean;
  followUps?: string[];
  isStreaming?: boolean;
}

export type ChatProvider = 'gemini' | 'openai';

export interface ChatbotSettings {
  apiKey: string;
  provider: ChatProvider;
  model: string;
  customEndpoint?: string;
  temperature: number;
}

export interface QuickSuggestion {
  id: string;
  label: string;
  prompt: string;
  category: 'forum' | 'academic' | 'service' | 'general';
}
