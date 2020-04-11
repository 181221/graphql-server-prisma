import { Resolvers } from "../generated/prisma";
import { Mutation } from "./Mutation";
import { Query } from "./Query";
import { Movie } from "./Movie";
import { User } from "./User";
import { Subscription } from "./Subscription";
import { Configuration, RadarrStatus, AuthPayload } from "./Others";

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Movie,
  User,
  Subscription,
  Configuration,
  RadarrStatus,
  AuthPayload,
};
