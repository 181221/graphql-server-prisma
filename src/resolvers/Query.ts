const { authenticate } = require("../utils");
const { ApolloError } = require("apollo-server-core");
import { Configuration, User, Movie } from "../generated/prisma-client";
import { tmdb_endpoint } from "../constants";

const fetch = require("isomorphic-fetch");

import { Context } from "./types/Context";
async function movies(parent, args, context, info) {
  authenticate(context);
  const movies = await context.prisma.movies({
    orderBy: args.orderBy,
    first: args.first,
  });
  return movies;
}

async function user(parent, args, context: Context, info) {
  authenticate(context);
  const user = await context.prisma.user({ email: args.email });
  return user;
}

async function similarMovies(parent, args, context: Context, info) {
  authenticate(context);
  const url = `${tmdb_endpoint}/movie/${args.tmdbId}/similar?api_key=${process.env.TMDB_API_KEY}`;
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
}

async function radarrCollection(parent, args, context: Context, info) {
  authenticate(context);
  if (args && args.tmdbId) {
    const user: Array<User> = await context.prisma.users({
      where: { role: "ADMIN" },
    });
    if (user && user.length !== 0) {
      let config: Configuration = await context.prisma
        .user({ id: user[0].id })
        .configuration();
      if (config) {
        const radarr_url = config.radarrEndpoint;
        const url_collection = `${radarr_url}/movie?apikey=${config.radarrApiKey}`;
        const url_queue = `${radarr_url}/queue?apikey=${config.radarrApiKey}`;
        return fetch(url_collection)
          .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(res.statusText);
          })
          .then(async (json) => {
            const found = json.find(
              (element) => element.tmdbId === args.tmdbId
            );
            if (found) {
              let response = await fetch(url_queue);
              let data = await response.json();
              if (data && data.length > 0) {
                const queueElement = json.find(
                  (element) => element.movie.tmdbId === found.tmdbId
                );
                if (queueElement) return queueElement;
              }
              return found;
            }
            new ApolloError("not found", "404");
          })
          .catch((err) => new ApolloError(err.message, err.statusText));
      }
    }
  }
}

async function configuration(parent, args, context: Context, info) {
  let users = await context.prisma.users({ where: { role: "ADMIN" } });
  if (users && users.length !== 0) {
    let config = await context.prisma.user({ id: users[0].id }).configuration();
    if (config) return config;
    return config;
  }
  return null;
}

async function configurationPrivate(parent, args, context: Context, info) {
  let { userId, claims } = authenticate(context);
  if (claims === "admin") {
    let config = await context.prisma.user({ id: userId }).configuration();
    if (!config) {
      throw new Error("no config");
    }
    return config;
  }
  throw new ApolloError("Unauthorized", 401);
}

async function users(parent, args, context, info) {
  authenticate(context);
  const user = await context.prisma.users(null, info);
  return user;
}

module.exports = {
  users,
  movies,
  configuration,
  configurationPrivate,
  user,
  radarrCollection,
  similarMovies,
};
