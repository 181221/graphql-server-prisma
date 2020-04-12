import { GraphQLServer } from "graphql-yoga";
import depthLimit = require("graphql-depth-limit");
import rateLimit = require("express-rate-limit");
import { resolvers } from "./resolvers";
import { prisma } from "./generated/prisma-client";

export const apolloServer = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});
apolloServer.express.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);
export const options = {
  port: 4000,
  debug: true,
  validationRules: [depthLimit(7)],
  formatError: (err): Error => {
    if (err.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }

    return err;
  },
  cors: {
    credentials: true,
    origin: ["http://localhost:8000", "https://request.hoddenserver.com"], // your frontend url.
  },
};
