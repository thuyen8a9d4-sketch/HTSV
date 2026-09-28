import type { ChatMessage, ChatbotSettings } from './chatbot-types';
import { HTSV_SYSTEM_PROMPT, getMockResponse } from './chatbot-knowledge';

const SETTINGS_KEY = 'htsv_chatbot_settings';

export const DEFAULT_SETTINGS: ChatbotSettings = {
  apiKey: '',
  provider: 'gemini',
  model: 'gemini-2.5-flash',
  temperature: 0.7,
};

export function loadChatbotSettings(): ChatbotSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const loaded = { ...DEFAULT_SETTINGS, ...parsed };
      if (loaded.model === 'gemini-1.5-flash' || !loaded.model) {
        loaded.model = 'gemini-2.5-flash';
      }
      return loaded;
    }
  } catch {
    // ignore parse error
  }

  // Check Vite env fallback
  const envKey = (import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_AI_API_KEY || '') as string;
  if (envKey) {
    return {
      ...DEFAULT_SETTINGS,
      apiKey: envKey,
    };
  }

  return DEFAULT_SETTINGS;
}

export function saveChatbotSettings(settings: ChatbotSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore storage error
  }
}

export function getEffectiveApiKey(settings: ChatbotSettings): string {
  if (settings.apiKey?.trim()) return settings.apiKey.trim();
  const envKey = (import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_AI_API_KEY || '') as string;
  return envKey.trim();
}

/**
 * Call Google Gemini REST API directly with automatic fallback
 */
async function callGeminiApi(
  apiKey: string,
  model: string,
  messages: ChatMessage[],
  temperature: number
): Promise<string> {
  let cleanModel = model.trim() || 'gemini-2.5-flash';
  if (cleanModel === 'gemini-1.5-flash') {
    cleanModel = 'gemini-2.5-flash';
  }

  const makeRequest = async (targetModel: string) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${encodeURIComponent(apiKey)}`;

    // Convert previous history to Gemini format (user vs model)
    const historyContents = messages.slice(-10).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const payload = {
      contents: historyContents,
      systemInstruction: {
        parts: [{ text: HTSV_SYSTEM_PROMPT }],
      },
      generationConfig: {
        temperature: Math.max(0, Math.min(2, temperature || 0.7)),
        maxOutputTokens: 1024,
      },
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  };

  let response = await makeRequest(cleanModel);

  // If model not found (e.g. older 1.5 model), auto-retry with gemini-2.5-flash or gemini-flash-latest
  if (!response.ok && cleanModel !== 'gemini-2.5-flash') {
    response = await makeRequest('gemini-2.5-flash');
  }
  if (!response.ok && cleanModel !== 'gemini-flash-latest') {
    response = await makeRequest('gemini-flash-latest');
  }

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    const errorMsg = errorJson?.error?.message || `Lỗi máy chủ Google (${response.status})`;
    if (response.status === 400 && errorMsg.includes('API_KEY_INVALID')) {
      throw new Error('API Key Google Gemini không hợp lệ. Vui lòng kiểm tra lại khóa của bạn.');
    }
    if (response.status === 429) {
      throw new Error('Đã đạt giới hạn yêu cầu (Rate Limit). Vui lòng thử lại sau vài giây.');
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Không nhận được nội dung phản hồi từ mô hình AI.');
  }

  return text;
}

/**
 * Call OpenAI-compatible REST API
 */
async function callOpenAiApi(
  apiKey: string,
  model: string,
  customEndpoint: string | undefined,
  messages: ChatMessage[],
  temperature: number
): Promise<string> {
  const endpoint = customEndpoint?.trim() || 'https://api.openai.com/v1/chat/completions';
  const cleanModel = model.trim() || 'gpt-4o-mini';

  const payloadMessages = [
    { role: 'system', content: HTSV_SYSTEM_PROMPT },
    ...messages.slice(-10).map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: cleanModel,
      messages: payloadMessages,
      temperature: temperature || 0.7,
    }),
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    const errorMsg = errorJson?.error?.message || `Lỗi máy chủ (${response.status})`;
    throw new Error(errorMsg);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error('Không nhận được nội dung phản hồi từ mô hình AI.');
  }

  return text;
}

/**
 * Main function to generate response for the user
 */
export async function sendChatMessage(
  history: ChatMessage[],
  settings: ChatbotSettings
): Promise<{ text: string; isMock: boolean }> {
  const apiKey = getEffectiveApiKey(settings);

  // If no API key is set yet, gracefully use local mock assistant
  if (!apiKey) {
    await new Promise((resolve) => setTimeout(resolve, 600)); // Natural typing delay
    const lastUserMessage = history.filter((m) => m.role === 'user').pop();
    const prompt = lastUserMessage?.content || '';
    return {
      text: getMockResponse(prompt),
      isMock: true,
    };
  }

  // If API key is present, route to the configured provider
  if (settings.provider === 'openai') {
    const text = await callOpenAiApi(apiKey, settings.model, settings.customEndpoint, history, settings.temperature);
    return { text, isMock: false };
  }

  // Default to Gemini
  const text = await callGeminiApi(apiKey, settings.model, history, settings.temperature);
  return { text, isMock: false };
}
