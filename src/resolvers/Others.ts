import {
  ConfigurationResolvers,
  RadarrStatusResolvers,
  AuthPayloadResolvers,
} from "../generated/prisma";
import { Context } from "./types/Context";
import { Role } from "../generated/prisma-client";

export const Configuration: ConfigurationResolvers.Type = {
  ...ConfigurationResolvers.defaultResolvers,
  user: ({ id }, args, context: Context) => {
    return context.prisma.configuration({ id }).user();
  },
};

export const RadarrStatus: RadarrStatusResolvers.Type = {
  ...RadarrStatusResolvers.defaultResolvers,
};
export const AuthPayload: AuthPayloadResolvers.Type = {
  ...AuthPayloadResolvers.defaultResolvers,
  user: ({ token }, args, context: Context) => {
    return context.prisma.user({ id: token });
  },
  adminToken: async (parent, args, context: Context) => {
    const role: Role = await context.prisma.user({ id: parent.token }).role();
    return role === "ADMIN";
  },
};
