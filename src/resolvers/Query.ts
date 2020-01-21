const { authenticate } = require("../utils");
import { Context } from "./Context";
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

async function users(parent, args, context, info) {
  authenticate(context);
  const user = await context.prisma.users(null, info);
  return user;
}

module.exports = {
  users,
  movies,
  user
};
