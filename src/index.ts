export {};
import { GraphQLServer } from "graphql-yoga";
import { Movie, User, prisma } from "./generated/prisma-client";
import Mailer from "./mailer";
const fetch = require("isomorphic-fetch");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Movie = require("./resolvers/Movie");
const Subscription = require("./resolvers/Subscription");
const resolvers = { Query, Mutation, User, Movie, Subscription };
require("es6-promise").polyfill();

const dotenv = require("dotenv").config({
  path: ".env.development"
});

if (dotenv.error) {
  throw dotenv.error;
}
console.log(dotenv.parsed);
async function main() {
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
    port: 4000,
    debug: true
  };
  server.start(options, ({ port }) =>
    console.log(`Server is running on http://localhost:${port}`)
  );

  const radarr_url = "http://172.20.0.5:7878/api";
  const url_collection = `${radarr_url}/movie?apikey=${process.env.RADARR_API_KEY}`;

  const getMovie = async tmdb_id => {
    return await prisma.movie({
      tmdb_id: tmdb_id
    });
  };

  const updateMovie = async id => {
    return await prisma.updateMovie({
      data: { downloaded: true },
      where: { id: id }
    });
  };
  let test: Movie = await prisma
    .user({ id: "5e26d8e8e03dd800075e55cf" })
    .movies({ where: { id: "5e26dcaae03dd800075e55d2" } });
  console.log(test);

  const movieUpdatePushRequest = async () => {
    let movie = await prisma.$subscribe
      .movie({ mutation_in: ["UPDATED"] })
      .node();

    let result = await movie.next();
    while (!result.done) {
      let user = await prisma.user({ id: result.value.requestedById });
      if (user.notification) {
        let movies: Array<Movie> = await prisma.movies({
          where: { requestedById: result.value.requestedById }
        });
        let mov: Movie = movies.find(movie => movie.id === result.value.id);
        if (mov) {
          if (mov.downloaded) Mailer(mov);
        }
      }
      result = await movie.next();
    }
  };
  movieUpdatePushRequest();
  setInterval(() => {
    console.log("scanning for downloaded movies");
    fetch(url_collection)
      .then(res => res.json())
      .then(json => {
        json.map(async el => {
          const movie = await getMovie(el.tmdbId.toString());
          if (movie && el.downloaded && !movie.downloaded) {
            updateMovie(movie.id);
          }
        });
      })
      .catch(err => console.error(err));
  }, 600000);
}
main().catch(e => console.error(e));
