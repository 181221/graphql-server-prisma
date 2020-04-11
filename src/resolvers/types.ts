import { Int, Float } from "../generated/prisma-client";

export interface AuthPayload {
  token: string | null;
}

export interface PrivateConfiguration {
  id: string;
  radarrApiKey: string;
  radarrEndpoint: string;
  radarrRootFolder: string;
  pushoverApiKey: string | null;
  pushoverUserKey: string | null;
}

export interface RadarrStatus {
  isRequested: boolean | null;
  hasFile: boolean | null;
  downloaded: boolean | null;
  status: string | null;
  timeleft: string | null;
  title: string | null;
}

export interface TmdbMovieResponse {
  adult: boolean | null;
  backdrop_path: string | null;
  genre_ids: Int[] | null;
  id: Int | null;
  original_language: string | null;
  original_title: string | null;
  overview: string | null;
  poster_path: string | null;
  release_date: string | null;
  title: string | null;
  video: boolean | null;
  vote_average: Float | null;
  vote_count: Int | null;
  popularity: Int | null;
  runtime: Int;
}
