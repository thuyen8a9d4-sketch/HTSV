import type { ChatMessage } from './chatbot-types';
import { DNC_UNKNOWN, findDncEvidence, type DncLookup } from './dnc-sources';

const STORAGE_USER_KEY = 'htsv_gemini_api_key';

export function getStoredCustomApiKey(): string {
  if (typeof window === 'undefined') return '';
  try {
    return (localStorage.getItem(STORAGE_USER_KEY) || '').trim();
  } catch {
    return '';
  }
}

export function setCustomApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    const trimmed = key.trim();
    if (trimmed) {
      localStorage.setItem(STORAGE_USER_KEY, trimmed);
    } else {
      localStorage.removeItem(STORAGE_USER_KEY);
    }
  } catch {
    // ignore
  }
}

export function getEffectiveApiKey(): string {
  const userKey = getStoredCustomApiKey();
  if (userKey) return userKey;

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
 * Call Google Gemini REST API with only the evidence relevant to the question.
 */
async function callGeminiApi(apiKey: string, messages: ChatMessage[], dnc: DncLookup | null): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${encodeURIComponent(apiKey)}`;

    const trimmedHistory = messages.filter((msg) => msg.role !== 'system').slice(-6).map((msg) => {
      let content = msg.content;
      if (msg.role !== 'user' && content.length > 500) {
        content = content.slice(0, 500) + '...';
      }
      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: content }],
      };
    });

    const instruction = dnc
      ? `Bạn là trợ lý HTSV. Trả lời câu hỏi cuối bằng tiếng Việt tự nhiên, trực tiếp, tối đa 3 câu. Chỉ dùng dữ kiện DNC dưới đây; không tự thêm số liệu, chính sách, tên người hoặc địa chỉ. Nếu dữ kiện chưa đủ để trả lời đúng ý hỏi, chỉ nói: "${DNC_UNKNOWN}". Không nhắc chủ đề khác. Không tự viết liên kết nguồn.\nDữ kiện đã đối chiếu:\n${dnc.evidence.map(({ answer }) => `- ${answer}`).join('\n')}`
      : 'Bạn là trợ lý HTSV. Trả lời câu hỏi cuối bằng tiếng Việt tự nhiên, đúng trọng tâm, ngắn gọn. Nếu không chắc thì nói "Mình không biết thông tin này." Không tự bịa dữ kiện về Trường Đại học Nam Cần Thơ.';

    const payload = {
      contents: trimmedHistory,
      systemInstruction: {
        parts: [{ text: instruction }],
      },
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 320,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(25000),
    });

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
  const text = data?.candidates?.[0]?.content?.parts?.filter((part: { text?: string }) => part.text).map((part: { text: string }) => part.text).join('\n');
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
  const previousUserMessage = history.filter((m) => m.role === 'user').at(-2)?.content || '';
  const simplePrompt = prompt.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
  if (/^(xin chao|chao|hello|hi|hey)[!.? ]*$/.test(simplePrompt)) {
    return { text: 'Chào bạn! Mình có thể giúp gì cho bạn?', isMock: false };
  }
  if (/^(cam on|thanks|thank you)( ban)?[!.? ]*$/.test(simplePrompt)) {
    return { text: 'Không có gì! Bạn cứ hỏi tiếp nhé.', isMock: false };
  }
  if (/^(ban la ai|bot la ai)[?.! ]*$/.test(simplePrompt)) {
    return { text: 'Mình là trợ lý của cổng HTSV, có thể giúp bạn tìm thông tin về Trường Đại học Nam Cần Thơ.', isMock: false };
  }
  const dnc = findDncEvidence(prompt, previousUserMessage);

  if (dnc && dnc.evidence.length === 0) return { text: DNC_UNKNOWN, isMock: false };
  // Các con số, mã, địa chỉ và quy trình lấy nguyên văn từ nguồn để tránh mô hình tự điền chi tiết.
  if (dnc && /\b(hoc phi|hoc bong|gia|bao nhieu|diem|ma nganh|ma truong|dia chi|o dau|hotline|so dien thoai|phuong thuc|xet tuyen|hoc ba|dang nhap|dang ky|dieu kien)\b/.test(simplePrompt)) {
    return { text: dnc.fallback, isMock: false };
  }

  // 1. Kiểm tra Cache trước: nếu câu hỏi này đã từng được trả lời, trả về ngay lập tức (tiết kiệm 100% quota)
  const cacheKey = `${previousUserMessage}\n${prompt}`;
  const cachedAnswer = getCachedResponse(cacheKey);
  if (cachedAnswer) {
    return { text: cachedAnswer, isMock: false };
  }

  // 2. Nếu không có API Key, dùng bộ phản hồi cục bộ siêu thông minh và đúng trọng tâm
  if (!apiKey) {
    return {
      text: dnc?.fallback || 'Mình không biết thông tin này.',
      isMock: !dnc,
    };
  }

  // 3. Gọi Gemini API trực tuyến
  try {
    const text = await callGeminiApi(apiKey, history, dnc);
    const answer = dnc
      ? text.includes(DNC_UNKNOWN)
        ? DNC_UNKNOWN
        : `${text.trim()}\n\n${[...new Set(dnc.evidence.map((item) => item.source))].map((source) => `[Nguồn](${source})`).join(' · ')}`
      : text.trim();
    // Lưu vào Cache để các lần hỏi sau không tốn thêm token
    setCachedResponse(cacheKey, answer);
    return { text: answer, isMock: false };
  } catch (err: unknown) {
    console.warn('Gemini API call failed:', err);
    return {
      text: dnc?.fallback || 'Mình không biết thông tin này.',
      isMock: !dnc,
    };
  }
}
