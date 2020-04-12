import { verify, sign } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-core";
import { Context } from "./resolvers/Context";
import { APP_SECRET } from "./index";
import jwksClient = require("jwks-rsa");

export const authenticate = (context: Context) => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId, claims } = verify(token, APP_SECRET) as any;
    return { userId, claims };
  }
  throw new AuthenticationError("Unauthorized");
};

export const signKey = ({ id }, claims, expiresIn = "3h") => {
  return sign({ userId: id, claims }, APP_SECRET, { expiresIn });
};

const client = jwksClient({
  strictSsl: true, // Default value
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (!err) callback(null, key.getPublicKey());
    else callback(null, err.stack);
  });
};

export const isUserLoggedIn = async (thaToken) => {
  return new Promise(async (resolve, reject) => {
    verify(thaToken, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) return reject(err.message);
      return resolve(decoded);
    });
  });
};
/*
isUserLoggedIn()
  .then((res) => {
    console.log("resolved", res);
  })
  .catch((error) => console.log("error occured", error));*/
