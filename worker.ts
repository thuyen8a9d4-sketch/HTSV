import { onRequestPost as handleChat } from './functions/api/chat.ts';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  API_BACKEND_URL?: string;
  GEMINI_API_KEY?: string;
}

const DEFAULT_BACKEND_ORIGIN = 'https://htsv-api.onrender.com';

async function proxyToBackend(request: Request, env: Env): Promise<Response> {
  const backendOrigin = (env.API_BACKEND_URL?.trim() || DEFAULT_BACKEND_ORIGIN).replace(/\/+$/, '');
  const url = new URL(request.url);
  const targetUrl = backendOrigin + url.pathname + url.search;

  const headers = new Headers(request.headers);
  headers.delete('host');

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';

  return fetch(targetUrl, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: 'manual',
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/chat' && request.method === 'POST') {
      return handleChat({ request, env: { GEMINI_API_KEY: env.GEMINI_API_KEY } });
    }
    if (url.pathname.startsWith('/api/')) {
      return proxyToBackend(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
