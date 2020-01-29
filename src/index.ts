export {};
import { GraphQLServer } from "graphql-yoga";
import { Movie, User, prisma, Configuration } from "./generated/prisma-client";
import sendPushRequest from "./notification";

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
    resolvers: resolvers,
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

  const movieUpdatePushRequest = async () => {
    let movie = await prisma.$subscribe
      .movie({ mutation_in: ["UPDATED"] })
      .node();

    let result = await movie.next();
    while (!result.done) {
      let user: User = await prisma.user({ id: result.value.requestedById });
      if (user.notification) {
        let mov: Array<Movie> = await prisma
          .user({ id: result.value.requestedById })
          .movies({ where: { id: result.value.id } });

        if (mov && mov[0]) {
          if (mov[0].downloaded) {
            let sub = JSON.parse(user.subscription);
            console.log(sub);
            const payload = JSON.stringify({ title: "Push Test" });
            //sendPushRequest(sub, payload);
          }
        }
      }
      result = await movie.next();
    }
  };

  const movieCreatedPushbulletRequest = async () => {
    let movie = await prisma.$subscribe
      .movie({ mutation_in: ["CREATED"] })
      .node();
    let result = await movie.next();
    while (!result.done) {
      const user: Array<User> = await prisma.users({
        where: { role: "ADMIN" }
      });
      if (user && user.length !== 0) {
        let config: Configuration = await prisma
          .user({ id: user[0].id })
          .configuration();
        if (
          config.pushoverApiKey &&
          config.pushoverEndpoint &&
          config.pushoverUserKey
        ) {
          const msg = `${user[0].email} \nHas requested the movie:\n${result.value.title}`;
          const obj = {
            title: result.value.title,
            message: msg,
            token: config.pushoverApiKey,
            user: config.pushoverUserKey
          };
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
          };
          const response = await fetch(config.pushoverEndpoint, options);
          console.log(
            `Fetch ${config.pushoverEndpoint} responded with ${response.statusText}`
          );
        }
      }
      result = await movie.next();
    }
  };

  const radarrCollectionFetcher = async () => {
    const user: Array<User> = await prisma.users({ where: { role: "ADMIN" } });
    if (user && user.length !== 0) {
      let config: Configuration = await prisma
        .user({ id: user[0].id })
        .configuration();
      if (config) {
        setInterval(() => {
          console.log("scanning for downloaded movies");
          const radarr_url = config.radarrEndpoint;
          const url_collection = `${radarr_url}/movie?apikey=${config.radarrApiKey}`;
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
    }
  };

  movieUpdatePushRequest();
  radarrCollectionFetcher();
  movieCreatedPushbulletRequest();
}
main().catch(e => console.error(e));
