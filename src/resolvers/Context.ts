import { Prisma } from "../generated/prisma-client";
import asyncRedis = require("async-redis");
import { RedisClient } from "redis";

export interface Context {
  prisma: Prisma;
  request: any;
  info: any;
  redisClient: asyncRedis;
}
