import { MovieResolvers } from "../generated/prisma";
import { Context } from "./Context";

export const Movie: MovieResolvers.Type = {
  ...MovieResolvers.defaultResolvers,
  requestedBy: ({ id }, args, context: Context) => context.prisma.movie({ id }).requestedBy(),
};
