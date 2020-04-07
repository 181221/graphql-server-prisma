import { ApolloError } from "apollo-server-core";
import { GraphQLResolveInfo } from "graphql";
import fetch, { Response } from "node-fetch";
import { Configuration, User } from "../generated/prisma-client";
import { tmdbEndpoint } from "../constants";
import { QueryResolvers } from "../generated/prisma";
import { authenticate } from "../utils";
import { Context } from "./types/Context";

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,

  movie: async (
    parent,
    args: QueryResolvers.ArgsMovie,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    authenticate(context);
    return context.prisma.movie({ id: args.id });
  },

  movies: async (
    parent,
    args: QueryResolvers.ArgsMovies,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    authenticate(context);
    const movies = await context.prisma.movies({
      orderBy: args.orderBy,
      first: args.first,
    });
    return movies;
  },

  user: async (
    parent,
    args: QueryResolvers.ArgsUser,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    authenticate(context);
    const user = await context.prisma.user({ email: args.email });
    return user;
  },

  similarMovies: async (
    parent,
    args: QueryResolvers.ArgsSimilarMovies,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    authenticate(context);
    const url = `${tmdbEndpoint}/movie/${args.tmdbId}/similar?api_key=${process.env.TMDB_API_KEY}`;
    if (args && args.tmdbId) {
      return fetch(url)
        .then((res) => {
          if (res.ok) return res.json();
          return Promise.reject(res.statusText);
        })
        .then((json) => {
          return json.results;
        })
        .catch((err) => new ApolloError(err.message, err.statusText));
    }
  },

  radarrCollection: async (
    parent,
    args: QueryResolvers.ArgsRadarrCollection,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    authenticate(context);
    if (args && args.tmdbId) {
      const configs = await context.prisma.configurations();
      if (configs && configs.length > 0) {
        const config: Configuration = configs[0];
        const radarrUrl = config.radarrEndpoint;
        const urlCollection = `${radarrUrl}/movie?apikey=${config.radarrApiKey}`;
        const urlQueue = `${radarrUrl}/queue?apikey=${config.radarrApiKey}`;
        return fetch(urlCollection)
          .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(res.statusText);
          })
          .then(async (json) => {
            const found = json.find((element) => element.tmdbId === args.tmdbId);
            if (found) {
              const response: Response = await fetch(urlQueue);
              const data = await response.json();
              if (data && data.length > 0) {
                const queueElement = json.find((element) => element.movie.tmdbId === found.tmdbId);
                if (queueElement) {
                  queueElement.isRequested = true;
                  return queueElement;
                }
              }
              found.isRequested = true;
              return found;
            }
            return {
              isRequested: false,
              hasFile: false,
              downloaded: false,
              status: "",
              timeleft: "",
              title: "",
            };
          })
          .catch((err) => new ApolloError(err.message, err.statusText));
      }
    }
  },

  checkConfiguration: async (
    parent,
    args: QueryResolvers.ArgsCheckConfiguration,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    const users: User[] = await context.prisma.users({
      where: { role: "ADMIN" },
    });
    if (users && users.length !== 0) {
      const config: Configuration = await context.prisma.user({ id: users[0].id }).configuration();
      if (config) {
        const radarrUrl = config.radarrEndpoint;
        const url = `${radarrUrl}/movie?apikey=${config.radarrApiKey}`;
        const res: Response = await fetch(url, { method: "HEAD" });
        if (!res.ok) throw new ApolloError(res.statusText, res.status.toString());
        return true;
      }
    }
    return false;
  },

  configuration: async (
    parent,
    args: QueryResolvers.ArgsConfiguration,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    const { userId, claims } = authenticate(context);
    if (claims === "admin") {
      const config: Configuration = await context.prisma.user({ id: userId }).configuration();
      if (!config) {
        throw new Error("no config");
      }
      return config;
    }
    throw new ApolloError("Unauthorized", "401");
  },

  users: async (
    parent,
    args: QueryResolvers.ArgsUser,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    authenticate(context);
    const user: User[] = await context.prisma.users();
    return user;
  },
};
