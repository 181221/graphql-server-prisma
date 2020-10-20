import { setVapidDetails, sendNotification } from "web-push";
import { config as DotEnvConfig } from "dotenv";
import { publicVapidKey, privateVapidKey } from "./config";

setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

const sendPushRequest = (subscription, payload) => {
  sendNotification(subscription, payload).catch((err) => console.error(err));
};

export default sendPushRequest;
