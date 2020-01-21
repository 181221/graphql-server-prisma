import { UserResolvers } from "../generated/prisma";
export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  movies: ({}, args, ctx) => {
    return null; //ctx.data.posts.filter(post => postIDs.includes(post.id))
  }
};
