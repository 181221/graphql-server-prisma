import { setVapidDetails, sendNotification } from "web-push";
import { config as DotEnvConfig } from "dotenv";

DotEnvConfig({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env.development",
});

const publicVapidKey = process.env.WEB_PUSH_PUBLIC_KEY;
const privateVapidKey = process.env.WEB_PUSH_PRIVATE_KEY;
setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

const sendPushRequest = (subscription, payload) => {
  sendNotification(subscription, payload).catch((err) => console.error(err));
};

export default sendPushRequest;
