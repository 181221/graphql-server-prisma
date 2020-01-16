const { authenticate } = require("../utils");

async function movies(parent, args, context, info) {
  authenticate(context);
  const movies = await context.prisma.movies({
    orderBy: args.orderBy,
    first: args.first
  });
  return movies;
}

async function user(parent, args, context, info) {
  authenticate(context);
  const user = await context.prisma.user({ email: args.email });
  return user;
}

async function users(parent, args, context, info) {
  authenticate(context);
  const user = await context.prisma.users();
  return user;
}

module.exports = {
  users,
  movies,
  user
};
