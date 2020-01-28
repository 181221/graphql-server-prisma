const jwt = require("jsonwebtoken");
const { APP_SECRET, authenticate } = require("../utils");
const { ApolloError } = require("apollo-server-core");
import { Context } from "./types/Context";

const createMovie = async (parent, args, context: Context, info) => {
  const { userId } = authenticate(context);
  let gen = Object.values(args.genres)[0]
    .split(",")
    .map(el => el);
  return await context.prisma.createMovie({
    title: args.title,
    requestedBy: { connect: { id: userId } },
    requestedById: userId,
    genres: { set: gen },
    img: args.img,
    tmdb_id: args.tmdb_id,
    vote_average: args.vote_average,
    release_date: args.release_date,
    overview: args.overview
  });
};

async function deleteMovie(parent, args, context: Context, info) {
  authenticate(context);
  return await context.prisma.deleteMovie({ id: args.id });
}

async function updateUser(parant, args, context: Context, info) {
  const { userId } = authenticate(context);
  const user = context.prisma.user({ id: userId });
  let not =
    typeof args.notification === "undefined"
      ? user.notification
      : args.notification;
  let data = {
    subscription: args.subscription || user.subscription,
    notification: not,
    role: args.role || user.role,
    name: args.name || user.name
  };
  return await context.prisma.updateUser({
    data: data,
    where: { email: args.email }
  });
}

async function updateMovie(parent, args, context: Context, info) {
  authenticate(context);
  return await context.prisma.updateMovie({
    data: {
      downloaded: args.downloaded
    },
    where: {
      tmdb_id: args.tmdb_id
    }
  });
}
async function createConfiguration(parent, args, context: Context, info) {
  const { userId } = authenticate(context);
  let user = await context.prisma.user({ id: userId });
  if (user.role !== "ADMIN") {
    throw new ApolloError("Unauthorized", 401);
  }
  return await context.prisma.createConfiguration({
    radarrApiKey: args.radarrApiKey,
    radarrEndpoint: args.radarrEndpoint,
    radarrRootFolder: args.radarrRootFolder,
    pushoverApiKey: args.pushoverApiKey || "",
    pushoverUserKey: args.pushoverUserKey || "",
    user: { connect: { id: userId } }
  });
}
async function updateConfiguration(parent, args, context: Context, info) {
  const { userId } = authenticate(context);
  let user = await context.prisma.user({ id: userId });
  if (user.role !== "ADMIN") {
    throw new ApolloError("Unauthorized", 401);
  }
  let config = await context.prisma.user({ id: userId }).configuration();
  if (!config) {
    if (!args.radarrApiKey && !args.radarrRootFolder && !args.radarrEndpoint) {
      throw new ApolloError("provide radarr key, endpoint and root", 500);
    }
    return await context.prisma.createConfiguration({
      radarrApiKey: args.radarrApiKey,
      radarrEndpoint: args.radarrEndpoint,
      radarrRootFolder: args.radarrRootFolder,
      pushoverApiKey: args.pushoverApiKey || "",
      pushoverUserKey: args.pushoverUserKey || "",
      user: { connect: { id: userId } }
    });
  }
  return await context.prisma.updateConfiguration({
    data: {
      pushoverApiKey: args.pushoverApiKey || config.pushoverApiKey,
      pushoverUserKey: args.pushoverUserKey || config.pushoverUserKey,
      radarrApiKey: args.radarrApiKey || config.radarrApiKey,
      radarrEndpoint: args.radarrEndpoint || config.radarrEndpoint,
      radarrRootFolder: args.radarrRootFolder || config.radarrRootFolder
    },
    where: {
      id: config.id
    }
  });
}

async function createToken(parent, args, context: Context, info) {
  let user = await context.prisma.user({ email: args.email });
  if (!user) {
    let users = await context.prisma.users();
    if (users.length === 0) {
      user = await context.prisma.createUser({
        email: args.email,
        role: "ADMIN"
      });
    } else {
      user = await context.prisma.createUser({ email: args.email });
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET, {
      expiresIn: "1h"
    });
    return { user, token };
  }
  throw new ApolloError("user already exists", 404);
}

async function getToken(parent, args, context: Context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new ApolloError("No such user found", 404);
  }
  let token;
  if (user.role === "ADMIN") {
    token = jwt.sign({ userId: user.id, claims: "admin" }, APP_SECRET);
  } else {
    token = jwt.sign({ userId: user.id, claims: "read-post" }, APP_SECRET, {
      expiresIn: "1h"
    });
  }

  return {
    token,
    user
  };
}

module.exports = {
  getToken,
  createToken,
  createMovie,
  deleteMovie,
  updateMovie,
  createConfiguration,
  updateConfiguration,
  updateUser
};
