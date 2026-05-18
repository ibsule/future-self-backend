interface IENV {
  // App
  NODE_ENVIRONMENT: 'local' | 'docker' | 'development' | 'staging' | 'production';
  APP_PORT: number;
  APP_KEY: string;
  ENABLE_RATE_LIMITING: string;
  DONT_SEND_EMAIL: string;
  
  // Redis
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_USER: string;
  REDIS_PASSWORD: string;
  
  // Database
  POSTGRES_USER: string;
  POSTGRES_HOST_DOCKER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;

  // Email
  EMAIL_SENDER_NAME: string;
  EMAIL_SENDER_EMAIL: string;
  BREVO_API_ENDPOINT: string;
  BREVO_API_KEY: string;

  FRONTEND_URL: string;
}
