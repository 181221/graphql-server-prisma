// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateConfiguration {
  count: Int!
}

type AggregateMovie {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Configuration {
  id: ID!
  radarrApiKey: String
  radarrEndpoint: String
  radarrRootFolder: String
  pushoverEndpoint: String
  pushoverApiKey: String
  pushoverUserKey: String
}

type ConfigurationConnection {
  pageInfo: PageInfo!
  edges: [ConfigurationEdge]!
  aggregate: AggregateConfiguration!
}

input ConfigurationCreateInput {
  id: ID
  radarrApiKey: String
  radarrEndpoint: String
  radarrRootFolder: String
  pushoverEndpoint: String
  pushoverApiKey: String
  pushoverUserKey: String
}

input ConfigurationCreateOneInput {
  create: ConfigurationCreateInput
  connect: ConfigurationWhereUniqueInput
}

type ConfigurationEdge {
  node: Configuration!
  cursor: String!
}

enum ConfigurationOrderByInput {
  id_ASC
  id_DESC
  radarrApiKey_ASC
  radarrApiKey_DESC
  radarrEndpoint_ASC
  radarrEndpoint_DESC
  radarrRootFolder_ASC
  radarrRootFolder_DESC
  pushoverEndpoint_ASC
  pushoverEndpoint_DESC
  pushoverApiKey_ASC
  pushoverApiKey_DESC
  pushoverUserKey_ASC
  pushoverUserKey_DESC
}

type ConfigurationPreviousValues {
  id: ID!
  radarrApiKey: String
  radarrEndpoint: String
  radarrRootFolder: String
  pushoverEndpoint: String
  pushoverApiKey: String
  pushoverUserKey: String
}

type ConfigurationSubscriptionPayload {
  mutation: MutationType!
  node: Configuration
  updatedFields: [String!]
  previousValues: ConfigurationPreviousValues
}

input ConfigurationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ConfigurationWhereInput
  AND: [ConfigurationSubscriptionWhereInput!]
  OR: [ConfigurationSubscriptionWhereInput!]
  NOT: [ConfigurationSubscriptionWhereInput!]
}

input ConfigurationUpdateDataInput {
  radarrApiKey: String
  radarrEndpoint: String
  radarrRootFolder: String
  pushoverEndpoint: String
  pushoverApiKey: String
  pushoverUserKey: String
}

input ConfigurationUpdateInput {
  radarrApiKey: String
  radarrEndpoint: String
  radarrRootFolder: String
  pushoverEndpoint: String
  pushoverApiKey: String
  pushoverUserKey: String
}

input ConfigurationUpdateManyMutationInput {
  radarrApiKey: String
  radarrEndpoint: String
  radarrRootFolder: String
  pushoverEndpoint: String
  pushoverApiKey: String
  pushoverUserKey: String
}

input ConfigurationUpdateOneInput {
  create: ConfigurationCreateInput
  update: ConfigurationUpdateDataInput
  upsert: ConfigurationUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: ConfigurationWhereUniqueInput
}

input ConfigurationUpsertNestedInput {
  update: ConfigurationUpdateDataInput!
  create: ConfigurationCreateInput!
}

input ConfigurationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  radarrApiKey: String
  radarrApiKey_not: String
  radarrApiKey_in: [String!]
  radarrApiKey_not_in: [String!]
  radarrApiKey_lt: String
  radarrApiKey_lte: String
  radarrApiKey_gt: String
  radarrApiKey_gte: String
  radarrApiKey_contains: String
  radarrApiKey_not_contains: String
  radarrApiKey_starts_with: String
  radarrApiKey_not_starts_with: String
  radarrApiKey_ends_with: String
  radarrApiKey_not_ends_with: String
  radarrEndpoint: String
  radarrEndpoint_not: String
  radarrEndpoint_in: [String!]
  radarrEndpoint_not_in: [String!]
  radarrEndpoint_lt: String
  radarrEndpoint_lte: String
  radarrEndpoint_gt: String
  radarrEndpoint_gte: String
  radarrEndpoint_contains: String
  radarrEndpoint_not_contains: String
  radarrEndpoint_starts_with: String
  radarrEndpoint_not_starts_with: String
  radarrEndpoint_ends_with: String
  radarrEndpoint_not_ends_with: String
  radarrRootFolder: String
  radarrRootFolder_not: String
  radarrRootFolder_in: [String!]
  radarrRootFolder_not_in: [String!]
  radarrRootFolder_lt: String
  radarrRootFolder_lte: String
  radarrRootFolder_gt: String
  radarrRootFolder_gte: String
  radarrRootFolder_contains: String
  radarrRootFolder_not_contains: String
  radarrRootFolder_starts_with: String
  radarrRootFolder_not_starts_with: String
  radarrRootFolder_ends_with: String
  radarrRootFolder_not_ends_with: String
  pushoverEndpoint: String
  pushoverEndpoint_not: String
  pushoverEndpoint_in: [String!]
  pushoverEndpoint_not_in: [String!]
  pushoverEndpoint_lt: String
  pushoverEndpoint_lte: String
  pushoverEndpoint_gt: String
  pushoverEndpoint_gte: String
  pushoverEndpoint_contains: String
  pushoverEndpoint_not_contains: String
  pushoverEndpoint_starts_with: String
  pushoverEndpoint_not_starts_with: String
  pushoverEndpoint_ends_with: String
  pushoverEndpoint_not_ends_with: String
  pushoverApiKey: String
  pushoverApiKey_not: String
  pushoverApiKey_in: [String!]
  pushoverApiKey_not_in: [String!]
  pushoverApiKey_lt: String
  pushoverApiKey_lte: String
  pushoverApiKey_gt: String
  pushoverApiKey_gte: String
  pushoverApiKey_contains: String
  pushoverApiKey_not_contains: String
  pushoverApiKey_starts_with: String
  pushoverApiKey_not_starts_with: String
  pushoverApiKey_ends_with: String
  pushoverApiKey_not_ends_with: String
  pushoverUserKey: String
  pushoverUserKey_not: String
  pushoverUserKey_in: [String!]
  pushoverUserKey_not_in: [String!]
  pushoverUserKey_lt: String
  pushoverUserKey_lte: String
  pushoverUserKey_gt: String
  pushoverUserKey_gte: String
  pushoverUserKey_contains: String
  pushoverUserKey_not_contains: String
  pushoverUserKey_starts_with: String
  pushoverUserKey_not_starts_with: String
  pushoverUserKey_ends_with: String
  pushoverUserKey_not_ends_with: String
  AND: [ConfigurationWhereInput!]
  OR: [ConfigurationWhereInput!]
  NOT: [ConfigurationWhereInput!]
}

input ConfigurationWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Movie {
  id: ID!
  createdAt: DateTime
  title: String!
  requestedBy: User
  img: String
  tmdbId: Int!
  genres: [String!]!
  year: Int
  overview: String
  downloaded: Boolean
  hasFile: Boolean
  voteAverage: Float
  voteCount: Int
}

type MovieConnection {
  pageInfo: PageInfo!
  edges: [MovieEdge]!
  aggregate: AggregateMovie!
}

input MovieCreategenresInput {
  set: [String!]
}

input MovieCreateInput {
  id: ID
  title: String!
  requestedBy: UserCreateOneWithoutMoviesInput
  img: String
  tmdbId: Int!
  genres: MovieCreategenresInput
  year: Int
  overview: String
  downloaded: Boolean
  hasFile: Boolean
  voteAverage: Float
  voteCount: Int
}

input MovieCreateManyWithoutRequestedByInput {
  create: [MovieCreateWithoutRequestedByInput!]
  connect: [MovieWhereUniqueInput!]
}

input MovieCreateWithoutRequestedByInput {
  id: ID
  title: String!
  img: String
  tmdbId: Int!
  genres: MovieCreategenresInput
  year: Int
  overview: String
  downloaded: Boolean
  hasFile: Boolean
  voteAverage: Float
  voteCount: Int
}

type MovieEdge {
  node: Movie!
  cursor: String!
}

enum MovieOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  title_ASC
  title_DESC
  img_ASC
  img_DESC
  tmdbId_ASC
  tmdbId_DESC
  year_ASC
  year_DESC
  overview_ASC
  overview_DESC
  downloaded_ASC
  downloaded_DESC
  hasFile_ASC
  hasFile_DESC
  voteAverage_ASC
  voteAverage_DESC
  voteCount_ASC
  voteCount_DESC
}

type MoviePreviousValues {
  id: ID!
  createdAt: DateTime
  title: String!
  img: String
  tmdbId: Int!
  genres: [String!]!
  year: Int
  overview: String
  downloaded: Boolean
  hasFile: Boolean
  voteAverage: Float
  voteCount: Int
}

input MovieScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  img: String
  img_not: String
  img_in: [String!]
  img_not_in: [String!]
  img_lt: String
  img_lte: String
  img_gt: String
  img_gte: String
  img_contains: String
  img_not_contains: String
  img_starts_with: String
  img_not_starts_with: String
  img_ends_with: String
  img_not_ends_with: String
  tmdbId: Int
  tmdbId_not: Int
  tmdbId_in: [Int!]
  tmdbId_not_in: [Int!]
  tmdbId_lt: Int
  tmdbId_lte: Int
  tmdbId_gt: Int
  tmdbId_gte: Int
  year: Int
  year_not: Int
  year_in: [Int!]
  year_not_in: [Int!]
  year_lt: Int
  year_lte: Int
  year_gt: Int
  year_gte: Int
  overview: String
  overview_not: String
  overview_in: [String!]
  overview_not_in: [String!]
  overview_lt: String
  overview_lte: String
  overview_gt: String
  overview_gte: String
  overview_contains: String
  overview_not_contains: String
  overview_starts_with: String
  overview_not_starts_with: String
  overview_ends_with: String
  overview_not_ends_with: String
  downloaded: Boolean
  downloaded_not: Boolean
  hasFile: Boolean
  hasFile_not: Boolean
  voteAverage: Float
  voteAverage_not: Float
  voteAverage_in: [Float!]
  voteAverage_not_in: [Float!]
  voteAverage_lt: Float
  voteAverage_lte: Float
  voteAverage_gt: Float
  voteAverage_gte: Float
  voteCount: Int
  voteCount_not: Int
  voteCount_in: [Int!]
  voteCount_not_in: [Int!]
  voteCount_lt: Int
  voteCount_lte: Int
  voteCount_gt: Int
  voteCount_gte: Int
  AND: [MovieScalarWhereInput!]
  OR: [MovieScalarWhereInput!]
  NOT: [MovieScalarWhereInput!]
}

type MovieSubscriptionPayload {
  mutation: MutationType!
  node: Movie
  updatedFields: [String!]
  previousValues: MoviePreviousValues
}

input MovieSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MovieWhereInput
  AND: [MovieSubscriptionWhereInput!]
  OR: [MovieSubscriptionWhereInput!]
  NOT: [MovieSubscriptionWhereInput!]
}

input MovieUpdategenresInput {
  set: [String!]
}

input MovieUpdateInput {
  title: String
  requestedBy: UserUpdateOneWithoutMoviesInput
  img: String
  tmdbId: Int
  genres: MovieUpdategenresInput
  year: Int
  overview: String
  downloaded: Boolean
  hasFile: Boolean
  voteAverage: Float
  voteCount: Int
}

input MovieUpdateManyDataInput {
  title: String
  img: String
  tmdbId: Int
  genres: MovieUpdategenresInput
  year: Int
  overview: String
  downloaded: Boolean
  hasFile: Boolean
  voteAverage: Float
  voteCount: Int
}

input MovieUpdateManyMutationInput {
  title: String
  img: String
  tmdbId: Int
  genres: MovieUpdategenresInput
  year: Int
  overview: String
  downloaded: Boolean
  hasFile: Boolean
  voteAverage: Float
  voteCount: Int
}

input MovieUpdateManyWithoutRequestedByInput {
  create: [MovieCreateWithoutRequestedByInput!]
  delete: [MovieWhereUniqueInput!]
  connect: [MovieWhereUniqueInput!]
  set: [MovieWhereUniqueInput!]
  disconnect: [MovieWhereUniqueInput!]
  update: [MovieUpdateWithWhereUniqueWithoutRequestedByInput!]
  upsert: [MovieUpsertWithWhereUniqueWithoutRequestedByInput!]
  deleteMany: [MovieScalarWhereInput!]
  updateMany: [MovieUpdateManyWithWhereNestedInput!]
}

input MovieUpdateManyWithWhereNestedInput {
  where: MovieScalarWhereInput!
  data: MovieUpdateManyDataInput!
}

input MovieUpdateWithoutRequestedByDataInput {
  title: String
  img: String
  tmdbId: Int
  genres: MovieUpdategenresInput
  year: Int
  overview: String
  downloaded: Boolean
  hasFile: Boolean
  voteAverage: Float
  voteCount: Int
}

input MovieUpdateWithWhereUniqueWithoutRequestedByInput {
  where: MovieWhereUniqueInput!
  data: MovieUpdateWithoutRequestedByDataInput!
}

input MovieUpsertWithWhereUniqueWithoutRequestedByInput {
  where: MovieWhereUniqueInput!
  update: MovieUpdateWithoutRequestedByDataInput!
  create: MovieCreateWithoutRequestedByInput!
}

input MovieWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  requestedBy: UserWhereInput
  img: String
  img_not: String
  img_in: [String!]
  img_not_in: [String!]
  img_lt: String
  img_lte: String
  img_gt: String
  img_gte: String
  img_contains: String
  img_not_contains: String
  img_starts_with: String
  img_not_starts_with: String
  img_ends_with: String
  img_not_ends_with: String
  tmdbId: Int
  tmdbId_not: Int
  tmdbId_in: [Int!]
  tmdbId_not_in: [Int!]
  tmdbId_lt: Int
  tmdbId_lte: Int
  tmdbId_gt: Int
  tmdbId_gte: Int
  year: Int
  year_not: Int
  year_in: [Int!]
  year_not_in: [Int!]
  year_lt: Int
  year_lte: Int
  year_gt: Int
  year_gte: Int
  overview: String
  overview_not: String
  overview_in: [String!]
  overview_not_in: [String!]
  overview_lt: String
  overview_lte: String
  overview_gt: String
  overview_gte: String
  overview_contains: String
  overview_not_contains: String
  overview_starts_with: String
  overview_not_starts_with: String
  overview_ends_with: String
  overview_not_ends_with: String
  downloaded: Boolean
  downloaded_not: Boolean
  hasFile: Boolean
  hasFile_not: Boolean
  voteAverage: Float
  voteAverage_not: Float
  voteAverage_in: [Float!]
  voteAverage_not_in: [Float!]
  voteAverage_lt: Float
  voteAverage_lte: Float
  voteAverage_gt: Float
  voteAverage_gte: Float
  voteCount: Int
  voteCount_not: Int
  voteCount_in: [Int!]
  voteCount_not_in: [Int!]
  voteCount_lt: Int
  voteCount_lte: Int
  voteCount_gt: Int
  voteCount_gte: Int
  AND: [MovieWhereInput!]
  OR: [MovieWhereInput!]
  NOT: [MovieWhereInput!]
}

input MovieWhereUniqueInput {
  id: ID
  tmdbId: Int
}

type Mutation {
  createConfiguration(data: ConfigurationCreateInput!): Configuration!
  updateConfiguration(data: ConfigurationUpdateInput!, where: ConfigurationWhereUniqueInput!): Configuration
  updateManyConfigurations(data: ConfigurationUpdateManyMutationInput!, where: ConfigurationWhereInput): BatchPayload!
  upsertConfiguration(where: ConfigurationWhereUniqueInput!, create: ConfigurationCreateInput!, update: ConfigurationUpdateInput!): Configuration!
  deleteConfiguration(where: ConfigurationWhereUniqueInput!): Configuration
  deleteManyConfigurations(where: ConfigurationWhereInput): BatchPayload!
  createMovie(data: MovieCreateInput!): Movie!
  updateMovie(data: MovieUpdateInput!, where: MovieWhereUniqueInput!): Movie
  updateManyMovies(data: MovieUpdateManyMutationInput!, where: MovieWhereInput): BatchPayload!
  upsertMovie(where: MovieWhereUniqueInput!, create: MovieCreateInput!, update: MovieUpdateInput!): Movie!
  deleteMovie(where: MovieWhereUniqueInput!): Movie
  deleteManyMovies(where: MovieWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  configuration(where: ConfigurationWhereUniqueInput!): Configuration
  configurations(where: ConfigurationWhereInput, orderBy: ConfigurationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Configuration]!
  configurationsConnection(where: ConfigurationWhereInput, orderBy: ConfigurationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ConfigurationConnection!
  movie(where: MovieWhereUniqueInput!): Movie
  movies(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Movie]!
  moviesConnection(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MovieConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum Role {
  ADMIN
  CUSTOMER
}

type Subscription {
  configuration(where: ConfigurationSubscriptionWhereInput): ConfigurationSubscriptionPayload
  movie(where: MovieSubscriptionWhereInput): MovieSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String
  email: String!
  movies(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Movie!]
  notification: Boolean
  subscription: String
  role: Role
  configuration: Configuration
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  name: String
  email: String!
  movies: MovieCreateManyWithoutRequestedByInput
  notification: Boolean
  subscription: String
  role: Role
  configuration: ConfigurationCreateOneInput
}

input UserCreateOneWithoutMoviesInput {
  create: UserCreateWithoutMoviesInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutMoviesInput {
  id: ID
  name: String
  email: String!
  notification: Boolean
  subscription: String
  role: Role
  configuration: ConfigurationCreateOneInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  notification_ASC
  notification_DESC
  subscription_ASC
  subscription_DESC
  role_ASC
  role_DESC
}

type UserPreviousValues {
  id: ID!
  name: String
  email: String!
  notification: Boolean
  subscription: String
  role: Role
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  movies: MovieUpdateManyWithoutRequestedByInput
  notification: Boolean
  subscription: String
  role: Role
  configuration: ConfigurationUpdateOneInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  notification: Boolean
  subscription: String
  role: Role
}

input UserUpdateOneWithoutMoviesInput {
  create: UserCreateWithoutMoviesInput
  update: UserUpdateWithoutMoviesDataInput
  upsert: UserUpsertWithoutMoviesInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutMoviesDataInput {
  name: String
  email: String
  notification: Boolean
  subscription: String
  role: Role
  configuration: ConfigurationUpdateOneInput
}

input UserUpsertWithoutMoviesInput {
  update: UserUpdateWithoutMoviesDataInput!
  create: UserCreateWithoutMoviesInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  movies_every: MovieWhereInput
  movies_some: MovieWhereInput
  movies_none: MovieWhereInput
  notification: Boolean
  notification_not: Boolean
  subscription: String
  subscription_not: String
  subscription_in: [String!]
  subscription_not_in: [String!]
  subscription_lt: String
  subscription_lte: String
  subscription_gt: String
  subscription_gte: String
  subscription_contains: String
  subscription_not_contains: String
  subscription_starts_with: String
  subscription_not_starts_with: String
  subscription_ends_with: String
  subscription_not_ends_with: String
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  configuration: ConfigurationWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
  subscription: String
}
`