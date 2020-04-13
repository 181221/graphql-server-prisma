import { config as DotEnvConfig } from "dotenv";
export const NODE_ENV = process.env.NODE_ENV;

const dotenv = DotEnvConfig({
  path: NODE_ENV === "development" ? ".env.development" : ".env.production",
});

if (dotenv.error) {
  throw dotenv.error;
}
export const APP_SECRET = process.env.APP_SECRET;
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
export const publicVapidKey = process.env.WEB_PUSH_PUBLIC_KEY;
export const privateVapidKey = process.env.WEB_PUSH_PRIVATE_KEY;
export const redisUrl = process.env.REDIS_URL;
console.log(`ENV: ${NODE_ENV}`);
console.log(dotenv.parsed);
