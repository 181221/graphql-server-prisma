function newMovieSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.movie({ mutation_in: ["CREATED"] }).node();
}

const newMovie = {
  subscribe: newMovieSubscribe,
  resolve: payload => {
    return payload;
  }
};

module.exports = {
  newMovie
};
