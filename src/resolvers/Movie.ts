import { MovieResolvers } from "../generated/prisma";
import { Context } from "./types/Context";
import { Movie as M } from "../generated/prisma-client";

export const Movie: MovieResolvers.Type = {
  ...MovieResolvers.defaultResolvers,
  requestedBy: ({ id }, args, context: Context) => {
    return context.prisma.movie({ id }).requestedBy();
  },
  backdrop_path: ({ id }, args, context: Context) => {
    return null;
  },
  hasFile: (parent: M, args, context: Context) => {
    return null;
  },
  poster_path: ({ id }, args, context: Context) => {
    return null;
  },
  status: ({ id }, args, context: Context) => {
    return null;
  },
  timeleft: ({ id }, args, context: Context) => {
    return null;
  },
};
