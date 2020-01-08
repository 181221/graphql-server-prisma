const jwt = require("jsonwebtoken");
require("dotenv").config();

const APP_SECRET = process.env.APP_SECRET;

const { AuthenticationError } = require("apollo-server-core");

function authenticate(context) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId, claims } = jwt.verify(token, APP_SECRET);
    return { userId, claims };
  }
  throw new AuthenticationError("Not authorised");
}

// Rules
module.exports = {
  APP_SECRET,
  authenticate
};
