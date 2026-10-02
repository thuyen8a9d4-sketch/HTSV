import type { ChatMessage } from './chatbot-types';
import { DNC_UNKNOWN, findDncEvidence } from './dnc-sources';
import { getSmallTalkReply } from './chatbot-smalltalk';

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

const MODEL_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent';
const INSTRUCTION = 'Bạn là trợ lý HTSV, xưng em với người dùng. Trả lời trực tiếp đúng câu hỏi cuối bằng tiếng Việt ngắn gọn, kể cả chủ đề ngoài trường. Không tự kéo câu trả lời về Trường Đại học Nam Cần Thơ. Giọng miền Tây vui vẻ, dùng “Dạaaaa” và “nhaaaa” vừa phải. Khi người dùng buồn hoặc gặp khó khăn, trả lời đồng cảm, bình tĩnh. Nếu không biết thì nói rõ là không biết; tuyệt đối không bịa dữ kiện, đặc biệt về Trường Đại học Nam Cần Thơ.';

async function callGeminiDirect(key: string, messages: ChatMessage[]): Promise<string> {
  const relevantMessages = messages
    .filter((msg) => msg.role === 'user' || (msg.role === 'assistant' && msg.id !== 'msg-welcome' && !msg.isMock))
    .slice(-6);
  const payload = {
    contents: relevantMessages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })),
    systemInstruction: { parts: [{ text: INSTRUCTION }] },
    generationConfig: { temperature: 0.2, maxOutputTokens: 600 },
  };
  const response = await fetch(MODEL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) throw new Error(`Gemini direct call failed (${response.status})`);
  const data: unknown = await response.json();
  const candidate = typeof data === 'object' && data !== null && 'candidates' in data && Array.isArray(data.candidates)
    ? data.candidates[0]
    : null;
  const parts = candidate?.content?.parts;
  const text = Array.isArray(parts)
    ? parts
        .filter((part: unknown): part is { text: string } => typeof part === 'object' && part !== null && 'text' in part && typeof part.text === 'string')
        .map((part) => part.text)
        .join('\n')
        .trim()
    : '';
  if (!text) throw new Error('No answer returned from Gemini');
  return text;
}

/** Gửi câu hỏi ngoài dữ kiện DNC tới Pages Function; tự động fallback nếu khu vực server bị hạn chế. */
async function callChatApi(messages: ChatMessage[]): Promise<string> {
  const envKey = ((import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_AI_API_KEY || '') as string).trim();
  const relevantMessages = messages
    .filter((msg) => msg.role === 'user' || (msg.role === 'assistant' && msg.id !== 'msg-welcome' && !msg.isMock))
    .slice(-6)
    .map((msg) => ({ role: msg.role, content: msg.content.slice(0, 2000) }));

  let fallbackKey = envKey;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: relevantMessages }),
      signal: AbortSignal.timeout(30000),
    });

    if (response.ok) {
      const data: unknown = await response.json();
      if (data && typeof data === 'object') {
        if ('text' in data && typeof data.text === 'string' && data.text.trim()) {
          return data.text.trim();
        }
        if ('fallbackKey' in data && typeof data.fallbackKey === 'string' && data.fallbackKey.trim()) {
          fallbackKey = data.fallbackKey.trim();
        }
      }
    }
  } catch (err) {
    console.warn('Pages function chat API call failed:', err);
  }

  if (fallbackKey) {
    return await callGeminiDirect(fallbackKey, messages);
  }

  throw new Error('Chat API returned no answer');
}

/**
 * Main function to generate a response for the user.
 */
export async function sendChatMessage(
  history: ChatMessage[]
): Promise<{ text: string; isMock: boolean }> {
  const lastUserMessage = history.filter((m) => m.role === 'user').pop();
  const prompt = lastUserMessage?.content || '';
  const previousUserMessage = history.filter((m) => m.role === 'user').at(-2)?.content || '';
  const simplePrompt = prompt.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
  if (/^(xin chao|chao|hello|hi|hey)[!.? ]*$/.test(simplePrompt)) {
    return { text: 'Dạaaaa, em chào bạn nhaaaa! Bạn cần em giúp gì nèee?', isMock: false };
  }
  if (/^(cam on|thanks|thank you)( ban)?[!.? ]*$/.test(simplePrompt)) {
    return { text: 'Dạaaaa, có gì đâu ạaaaa. Bạn cứ hỏi em tiếp nhaaaa!', isMock: false };
  }
  if (/^(ban la ai|bot la ai)[?.! ]*$/.test(simplePrompt)) {
    return { text: 'Dạaaaa, em là trợ lý trên website HTSV nèee. Em giúp bạn tìm thông tin về Trường Đại học Nam Cần Thơ nhaaaa.', isMock: false };
  }
  const smallTalk = getSmallTalkReply(prompt);
  if (smallTalk) return { text: smallTalk, isMock: false };
  const confessionContext = /\bconfession\b/.test(simplePrompt) ||
    (/\bconfession\b/.test(previousUserMessage.toLowerCase()) && /^(con|the|vay|bao lau|khi nao|sao)\b/.test(simplePrompt));
  if (confessionContext && /\b(duyet|kiem duyet|bao lau|khi nao|chua hien|chua dang|len bai|len mat)\b/.test(simplePrompt)) {
    return {
      text: 'Dạaaaa, em hiểu bạn đang chờ bài Confession nèee. Bài sẽ qua kiểm duyệt tự động và quản trị viên xem xét trước khi lên bảng tin. Em chưa thấy website HTSV thông báo thời gian duyệt cụ thể, nên chưa thể báo chính xác cho bạn. Bạn kiểm tra lại bảng tin sau nhaaaa.',
      isMock: false,
    };
  }
  const dnc = findDncEvidence(prompt, previousUserMessage);

  if (dnc && dnc.evidence.length === 0) return { text: DNC_UNKNOWN, isMock: false };
  // Trả lời nội dung về trường trực tiếp từ dữ kiện đã kiểm chứng, không để mô hình thêm thông tin không có nguồn.
  if (dnc) {
    return { text: dnc.fallback, isMock: false };
  }

  // 1. Kiểm tra Cache trước: nếu câu hỏi này đã từng được trả lời, trả về ngay lập tức (tiết kiệm 100% quota)
  const cacheKey = `${previousUserMessage}\n${prompt}`;
  const cachedAnswer = getCachedResponse(cacheKey);
  if (cachedAnswer) {
    return { text: cachedAnswer, isMock: false };
  }

  // Gọi Pages Function để trả lời câu hỏi ngoài dữ kiện DNC.
  try {
    const text = await callChatApi(history);
    const answer = text.trim();
    // Lưu vào Cache để các lần hỏi sau không tốn thêm token
    setCachedResponse(cacheKey, answer);
    return { text: answer, isMock: false };
  } catch (err: unknown) {
    console.warn('Chat API call failed:', err);
    return {
      text: 'Dạ, em chưa trả lời chắc được câu này ngay lúc này. Bạn thử hỏi lại sau nhaaaa.',
      isMock: false,
    };
  }
}
