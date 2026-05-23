import { clearToken, getToken } from "../lib/token";

const nodeEnv = import.meta.env.VITE_NODE_ENVIRONMENT;
const apiLocalUrl = import.meta.env.VITE_LOCAL_API_URL;
const apiProdUrl = import.meta.env.VITE_PRODUCTION_API_URL;
const API_URL =
  nodeEnv == "local"
    ? apiLocalUrl
    : nodeEnv == "production"
      ? apiProdUrl
      : null;
      
if (!API_URL) {
  throw new Error(
    `VITE_LOCAL_API_URL or VITE_PRODUCTION_API_URL must be defined in environmental variables`,
  );
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = RequestInit & {
  auth?: boolean;
};

function parseMessage(body: Record<string, unknown>): string {
  const raw = body.message;
  if (Array.isArray(raw)) return raw.join(", ");
  if (typeof raw === "string") return raw;
  return "Something went wrong.";
}

export async function api<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    if (res.status === 401 && options.auth) {
      clearToken();
      window.dispatchEvent(new Event("auth:logout"));
    }
    throw new ApiError(parseMessage(body), res.status);
  }

  return body as T;
}
