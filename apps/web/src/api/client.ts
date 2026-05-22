import { clearToken, getToken } from '../lib/token';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type RequestOptions = RequestInit & {
  auth?: boolean;
};

function parseMessage(body: Record<string, unknown>): string {
  const raw = body.message;
  if (Array.isArray(raw)) return raw.join(', ');
  if (typeof raw === 'string') return raw;
  return 'Something went wrong.';
}

export async function api<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.auth) {
    const token = getToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    if (res.status === 401 && options.auth) {
      clearToken();
      window.dispatchEvent(new Event('auth:logout'));
    }
    throw new ApiError(parseMessage(body), res.status);
  }

  return body as T;
}
