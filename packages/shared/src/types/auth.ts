import { User } from "./user"

export interface AuthResponse {
    accessToken: string
    user: User
  }
  
  export interface MagicLinkRequest {
    email: string
  }