import type { ApiSuccess, LoginResponse } from '../types/api';
import { api } from './client';

export function login(email: string, password: string) {
  return api<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return api<ApiSuccess>('/auth/logout', {
    method: 'POST',
    auth: true,
  });
}

export function logoutAllSessions() {
  return api<ApiSuccess>('/auth/logout-all-sessions', {
    method: 'POST',
    auth: true,
  });
}

export function forgetPassword(email: string) {
  return api<ApiSuccess>('/auth/forget-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(payload: {
  email: string;
  new_password: string;
  reset_password_token: string;
}) {
  return api<ApiSuccess>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
