interface Env {
  API_BACKEND_URL?: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

const DEFAULT_BACKEND_ORIGIN = 'https://htsv-api.onrender.com';

export async function onRequest({ request, env }: RequestContext): Promise<Response> {
  const backendOrigin = (env.API_BACKEND_URL?.trim() || DEFAULT_BACKEND_ORIGIN).replace(/\/+$/, '');
  const incomingUrl = new URL(request.url);
  const targetUrl = backendOrigin + incomingUrl.pathname + incomingUrl.search;

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
