async function requestedBy(parent, args, context) {
  return await context.prisma.movie({ id: parent.id }).requestedBy();
}

module.exports = {
  requestedBy
};
