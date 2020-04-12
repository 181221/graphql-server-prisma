import { config as DotEnvConfig } from "dotenv";
const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV);
const dotenv = DotEnvConfig({
  path: NODE_ENV === "development" ? ".env.development" : ".env.production",
});

if (dotenv.error) {
  throw dotenv.error;
}
export const APP_SECRET = process.env.APP_SECRET;
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;

console.log(dotenv.parsed);
