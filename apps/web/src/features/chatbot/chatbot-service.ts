import type { ChatMessage } from './chatbot-types';
import { HTSV_SYSTEM_PROMPT, getMockResponse } from './chatbot-knowledge';

// Clean up any previously stored key in browser localStorage to prevent leakage
try {
  localStorage.removeItem('htsv_chatbot_settings');
} catch {
  // ignore
}

export function getEffectiveApiKey(): string {
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
        maxOutputTokens: 2048,
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
 * Main function to generate response for the user using server/env configured API key
 */
export async function sendChatMessage(
  history: ChatMessage[]
): Promise<{ text: string; isMock: boolean }> {
  const apiKey = getEffectiveApiKey();

  // If no API key is set in .env.local, use local mock assistant
  if (!apiKey) {
    await new Promise((resolve) => setTimeout(resolve, 600)); // Natural typing delay
    const lastUserMessage = history.filter((m) => m.role === 'user').pop();
    const prompt = lastUserMessage?.content || '';
    return {
      text: getMockResponse(prompt),
      isMock: true,
    };
  }

  // Use Gemini with gemini-2.5-flash
  const text = await callGeminiApi(apiKey, 'gemini-2.5-flash', history, 0.7);
  return { text, isMock: false };
}
