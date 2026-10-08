interface Env {
  GEMINI_API_KEY?: string;
}

interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

const MODEL_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent';
const INSTRUCTION = 'Bạn là trợ lý HTSV, xưng em với người dùng. Trả lời trực tiếp đúng câu hỏi cuối bằng tiếng Việt ngắn gọn, kể cả chủ đề ngoài trường. Không tự kéo câu trả lời về Trường Đại học Nam Cần Thơ. Giọng miền Tây vui vẻ, dùng “Dạaaaa” và “nhaaaa” vừa phải. Khi người dùng buồn hoặc gặp khó khăn, trả lời đồng cảm, bình tĩnh. Nếu không biết thì nói rõ là không biết; tuyệt đối không bịa dữ kiện, đặc biệt về Trường Đại học Nam Cần Thơ.';

function json(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function onRequestPost({ request, env }: RequestContext): Promise<Response> {
  const origin = request.headers.get('Origin');
  if (origin) {
    try {
      const originHost = new URL(origin).host;
      const requestHost = new URL(request.url).host;
      if (originHost !== requestHost && !originHost.endsWith('.pages.dev') && !originHost.includes('localhost')) {
        return json({ error: 'Forbidden' }, 403);
      }
    } catch {
      return json({ error: 'Forbidden' }, 403);
    }
  }
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) {
    return json({ error: 'Invalid content type' }, 415);
  }
  const raw = await request.text();
  if (raw.length > 15_000) return json({ error: 'Message too long' }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }
  const messages = typeof body === 'object' && body !== null && 'messages' in body ? body.messages : null;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 6 ||
      !messages.every((item: unknown): item is ChatTurn =>
        typeof item === 'object' && item !== null &&
        'role' in item && (item.role === 'user' || item.role === 'assistant') &&
        'content' in item && typeof item.content === 'string' &&
        item.content.trim().length > 0 && item.content.length <= 2000) ||
      messages[messages.length - 1].role !== 'user') {
    return json({ error: 'Invalid messages' }, 400);
  }
  const key = env.GEMINI_API_KEY?.trim();
  if (!key) return json({ error: 'AI unavailable' }, 503);

  const payload = {
    contents: messages.map((message: ChatTurn) => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: message.content }],
    })),
    systemInstruction: { parts: [{ text: INSTRUCTION }] },
    generationConfig: { temperature: 0.2, maxOutputTokens: 600 },
  };
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), 25000) : null;
    const response = await fetch(MODEL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify(payload),
      signal: controller?.signal,
    });
    if (timer) clearTimeout(timer);
    if (!response.ok) {
      const errDetail = await response.text().catch(() => '');
      if (errDetail.includes('User location is not supported') || errDetail.includes('API key not valid')) {
        return json({ fallbackKey: key }, 200);
      }
      return json({ error: 'AI unavailable', status: response.status, details: errDetail }, response.status === 429 ? 429 : 502);
    }
    const data: unknown = await response.json();
    const candidate = typeof data === 'object' && data !== null && 'candidates' in data && Array.isArray(data.candidates)
      ? data.candidates[0] : null;
    const parts = candidate?.content?.parts;
    const text = Array.isArray(parts)
      ? parts.filter((part: unknown): part is { text: string } => typeof part === 'object' && part !== null && 'text' in part && typeof part.text === 'string').map((part) => part.text).join('\n').trim()
      : '';
    if (!text) return json({ error: 'AI returned no answer' }, 502);
    return json({ text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return json({ error: 'AI unavailable', details: message }, 502);
  }
}
