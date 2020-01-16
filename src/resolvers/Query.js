const { authenticate } = require("../utils");

async function movies(parent, args, context, info) {
  authenticate(context);
  const movies = await context.prisma.movies({ orderBy: args.orderBy });
  return movies;
}

async function users(parent, args, context, info) {
  authenticate(context);
  const fragment = `
  fragment UserWithMovies on User {
    id
    email
    name
    movies {
      id
      title
    }
  }`;
  const user = await context.prisma.users();
  return user;
}

module.exports = {
  users,
  movies
};
