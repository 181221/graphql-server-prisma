import {
  ConfigurationResolvers,
  RadarrStatusResolvers,
  AuthPayloadResolvers,
} from "../generated/prisma";

export const Configuration: ConfigurationResolvers.Type = {
  ...ConfigurationResolvers.defaultResolvers,
};

export const RadarrStatus: RadarrStatusResolvers.Type = {
  ...RadarrStatusResolvers.defaultResolvers,
};
export const AuthPayload: AuthPayloadResolvers.Type = {
  ...AuthPayloadResolvers.defaultResolvers,
};
