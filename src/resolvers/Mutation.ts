import jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server-core";
import { GraphQLResolveInfo } from "graphql";
import fetch from "node-fetch";
import { APP_SECRET, authenticate } from "../utils";
import { Context } from "./types/Context";
import { Configuration, Movie } from "../generated/prisma-client";
import { MutationResolvers } from "../generated/prisma";

const addMovieToRadarrCollection = async (args, config) => {
  const obj = {
    title: args.title,
    qualityProfileId: 3,
    titleSlug: `${args.title.replace(" ", "-").toLowerCase()}-${args.tmdbId}`,
    images: [
      {
        coverType: "poster",
        url: args.img,
      },
    ],
    tmdbId: args.tmdbId,
    year: Number(new Date(args.release_date).getFullYear()),
    rootFolderPath: config.radarrRootFolder,
  };
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
    method: "POST",
  };
  const url = `${config.radarrEndpoint}/movie?apikey=${config.radarrApiKey}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new ApolloError(res.statusText, res.status.toString());
  }
};

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,

  createMovie: async (
    parent,
    args: MutationResolvers.ArgsCreateMovie,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    const { userId } = authenticate(context);
    const configs = await context.prisma.configurations();
    if (configs && configs.length > 0) {
      const config: Configuration = configs[0];
      addMovieToRadarrCollection(args, config);
    } else {
      throw new ApolloError("No config", "400");
    }
    return await context.prisma.createMovie({
      title: args.title,
      requestedBy: { connect: { id: userId } },
      requestedById: userId,
      genres: { set: args.genres },
      img: args.img,
      tmdbId: args.tmdbId,
      vote_average: args.vote_average,
      release_date: args.release_date,
      overview: args.overview,
    });
  },

  deleteMovie: async (
    parent,
    args: MutationResolvers.ArgsDeleteMovie,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    authenticate(context);
    return await context.prisma.deleteMovie({ id: args.id });
  },

  updateMovie: async (
    parent,
    args: MutationResolvers.ArgsUpdateMovie,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    authenticate(context);
    return await context.prisma.updateMovie({
      data: {
        downloaded: args.downloaded,
      },
      where: {
        tmdbId: args.tmdbId,
      },
    });
  },

  updateUser: async (
    parent,
    args: MutationResolvers.ArgsUpdateUser,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    const { userId } = authenticate(context);
    return await context.prisma.updateUser({
      data: args,
      where: { email: args.email },
    });
  },

  createConfiguration: async (
    parent,
    args: MutationResolvers.ArgsCreateConfiguration,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    const { userId, claims } = authenticate(context);
    if (claims !== "admin") {
      throw new ApolloError("Unauthorized", "401");
    }
    return await context.prisma.createConfiguration({
      radarrApiKey: args.radarrApiKey,
      radarrEndpoint: args.radarrEndpoint,
      radarrRootFolder: args.radarrRootFolder,
      pushoverEndpoint: args.pushoverApiKey || "",
      pushoverApiKey: args.pushoverApiKey || "",
      pushoverUserKey: args.pushoverUserKey || "",
      user: { connect: { id: userId } },
    });
  },

  updateConfiguration: async (
    parent,
    args: MutationResolvers.ArgsUpdateConfiguration,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    const { userId, claims } = authenticate(context);
    if (claims !== "admin") {
      throw new ApolloError("Unauthorized", "401");
    }
    const config = await context.prisma.user({ id: userId }).configuration();
    if (!config) {
      return await context.prisma.createConfiguration({
        radarrApiKey: args.radarrApiKey || "",
        radarrEndpoint: args.radarrEndpoint || "",
        radarrRootFolder: args.radarrRootFolder || "",
        pushoverEndpoint: args.pushoverEndpoint || "",
        pushoverApiKey: args.pushoverApiKey || "",
        pushoverUserKey: args.pushoverUserKey || "",
        user: { connect: { id: userId } },
      });
    }
    return await context.prisma.updateConfiguration({
      data: {
        pushoverEndpoint: args.pushoverEndpoint || config.pushoverEndpoint,
        pushoverApiKey: args.pushoverApiKey || config.pushoverApiKey,
        pushoverUserKey: args.pushoverUserKey || config.pushoverUserKey,
        radarrApiKey: args.radarrApiKey || config.radarrApiKey,
        radarrEndpoint: args.radarrEndpoint || config.radarrEndpoint,
        radarrRootFolder: args.radarrRootFolder || config.radarrRootFolder,
      },
      where: {
        id: config.id,
      },
    });
  },

  createToken: async (
    parent,
    args: MutationResolvers.ArgsCreateToken,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    let user = await context.prisma.user({ email: args.email });
    if (!user) {
      const users = await context.prisma.users();
      let token;
      let adminToken = false;
      if (users.length === 0) {
        user = await context.prisma.createUser({
          email: args.email,
          role: "ADMIN",
        });
        token = jwt.sign({ userId: user.id, claims: "admin" }, APP_SECRET);
        adminToken = true;
      } else {
        user = await context.prisma.createUser({ email: args.email });
        token = jwt.sign({ userId: user.id, claims: "read-post" }, APP_SECRET, {
          expiresIn: "1h",
        });
      }
      return { user, token, adminToken };
    }
    throw new ApolloError("user already exists", "404");
  },

  getToken: async (
    parent,
    args: MutationResolvers.ArgsGetToken,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    const user = await context.prisma.user({ email: args.email });
    if (!user) {
      throw new ApolloError("No such user found", "404");
    }
    let token;
    if (user.role === "ADMIN") {
      token = jwt.sign({ userId: user.id, claims: "admin" }, APP_SECRET);
    } else {
      token = jwt.sign({ userId: user.id, claims: "read-post" }, APP_SECRET, {
        expiresIn: "1h",
      });
    }

    return {
      token,
      user,
    };
  },
};
