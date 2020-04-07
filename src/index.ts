import { GraphQLServer } from "graphql-yoga";
import fetch from "node-fetch";
import { polyfill } from "es6-promise";
import { Movie, User, prisma, Configuration } from "./generated/prisma-client";
import sendPushRequest from "./notification";
import { resolvers } from "./resolvers";
import { config as DotEnvConfig } from "dotenv";

polyfill();

const dotenv = DotEnvConfig({
  path:
    process.env.NODE_ENV === "development"
      ? ".env.development"
      : ".env.development",
});

if (dotenv.error) {
  throw dotenv.error;
}
console.log(dotenv.parsed);
async function main() {
  const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: (request) => {
      return {
        ...request,
        prisma,
      };
    },
  });

  const serverOptions = {
    port: 4000,
    debug: true,
  };
  server.start(serverOptions, ({ port }) =>
    console.log(`Server is running on http://localhost:${port}`)
  );

  const movieUpdatePushRequest = async () => {
    const movie = await prisma.$subscribe
      .movie({ mutation_in: ["UPDATED"] })
      .node();

    let result = await movie.next();
    while (!result.done) {
      const user: User = await prisma.user({ id: result.value.requestedById });
      let sub = user.subscription;
      if (sub) {
        const mov: Movie[] = await prisma
          .user({ id: result.value.requestedById })
          .movies({ where: { id: result.value.id } });

        if (mov && mov[0]) {
          if (mov[0].downloaded) {
            sub = JSON.parse(sub);
            const payload = JSON.stringify({ title: mov[0].title });
            sendPushRequest(sub, payload);
          }
        }
      }
      result = await movie.next();
    }
  };

  const movieCreatedPushbulletRequest = async () => {
    const movie = await prisma.$subscribe
      .movie({ mutation_in: ["CREATED"] })
      .node();
    let result = await movie.next();
    while (!result.done) {
      const users: User[] = await prisma.users({
        where: { role: "ADMIN" },
      });
      const movieCreated: Movie = result.value;
      if (users && users.length !== 0) {
        const requestedByUser: User = await prisma.user({
          id: movieCreated.requestedById,
        });
        users.map(async (user) => {
          const config = await prisma.user({ id: user.id }).configuration();
          if (
            config &&
            config.pushoverApiKey &&
            config.pushoverEndpoint &&
            config.pushoverUserKey
          ) {
            const msg = `${requestedByUser.email} \nHas requested the movie:\n${result.value.title}`;
            const obj = {
              title: result.value.title,
              message: msg,
              token: config.pushoverApiKey,
              user: config.pushoverUserKey,
            };
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(obj),
            };
            const response = await fetch(config.pushoverEndpoint, options);
            console.log(
              `Fetch ${config.pushoverEndpoint} responded with ${response.statusText}`
            );
          }
        });
      }
      result = await movie.next();
    }
  };

  const radarrCollectionFetcher = async () => {
    const user: User[] = await prisma.users({ where: { role: "ADMIN" } });
    if (user && user.length !== 0) {
      const config: Configuration = await prisma
        .user({ id: user[0].id })
        .configuration();
      if (config) {
        setInterval(() => {
          const radarrUrl = config.radarrEndpoint;
          const urlCollection = `${radarrUrl}/movie?apikey=${config.radarrApiKey}`;
          fetch(urlCollection)
            .then((res) => res.json())
            .then((json) => {
              json.map(async (el) => {
                const movie = await prisma.movie({ tmdbId: el.tmdbId });
                if (movie && el.downloaded && !movie.downloaded) {
                  return await prisma.updateMovie({
                    data: { downloaded: true },
                    where: { id: movie.id },
                  });
                }
              });
            })
            .catch((err) => console.error(err));
        }, 600000);
      }
    }
  };

  movieUpdatePushRequest();
  radarrCollectionFetcher();
  movieCreatedPushbulletRequest();
}
main().catch((e) => console.error(e));
