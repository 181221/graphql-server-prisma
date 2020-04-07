import { UserResolvers } from "../generated/prisma";
import { Context } from "./Context";
export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,
  movies: (parent, args, context: Context) => {
    return context.prisma.user({ id: parent.id }).movies();
  },
  configuration: (parent, args, context: Context) => {
    return context.prisma.user({ id: parent.id }).configuration();
  },
};
