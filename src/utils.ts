import { verify, sign } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-core";
import { Context } from "./resolvers/Context";
import { APP_SECRET } from "./index";

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
