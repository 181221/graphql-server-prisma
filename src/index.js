const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Movie = require("./resolvers/Movie");

const resolvers = { Query, Mutation, User, Movie };

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});
const options = {
  port: 4000
};

server.start(options, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
);
