function movies(parent, args, context) {
  return context.prisma.user({ id: parent.id }).movies();
}

module.exports = {
  movies
};
