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

/** Gửi câu hỏi ngoài dữ kiện DNC tới Pages Function; khóa Gemini chỉ ở máy chủ. */
async function callChatApi(messages: ChatMessage[]): Promise<string> {
  const relevantMessages = messages
    .filter((msg) => msg.role === 'user' || (msg.role === 'assistant' && msg.id !== 'msg-welcome' && !msg.isMock))
    .slice(-6)
    .map((msg) => ({ role: msg.role, content: msg.content.slice(0, 2000) }));
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: relevantMessages }),
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Chat API unavailable (${response.status})`);
  const data: unknown = await response.json();
  if (!data || typeof data !== 'object' || !('text' in data) || typeof data.text !== 'string' || !data.text.trim()) {
    throw new Error('Chat API returned no answer');
  }
  return data.text.trim();
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
