export type ApiSuccess<T = unknown> = {
  message: string;
  data?: T;
};

export type ScheduledMessage = {
  id: number;
  public_id: string;
  title: string;
  content: string;
  send_at: string;
  sent: boolean;
  created_at: string;
};

export type LoginResponse = ApiSuccess<{ token: string }>;
export type RegisterResponse = ApiSuccess<{ user: { email: string } }>;
export type MessagesResponse = ApiSuccess<{ messages: ScheduledMessage[] }>;
