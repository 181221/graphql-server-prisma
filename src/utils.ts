import { verify } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-core";
import { Context } from "./resolvers/types/Context";
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
