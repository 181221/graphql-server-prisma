import { UserResolvers } from '../generated/prisma'
export const User: UserResolvers.Type = {
    ...UserResolvers.defaultResolvers,
  
    movies: ({id}, args, ctx) => {
        ctx.prisma.movies.
      return null//ctx.data.posts.filter(post => postIDs.includes(post.id))
    },
  }
