import type { ApiSuccess, MessagesResponse } from '../types/api';
import { api } from './client';

export function listMessages() {
  return api<MessagesResponse>('/msg', { auth: true });
}

export function createMessage(payload: {
  title: string;
  content: string;
  send_at?: string;
  send_after?: string;
}) {
  return api<ApiSuccess>('/msg/create', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(payload),
  });
}
