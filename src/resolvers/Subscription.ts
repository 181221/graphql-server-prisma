import { SubscriptionResolvers } from "../generated/prisma";
import { Context } from "./types/Context";

export const Subscription: SubscriptionResolvers.Type = {
  ...SubscriptionResolvers.defaultResolvers,
  newMovie: {
    subscribe: (parent, args, context: Context) => {
      return context.prisma.$subscribe
        .movie({ mutation_in: ["CREATED"] })
        .node();
    },
    resolve: (payload) => {
      return payload;
    },
  },
};
