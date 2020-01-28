const { authenticate } = require("../utils");

import { Context } from "./types/Context";
async function movies(parent, args, context, info) {
  authenticate(context);
  const movies = await context.prisma.movies({
    orderBy: args.orderBy,
    first: args.first
  });
  return movies;
}

async function user(parent, args, context: Context, info) {
  authenticate(context);
  const user = await context.prisma.user({ email: args.email });
  return user;
}
async function configuration(parent, args, context: Context, info) {
  authenticate(context);
  const users = await context.prisma.users({ where: { role: "ADMIN" } });
  if (users && users.length !== 0) {
    let config = await context.prisma.user({ id: users[0].id }).configuration();
    if (config) {
      return config;
    }
    throw new Error("no config");
  }
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
  user
};
