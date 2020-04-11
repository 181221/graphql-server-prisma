import {
  ConfigurationResolvers,
  RadarrStatusResolvers,
  AuthPayloadResolvers,
} from "../generated/prisma";
import { Context } from "./Context";

export const Configuration: ConfigurationResolvers.Type = {
  ...ConfigurationResolvers.defaultResolvers,
  user: ({ id }, args, context: Context) => context.prisma.Configuration({ id }).user(),
};

export const RadarrStatus: RadarrStatusResolvers.Type = {
  ...RadarrStatusResolvers.defaultResolvers,
};
export const AuthPayload: AuthPayloadResolvers.Type = {
  ...AuthPayloadResolvers.defaultResolvers,
};
