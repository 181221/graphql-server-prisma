function requestedBy(parent, args, context) {
  return context.prisma.movie({ id: parent.id }).users();
}

module.exports = {
  requestedBy
};
