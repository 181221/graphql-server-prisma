import { MovieResolvers } from "../generated/prisma";
import { Context } from "./Context";
import { Movie as M } from "../generated/prisma-client";

export const Movie: MovieResolvers.Type = {
  ...MovieResolvers.defaultResolvers,
  requestedBy: (parent, args, context: Context) => {
    console.log("id", parent);
    return context.prisma.movie({ id }).requestedBy();
  },
};
