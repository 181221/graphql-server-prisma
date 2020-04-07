import {
  ConfigurationResolvers,
  RadarrStatusResolvers,
  AuthPayloadResolvers,
} from "../generated/prisma";
import { Context } from "./Context";
import { Role } from "../generated/prisma-client";
import { AuthPayload as Auth } from "./types/types";

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
};
