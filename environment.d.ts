declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_VA_API_URL: string;
      APP_VA_API_KEY: string;
    }
  }
}

export {};
