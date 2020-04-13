import { polyfill } from "es6-promise";
import { apolloServer, options, client, asyncRedisClient } from "./initGraphQlServer";
import { radarrCollectionCacheKey } from "./constants";
import {
  movieUpdatePushRequest,
  radarrCollectionFetcher,
  movieCreatedPushbulletRequest,
  getRadarrCollection,
} from "./batches";

polyfill();
async function main() {
  apolloServer.start(options, ({ port }) =>
    console.log(`Server is running on http://localhost:${port}`),
  );
  const radarr = await getRadarrCollection();
  const radarrCollectonStrings = radarr.map((x) => JSON.stringify(x));
  await asyncRedisClient.lpush(radarrCollectionCacheKey, ...radarrCollectonStrings);
  movieUpdatePushRequest();
  radarrCollectionFetcher();
  movieCreatedPushbulletRequest();
}
main().catch((e) => console.error(e));
