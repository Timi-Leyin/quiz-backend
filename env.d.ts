export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      EMAIL_USER: string;
      EMAIL_PASS: string;
      BACKEND_URL: string;
    }
  }
}
