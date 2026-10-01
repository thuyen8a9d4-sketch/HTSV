import type { ChatMessage } from './chatbot-types';
import { HTSV_SYSTEM_PROMPT, getMockResponse, removeVietnameseTones } from './chatbot-knowledge';

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

// Cache câu trả lời để tiết kiệm Quota/Token cho các câu hỏi trùng lặp hoặc gợi ý nhanh
const RESPONSE_CACHE = new Map<string, string>();
const MAX_CACHE_SIZE = 50;

function getCachedResponse(prompt: string): string | undefined {
  const key = prompt.trim().toLowerCase();
  return RESPONSE_CACHE.get(key);
}

function setCachedResponse(prompt: string, answer: string): void {
  const key = prompt.trim().toLowerCase();
  if (RESPONSE_CACHE.size >= MAX_CACHE_SIZE) {
    const firstKey = RESPONSE_CACHE.keys().next().value;
    if (firstKey) RESPONSE_CACHE.delete(firstKey);
  }
  RESPONSE_CACHE.set(key, answer);
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
  const primaryModel = model.trim() || 'gemini-2.5-flash-lite';

  const makeRequest = async (targetModel: string) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${encodeURIComponent(apiKey)}`;

    // Tối ưu hóa Context Window để tiết kiệm tối đa Token/Quota:
    // Lấy 6 tin nhắn gần nhất thay vì toàn bộ lịch sử, cắt ngắn các phản hồi dài trước đó
    const trimmedHistory = messages.slice(-6).map((msg) => {
      let content = msg.content;
      if (msg.role !== 'user' && content.length > 800) {
        content = content.slice(0, 800) + '...';
      }
      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: content }],
      };
    });

    const payload = {
      contents: trimmedHistory,
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
      signal: AbortSignal.timeout(25000), // 25-second timeout ensures completion
    });
  };

  let response: Response;
  try {
    response = await makeRequest(primaryModel);
  } catch (firstErr) {
    console.warn(`Primary model ${primaryModel} failed, trying fallback model gemini-2.5-flash:`, firstErr);
    response = await makeRequest('gemini-2.5-flash');
  }

  // If primary model is busy (503/429/timeout), try fallback
  if (!response.ok && primaryModel !== 'gemini-2.5-flash') {
    try {
      response = await makeRequest('gemini-2.5-flash');
    } catch {
      // ignore
    }
  }

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    const errorMsg = errorJson?.error?.message || `Lỗi máy chủ Google (${response.status})`;
    if (response.status === 400 && errorMsg.includes('API_KEY_INVALID')) {
      throw new Error('API Key Google Gemini không hợp lệ. Vui lòng kiểm tra lại khóa của bạn.');
    }
    if (response.status === 429) {
      const err = new Error('RATE_LIMIT_EXCEEDED');
      err.name = 'RateLimitError';
      throw err;
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
  const lastUserMessage = history.filter((m) => m.role === 'user').pop();
  const prompt = lastUserMessage?.content || '';

  // 0. Easter Egg đặc biệt: "Chó Thịnh là ai"
  const noTone = removeVietnameseTones(prompt);
  if (noTone.includes('cho thinh') || noTone.includes('thinh cho')) {
    return {
      text: 'Chó Thịnh à tôi không biết, Tôi chỉ biết Thanh Tho thôi',
      isMock: false,
    };
  }

  // 1. Kiểm tra Cache trước: nếu câu hỏi này đã từng được trả lời, trả về ngay lập tức (tiết kiệm 100% quota)
  const cachedAnswer = getCachedResponse(prompt);
  if (cachedAnswer) {
    return { text: cachedAnswer, isMock: false };
  }

  // 2. Nếu không có API Key, dùng bộ phản hồi cục bộ
  if (!apiKey) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      text: getMockResponse(prompt),
      isMock: true,
    };
  }

  // 3. Gọi Gemini API trực tuyến
  try {
    const text = await callGeminiApi(apiKey, 'gemini-2.5-flash-lite', history, 0.7);
    // Lưu vào Cache để các lần hỏi sau không tốn thêm token
    setCachedResponse(prompt, text);
    return { text, isMock: false };
  } catch (err: unknown) {
    console.warn('Gemini API call failed, falling back to smart local knowledge base:', err);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const fallbackText = getMockResponse(prompt);
    return {
      text: fallbackText,
      isMock: true,
    };
  }
}
