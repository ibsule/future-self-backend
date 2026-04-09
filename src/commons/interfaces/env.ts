interface IENV {
  NODE_ENVIRONMENT: 'local' | 'docker' | 'dev' | 'staging' | 'prod';
  APP_PORT: number;
  APP_KEY: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_HOST_DOCKER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  EMAIL_SENDER_NAME: string;
  EMAIL_SENDER_EMAIL: string;
  BREVO_API_ENDPOINT: string;
  BREVO_API_KEY: string;
}
