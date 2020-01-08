const { authenticate } = require("../utils");

async function movies(parent, args, context, info) {
  authenticate(context);
  const movies = await context.prisma.movies();
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
  const user = await context.prisma.users().$fragment(fragment);
  return user;
}

module.exports = {
  users,
  movies
};
