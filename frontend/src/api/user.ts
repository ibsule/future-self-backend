import type { RegisterResponse } from '../types/api';
import { api } from './client';

export function registerUser(payload: {
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
}) {
  return api<RegisterResponse>('/user/create', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
