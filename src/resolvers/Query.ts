import { ApolloError } from "apollo-server-core";
import { GraphQLResolveInfo } from "graphql";
import fetch, { Response } from "node-fetch";
import { Configuration, User, Movie } from "../generated/prisma-client";
import { tmdbEndpoint } from "../constants";
import { QueryResolvers } from "../generated/prisma";
import { Context } from "./Context";
import { TmdbMovieResponse } from "./types";
import { genresMap, radarrCollectionCacheKey } from "../constants";
import { getRadarrCollection, getQueue } from "../batches";

const defaultRadarrResponse = {
  isRequested: false,
  hasFile: false,
  downloaded: false,
  status: "",
  timeleft: "",
  title: "",
};

const isInQueue = async (found) => {
  let isQueued;
  const queueData = await getQueue();
  if (queueData && queueData.length > 0) {
    isQueued = queueData.find((element) => element.movie.tmdbId === found.tmdbId);
  }
  return isQueued;
};

const getSimilarMovies = async (url: string) => {
  const response = await fetch(url);
  if (response.ok) {
    const { results } = await response.json();
    const movies: Movie[] = Object.values(results).map((el: TmdbMovieResponse) => {
      return {
        id: null,
        title: el.title,
        tmdbId: el.id,
        img: el.poster_path,
        genres: Object.values(el.genre_ids).map((id: number) => genresMap[id]),
        overview: el.overview,
        voteCount: el.vote_count,
        voteAverage: el.vote_average,
        year: new Date(el.release_date).getFullYear(),
      };
    });
    return movies;
  }
  return Promise.reject(response);
};

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,

  movie: async (
    parent,
    args: QueryResolvers.ArgsMovie,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    return context.prisma.movie({ id: args.id });
  },

  movies: async (
    parent,
    args: QueryResolvers.ArgsMovies,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    const movies = await context.prisma.movies({
      orderBy: args.orderBy,
      first: args.first,
    });
    return movies;
  },

  tmdbMovie: async (
    parent,
    args: QueryResolvers.ArgsTmdbMovie,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    const tmdbUrl = `${tmdbEndpoint}/movie/${args.tmdbId}?api_key=${process.env.TMDB_API_KEY}`;
    const response = await fetch(tmdbUrl);
    const json = await response.json();
    const movie: Movie = {
      genres: Object.values(json.genres).map(({ name }) => name),
      title: json.title,
      tmdbId: json.id,
      img: json.poster_path,
      overview: json.overview,
      voteAverage: json.vote_average,
      voteCount: json.vote_count,
      year: new Date(json.release_date).getFullYear(),
      id: json.id,
    };
    return movie;
  },

  user: async (
    parent,
    args: QueryResolvers.ArgsUser,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    const user = await context.prisma.user({ email: args.email });
    if (!user) return new ApolloError("No such user found");
    return user;
  },

  similarMovies: async (
    parent,
    args: QueryResolvers.ArgsSimilarMovies,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    const url = `${tmdbEndpoint}/movie/${args.tmdbId}/similar?api_key=${process.env.TMDB_API_KEY}`;
    if (args && args.tmdbId) {
      return getSimilarMovies(url);
    }
  },

  radarrCollection: async (
    parent,
    args: QueryResolvers.ArgsRadarrCollection,
    { prisma, redisClient }: Context,
    info: GraphQLResolveInfo,
  ) => {
    if (args && args.tmdbId) {
      const configs = await prisma.configurations();
      if (configs && configs.length > 0) {
        const data = (await redisClient.lrange(radarrCollectionCacheKey, 0, -1)) || [];
        if (data && data.length > 0) {
          const datatest = data.map((el: string) => JSON.parse(el));
          const found = datatest.find((element) => element.tmdbId === args.tmdbId);
          if (found) {
            found.isRequested = true;
            const isQueued = await isInQueue(found);
            return { ...found, ...isQueued };
          }
          return defaultRadarrResponse;
        } else {
          const radarr = await getRadarrCollection();
          if (radarr) {
            const radarrCollectonStrings = radarr.map((x) => JSON.stringify(x));
            await redisClient.lpush(radarrCollectionCacheKey, ...radarrCollectonStrings);
            const found = radarr.find((element) => element.tmdbId === args.tmdbId);
            if (found) {
              found.isRequested = true;
              const isQueued = await isInQueue(found);
              return { ...found, ...isQueued };
            }
            return defaultRadarrResponse;
          }
        }
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
    const user: User = await context.prisma.user({ email: context.request.user.email });
    if (user.role === "ADMIN") {
      const config: Configuration = await context.prisma
        .user({ email: context.request.user.email })
        .configuration();
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
    const user: User[] = await context.prisma.users();
    return user;
  },
};
