export interface IAuthSession {
  user_id: string;
  user_email: string;
  account_type?: string;
  auth_token_version?: number;
}
