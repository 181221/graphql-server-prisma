const webpush = require("web-push");
const dotenv = require("dotenv").config({
  path: ".env.development"
});

const publicVapidKey = process.env.WEB_PUSH_PUBLIC_KEY;
const privateVapidKey = process.env.WEB_PUSH_PRIVATE_KEY;
webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

const sendPushRequest = (subscription, payload) => {
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
};

export default sendPushRequest;
