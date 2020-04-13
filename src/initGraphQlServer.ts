import { GraphQLServer } from "graphql-yoga";
import depthLimit = require("graphql-depth-limit");
import rateLimit = require("express-rate-limit");
import bodyParser = require("body-parser");
import { ApolloError } from "apollo-server-core";
import fetch, { Response } from "node-fetch";
import redis = require("redis");
// tslint:disable-next-line: no-var-requires
import asyncRedis = require("async-redis");

import { resolvers } from "./resolvers";
import { prisma, User, Configuration } from "./generated/prisma-client";
import { isUserLoggedIn } from "./utils";
import { NODE_ENV, redisUrl } from "./config";
import { radarrCollectionCacheKey } from "./constants";

export const client = redis.createClient(redisUrl);
export const asyncRedisClient = asyncRedis.decorate(client);

client.on("error", (error) => {
  console.error(error);
});

client.del(radarrCollectionCacheKey);

export const apolloServer = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
      redisClient: asyncRedisClient,
    };
  },
});

const loggingMiddleware = (req, res, next) => {
  if (req.method !== "OPTIONS") {
    isUserLoggedIn(req.headers.authorization)
      .then((auth0) => {
        req.user = auth0;
        next();
      })
      .catch((error) => {
        console.log("error", error);
        res.status(401).send(error);
      });
  } else {
    next();
  }
};
apolloServer.express.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
  //loggingMiddleware,
  bodyParser.json(),
);

apolloServer.express.options("/api/checkConfiguration", async (req, res, done) => {
  const params = req.body;
  if (params && params.query) {
    const users: User[] = await prisma.users({
      where: { role: "ADMIN" },
    });

    if (users && users.length !== 0) {
      const config: Configuration = await prisma.user({ id: users[0].id }).configuration();
      if (config) {
        const radarrUrl = config.radarrEndpoint;
        const url = `${radarrUrl}/movie?apikey=${config.radarrApiKey}`;
        const response: Response = await fetch(url, { method: "HEAD" });
        if (!response.ok)
          res.status(404).send(new ApolloError(response.statusText, response.status.toString()));
        res.status(200).send({ hasSettings: true });
      }
    } else {
      res.status(200).send({ hasSettings: false });
    }
  } else {
    res.status(404).send();
  }
});
export const options = {
  port: 4000,
  debug: true,
  playground: NODE_ENV === "development" ? "/" : "false",
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
