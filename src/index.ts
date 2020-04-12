import fetch from "node-fetch";
import { polyfill } from "es6-promise";
import { config as DotEnvConfig } from "dotenv";
import { apolloServer, options } from "./initGraphQlServer";
import { Movie, User, prisma, Configuration } from "./generated/prisma-client";
import sendPushRequest from "./notification";

polyfill();

const NODE_ENV = process.env.NODE_ENV;
const dotenv = DotEnvConfig({
  path: NODE_ENV === "development" ? ".env.development" : ".env.production",
});

if (dotenv.error) {
  throw dotenv.error;
}
export const APP_SECRET = process.env.APP_SECRET;
console.log(dotenv.parsed);
async function main() {
  apolloServer.start(options, ({ port }) =>
    console.log(`Server is running on http://localhost:${port}`),
  );

  const movieUpdatePushRequest = async () => {
    const movie = await prisma.$subscribe.movie({ mutation_in: ["UPDATED"] }).node();

    let result = await movie.next();
    while (!result.done) {
      const mov: Movie = await prisma.movie({ id: result.value.id });
      const user: User = await prisma.movie({ id: result.value.id }).requestedBy();
      let sub = user.subscription;
      if (sub) {
        if (mov && mov.downloaded) {
          sub = JSON.parse(sub);
          const payload = JSON.stringify({ title: mov.title });
          sendPushRequest(sub, payload);
        }
      }
      result = await movie.next();
    }
  };

  const movieCreatedPushbulletRequest = async () => {
    const movie = await prisma.$subscribe.movie({ mutation_in: ["CREATED"] }).node();
    let result = await movie.next();
    while (!result.done) {
      const users: User[] = await prisma.users({
        where: { role: "ADMIN" },
      });
      if (users && users.length !== 0) {
        const requestedByUser: User = await prisma
          .movie({
            id: result.value.id,
          })
          .requestedBy();
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
            console.log(`Fetch ${config.pushoverEndpoint} responded with ${response.statusText}`);
          }
        });
      }
      result = await movie.next();
    }
  };

  const radarrCollectionFetcher = async () => {
    const user: User[] = await prisma.users({ where: { role: "ADMIN" } });
    if (user && user.length !== 0) {
      const config: Configuration = await prisma.user({ id: user[0].id }).configuration();
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
        }, 300000);
      }
    }
  };

  movieUpdatePushRequest();
  radarrCollectionFetcher();
  movieCreatedPushbulletRequest();
}
main().catch((e) => console.error(e));
