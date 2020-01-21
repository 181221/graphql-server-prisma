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

async function createToken(parent, args, context: Context, info) {
  let user = await context.prisma.user({ email: args.email });
  if (!user) {
    user = await context.prisma.createUser({ email: args.email });
    const token = jwt.sign({ userId: user.id }, APP_SECRET, {
      expiresIn: "1h"
    });
    return { user, token };
  }
  throw new ApolloError("user already exists", 404);
}

async function getToken(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new ApolloError("No such user found", 404);
  }
  const token = jwt.sign({ userId: user.id, claims: "read-post" }, APP_SECRET, {
    expiresIn: "1h"
  });

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
  updateMovie
};
