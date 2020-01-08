const jwt = require("jsonwebtoken");
const { APP_SECRET, authenticate } = require("../utils");

const createMovie = async (parent, args, context, info) => {
  const { userId } = authenticate(context);
  return await context.prisma.createMovie({
    title: args.title,
    requestedBy: { connect: { id: userId } }
  });
};

async function signup(parent, args, context, info) {
  const user = await context.prisma.createUser({ ...args });

  const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: "1h" });

  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }
  const token = jwt.sign({ userId: user.id, claims: "read-post" }, APP_SECRET, {
    expiresIn: "1h"
  });

  return {
    token,
    user
  };
}

module.exports = {
  signup,
  login,
  createMovie
};
