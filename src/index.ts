import { polyfill } from "es6-promise";
import { apolloServer, options } from "./initGraphQlServer";
import {
  movieUpdatePushRequest,
  radarrCollectionFetcher,
  movieCreatedPushbulletRequest,
} from "./batches";

polyfill();
async function main() {
  apolloServer.start(options, ({ port }) =>
    console.log(`Server is running on http://localhost:${port}`),
  );

  movieUpdatePushRequest();
  radarrCollectionFetcher();
  movieCreatedPushbulletRequest();
}
main().catch((e) => console.error(e));
