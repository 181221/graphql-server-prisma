// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  movie: (where?: MovieWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  movie: (where: MovieWhereUniqueInput) => MovieNullablePromise;
  movies: (args?: {
    where?: MovieWhereInput;
    orderBy?: MovieOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Movie>;
  moviesConnection: (args?: {
    where?: MovieWhereInput;
    orderBy?: MovieOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => MovieConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserNullablePromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createMovie: (data: MovieCreateInput) => MoviePromise;
  updateMovie: (args: {
    data: MovieUpdateInput;
    where: MovieWhereUniqueInput;
  }) => MoviePromise;
  updateManyMovies: (args: {
    data: MovieUpdateManyMutationInput;
    where?: MovieWhereInput;
  }) => BatchPayloadPromise;
  upsertMovie: (args: {
    where: MovieWhereUniqueInput;
    create: MovieCreateInput;
    update: MovieUpdateInput;
  }) => MoviePromise;
  deleteMovie: (where: MovieWhereUniqueInput) => MoviePromise;
  deleteManyMovies: (where?: MovieWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  movie: (
    where?: MovieSubscriptionWhereInput
  ) => MovieSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type MovieOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "title_ASC"
  | "title_DESC"
  | "img_ASC"
  | "img_DESC"
  | "tmdb_id_ASC"
  | "tmdb_id_DESC"
  | "vote_average_ASC"
  | "vote_average_DESC"
  | "overview_ASC"
  | "overview_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "email_ASC"
  | "email_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export type MovieWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface MovieWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  title?: Maybe<String>;
  title_not?: Maybe<String>;
  title_in?: Maybe<String[] | String>;
  title_not_in?: Maybe<String[] | String>;
  title_lt?: Maybe<String>;
  title_lte?: Maybe<String>;
  title_gt?: Maybe<String>;
  title_gte?: Maybe<String>;
  title_contains?: Maybe<String>;
  title_not_contains?: Maybe<String>;
  title_starts_with?: Maybe<String>;
  title_not_starts_with?: Maybe<String>;
  title_ends_with?: Maybe<String>;
  title_not_ends_with?: Maybe<String>;
  requestedBy?: Maybe<UserWhereInput>;
  img?: Maybe<String>;
  img_not?: Maybe<String>;
  img_in?: Maybe<String[] | String>;
  img_not_in?: Maybe<String[] | String>;
  img_lt?: Maybe<String>;
  img_lte?: Maybe<String>;
  img_gt?: Maybe<String>;
  img_gte?: Maybe<String>;
  img_contains?: Maybe<String>;
  img_not_contains?: Maybe<String>;
  img_starts_with?: Maybe<String>;
  img_not_starts_with?: Maybe<String>;
  img_ends_with?: Maybe<String>;
  img_not_ends_with?: Maybe<String>;
  tmdb_id?: Maybe<String>;
  tmdb_id_not?: Maybe<String>;
  tmdb_id_in?: Maybe<String[] | String>;
  tmdb_id_not_in?: Maybe<String[] | String>;
  tmdb_id_lt?: Maybe<String>;
  tmdb_id_lte?: Maybe<String>;
  tmdb_id_gt?: Maybe<String>;
  tmdb_id_gte?: Maybe<String>;
  tmdb_id_contains?: Maybe<String>;
  tmdb_id_not_contains?: Maybe<String>;
  tmdb_id_starts_with?: Maybe<String>;
  tmdb_id_not_starts_with?: Maybe<String>;
  tmdb_id_ends_with?: Maybe<String>;
  tmdb_id_not_ends_with?: Maybe<String>;
  vote_average?: Maybe<String>;
  vote_average_not?: Maybe<String>;
  vote_average_in?: Maybe<String[] | String>;
  vote_average_not_in?: Maybe<String[] | String>;
  vote_average_lt?: Maybe<String>;
  vote_average_lte?: Maybe<String>;
  vote_average_gt?: Maybe<String>;
  vote_average_gte?: Maybe<String>;
  vote_average_contains?: Maybe<String>;
  vote_average_not_contains?: Maybe<String>;
  vote_average_starts_with?: Maybe<String>;
  vote_average_not_starts_with?: Maybe<String>;
  vote_average_ends_with?: Maybe<String>;
  vote_average_not_ends_with?: Maybe<String>;
  overview?: Maybe<String>;
  overview_not?: Maybe<String>;
  overview_in?: Maybe<String[] | String>;
  overview_not_in?: Maybe<String[] | String>;
  overview_lt?: Maybe<String>;
  overview_lte?: Maybe<String>;
  overview_gt?: Maybe<String>;
  overview_gte?: Maybe<String>;
  overview_contains?: Maybe<String>;
  overview_not_contains?: Maybe<String>;
  overview_starts_with?: Maybe<String>;
  overview_not_starts_with?: Maybe<String>;
  overview_ends_with?: Maybe<String>;
  overview_not_ends_with?: Maybe<String>;
  AND?: Maybe<MovieWhereInput[] | MovieWhereInput>;
  OR?: Maybe<MovieWhereInput[] | MovieWhereInput>;
  NOT?: Maybe<MovieWhereInput[] | MovieWhereInput>;
}

export interface UserWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  email?: Maybe<String>;
  email_not?: Maybe<String>;
  email_in?: Maybe<String[] | String>;
  email_not_in?: Maybe<String[] | String>;
  email_lt?: Maybe<String>;
  email_lte?: Maybe<String>;
  email_gt?: Maybe<String>;
  email_gte?: Maybe<String>;
  email_contains?: Maybe<String>;
  email_not_contains?: Maybe<String>;
  email_starts_with?: Maybe<String>;
  email_not_starts_with?: Maybe<String>;
  email_ends_with?: Maybe<String>;
  email_not_ends_with?: Maybe<String>;
  movies_every?: Maybe<MovieWhereInput>;
  movies_some?: Maybe<MovieWhereInput>;
  movies_none?: Maybe<MovieWhereInput>;
  AND?: Maybe<UserWhereInput[] | UserWhereInput>;
  OR?: Maybe<UserWhereInput[] | UserWhereInput>;
  NOT?: Maybe<UserWhereInput[] | UserWhereInput>;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  email?: Maybe<String>;
}>;

export interface MovieCreateInput {
  id?: Maybe<ID_Input>;
  title: String;
  requestedBy?: Maybe<UserCreateOneWithoutMoviesInput>;
  img?: Maybe<String>;
  tmdb_id?: Maybe<String>;
  genres?: Maybe<MovieCreategenresInput>;
  vote_average?: Maybe<String>;
  overview?: Maybe<String>;
}

export interface UserCreateOneWithoutMoviesInput {
  create?: Maybe<UserCreateWithoutMoviesInput>;
  connect?: Maybe<UserWhereUniqueInput>;
}

export interface UserCreateWithoutMoviesInput {
  id?: Maybe<ID_Input>;
  name?: Maybe<String>;
  email: String;
}

export interface MovieCreategenresInput {
  set?: Maybe<String[] | String>;
}

export interface MovieUpdateInput {
  title?: Maybe<String>;
  requestedBy?: Maybe<UserUpdateOneWithoutMoviesInput>;
  img?: Maybe<String>;
  tmdb_id?: Maybe<String>;
  genres?: Maybe<MovieUpdategenresInput>;
  vote_average?: Maybe<String>;
  overview?: Maybe<String>;
}

export interface UserUpdateOneWithoutMoviesInput {
  create?: Maybe<UserCreateWithoutMoviesInput>;
  update?: Maybe<UserUpdateWithoutMoviesDataInput>;
  upsert?: Maybe<UserUpsertWithoutMoviesInput>;
  delete?: Maybe<Boolean>;
  disconnect?: Maybe<Boolean>;
  connect?: Maybe<UserWhereUniqueInput>;
}

export interface UserUpdateWithoutMoviesDataInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
}

export interface UserUpsertWithoutMoviesInput {
  update: UserUpdateWithoutMoviesDataInput;
  create: UserCreateWithoutMoviesInput;
}

export interface MovieUpdategenresInput {
  set?: Maybe<String[] | String>;
}

export interface MovieUpdateManyMutationInput {
  title?: Maybe<String>;
  img?: Maybe<String>;
  tmdb_id?: Maybe<String>;
  genres?: Maybe<MovieUpdategenresInput>;
  vote_average?: Maybe<String>;
  overview?: Maybe<String>;
}

export interface UserCreateInput {
  id?: Maybe<ID_Input>;
  name?: Maybe<String>;
  email: String;
  movies?: Maybe<MovieCreateManyWithoutRequestedByInput>;
}

export interface MovieCreateManyWithoutRequestedByInput {
  create?: Maybe<
    MovieCreateWithoutRequestedByInput[] | MovieCreateWithoutRequestedByInput
  >;
  connect?: Maybe<MovieWhereUniqueInput[] | MovieWhereUniqueInput>;
}

export interface MovieCreateWithoutRequestedByInput {
  id?: Maybe<ID_Input>;
  title: String;
  img?: Maybe<String>;
  tmdb_id?: Maybe<String>;
  genres?: Maybe<MovieCreategenresInput>;
  vote_average?: Maybe<String>;
  overview?: Maybe<String>;
}

export interface UserUpdateInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  movies?: Maybe<MovieUpdateManyWithoutRequestedByInput>;
}

export interface MovieUpdateManyWithoutRequestedByInput {
  create?: Maybe<
    MovieCreateWithoutRequestedByInput[] | MovieCreateWithoutRequestedByInput
  >;
  delete?: Maybe<MovieWhereUniqueInput[] | MovieWhereUniqueInput>;
  connect?: Maybe<MovieWhereUniqueInput[] | MovieWhereUniqueInput>;
  set?: Maybe<MovieWhereUniqueInput[] | MovieWhereUniqueInput>;
  disconnect?: Maybe<MovieWhereUniqueInput[] | MovieWhereUniqueInput>;
  update?: Maybe<
    | MovieUpdateWithWhereUniqueWithoutRequestedByInput[]
    | MovieUpdateWithWhereUniqueWithoutRequestedByInput
  >;
  upsert?: Maybe<
    | MovieUpsertWithWhereUniqueWithoutRequestedByInput[]
    | MovieUpsertWithWhereUniqueWithoutRequestedByInput
  >;
  deleteMany?: Maybe<MovieScalarWhereInput[] | MovieScalarWhereInput>;
  updateMany?: Maybe<
    MovieUpdateManyWithWhereNestedInput[] | MovieUpdateManyWithWhereNestedInput
  >;
}

export interface MovieUpdateWithWhereUniqueWithoutRequestedByInput {
  where: MovieWhereUniqueInput;
  data: MovieUpdateWithoutRequestedByDataInput;
}

export interface MovieUpdateWithoutRequestedByDataInput {
  title?: Maybe<String>;
  img?: Maybe<String>;
  tmdb_id?: Maybe<String>;
  genres?: Maybe<MovieUpdategenresInput>;
  vote_average?: Maybe<String>;
  overview?: Maybe<String>;
}

export interface MovieUpsertWithWhereUniqueWithoutRequestedByInput {
  where: MovieWhereUniqueInput;
  update: MovieUpdateWithoutRequestedByDataInput;
  create: MovieCreateWithoutRequestedByInput;
}

export interface MovieScalarWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  title?: Maybe<String>;
  title_not?: Maybe<String>;
  title_in?: Maybe<String[] | String>;
  title_not_in?: Maybe<String[] | String>;
  title_lt?: Maybe<String>;
  title_lte?: Maybe<String>;
  title_gt?: Maybe<String>;
  title_gte?: Maybe<String>;
  title_contains?: Maybe<String>;
  title_not_contains?: Maybe<String>;
  title_starts_with?: Maybe<String>;
  title_not_starts_with?: Maybe<String>;
  title_ends_with?: Maybe<String>;
  title_not_ends_with?: Maybe<String>;
  img?: Maybe<String>;
  img_not?: Maybe<String>;
  img_in?: Maybe<String[] | String>;
  img_not_in?: Maybe<String[] | String>;
  img_lt?: Maybe<String>;
  img_lte?: Maybe<String>;
  img_gt?: Maybe<String>;
  img_gte?: Maybe<String>;
  img_contains?: Maybe<String>;
  img_not_contains?: Maybe<String>;
  img_starts_with?: Maybe<String>;
  img_not_starts_with?: Maybe<String>;
  img_ends_with?: Maybe<String>;
  img_not_ends_with?: Maybe<String>;
  tmdb_id?: Maybe<String>;
  tmdb_id_not?: Maybe<String>;
  tmdb_id_in?: Maybe<String[] | String>;
  tmdb_id_not_in?: Maybe<String[] | String>;
  tmdb_id_lt?: Maybe<String>;
  tmdb_id_lte?: Maybe<String>;
  tmdb_id_gt?: Maybe<String>;
  tmdb_id_gte?: Maybe<String>;
  tmdb_id_contains?: Maybe<String>;
  tmdb_id_not_contains?: Maybe<String>;
  tmdb_id_starts_with?: Maybe<String>;
  tmdb_id_not_starts_with?: Maybe<String>;
  tmdb_id_ends_with?: Maybe<String>;
  tmdb_id_not_ends_with?: Maybe<String>;
  vote_average?: Maybe<String>;
  vote_average_not?: Maybe<String>;
  vote_average_in?: Maybe<String[] | String>;
  vote_average_not_in?: Maybe<String[] | String>;
  vote_average_lt?: Maybe<String>;
  vote_average_lte?: Maybe<String>;
  vote_average_gt?: Maybe<String>;
  vote_average_gte?: Maybe<String>;
  vote_average_contains?: Maybe<String>;
  vote_average_not_contains?: Maybe<String>;
  vote_average_starts_with?: Maybe<String>;
  vote_average_not_starts_with?: Maybe<String>;
  vote_average_ends_with?: Maybe<String>;
  vote_average_not_ends_with?: Maybe<String>;
  overview?: Maybe<String>;
  overview_not?: Maybe<String>;
  overview_in?: Maybe<String[] | String>;
  overview_not_in?: Maybe<String[] | String>;
  overview_lt?: Maybe<String>;
  overview_lte?: Maybe<String>;
  overview_gt?: Maybe<String>;
  overview_gte?: Maybe<String>;
  overview_contains?: Maybe<String>;
  overview_not_contains?: Maybe<String>;
  overview_starts_with?: Maybe<String>;
  overview_not_starts_with?: Maybe<String>;
  overview_ends_with?: Maybe<String>;
  overview_not_ends_with?: Maybe<String>;
  AND?: Maybe<MovieScalarWhereInput[] | MovieScalarWhereInput>;
  OR?: Maybe<MovieScalarWhereInput[] | MovieScalarWhereInput>;
  NOT?: Maybe<MovieScalarWhereInput[] | MovieScalarWhereInput>;
}

export interface MovieUpdateManyWithWhereNestedInput {
  where: MovieScalarWhereInput;
  data: MovieUpdateManyDataInput;
}

export interface MovieUpdateManyDataInput {
  title?: Maybe<String>;
  img?: Maybe<String>;
  tmdb_id?: Maybe<String>;
  genres?: Maybe<MovieUpdategenresInput>;
  vote_average?: Maybe<String>;
  overview?: Maybe<String>;
}

export interface UserUpdateManyMutationInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
}

export interface MovieSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<MovieWhereInput>;
  AND?: Maybe<MovieSubscriptionWhereInput[] | MovieSubscriptionWhereInput>;
  OR?: Maybe<MovieSubscriptionWhereInput[] | MovieSubscriptionWhereInput>;
  NOT?: Maybe<MovieSubscriptionWhereInput[] | MovieSubscriptionWhereInput>;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<UserWhereInput>;
  AND?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
  OR?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
  NOT?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface Movie {
  id: ID_Output;
  createdAt: DateTimeOutput;
  title: String;
  img?: String;
  tmdb_id?: String;
  genres: String[];
  vote_average?: String;
  overview?: String;
}

export interface MoviePromise extends Promise<Movie>, Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  title: () => Promise<String>;
  requestedBy: <T = UserPromise>() => T;
  img: () => Promise<String>;
  tmdb_id: () => Promise<String>;
  genres: () => Promise<String[]>;
  vote_average: () => Promise<String>;
  overview: () => Promise<String>;
}

export interface MovieSubscription
  extends Promise<AsyncIterator<Movie>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  title: () => Promise<AsyncIterator<String>>;
  requestedBy: <T = UserSubscription>() => T;
  img: () => Promise<AsyncIterator<String>>;
  tmdb_id: () => Promise<AsyncIterator<String>>;
  genres: () => Promise<AsyncIterator<String[]>>;
  vote_average: () => Promise<AsyncIterator<String>>;
  overview: () => Promise<AsyncIterator<String>>;
}

export interface MovieNullablePromise
  extends Promise<Movie | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  title: () => Promise<String>;
  requestedBy: <T = UserPromise>() => T;
  img: () => Promise<String>;
  tmdb_id: () => Promise<String>;
  genres: () => Promise<String[]>;
  vote_average: () => Promise<String>;
  overview: () => Promise<String>;
}

export interface User {
  id: ID_Output;
  name?: String;
  email: String;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  movies: <T = FragmentableArray<Movie>>(args?: {
    where?: MovieWhereInput;
    orderBy?: MovieOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  movies: <T = Promise<AsyncIterator<MovieSubscription>>>(args?: {
    where?: MovieWhereInput;
    orderBy?: MovieOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface UserNullablePromise
  extends Promise<User | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  movies: <T = FragmentableArray<Movie>>(args?: {
    where?: MovieWhereInput;
    orderBy?: MovieOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface MovieConnection {
  pageInfo: PageInfo;
  edges: MovieEdge[];
}

export interface MovieConnectionPromise
  extends Promise<MovieConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<MovieEdge>>() => T;
  aggregate: <T = AggregateMoviePromise>() => T;
}

export interface MovieConnectionSubscription
  extends Promise<AsyncIterator<MovieConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<MovieEdgeSubscription>>>() => T;
  aggregate: <T = AggregateMovieSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface MovieEdge {
  node: Movie;
  cursor: String;
}

export interface MovieEdgePromise extends Promise<MovieEdge>, Fragmentable {
  node: <T = MoviePromise>() => T;
  cursor: () => Promise<String>;
}

export interface MovieEdgeSubscription
  extends Promise<AsyncIterator<MovieEdge>>,
    Fragmentable {
  node: <T = MovieSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateMovie {
  count: Int;
}

export interface AggregateMoviePromise
  extends Promise<AggregateMovie>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateMovieSubscription
  extends Promise<AsyncIterator<AggregateMovie>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface MovieSubscriptionPayload {
  mutation: MutationType;
  node: Movie;
  updatedFields: String[];
  previousValues: MoviePreviousValues;
}

export interface MovieSubscriptionPayloadPromise
  extends Promise<MovieSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = MoviePromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = MoviePreviousValuesPromise>() => T;
}

export interface MovieSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<MovieSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = MovieSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = MoviePreviousValuesSubscription>() => T;
}

export interface MoviePreviousValues {
  id: ID_Output;
  createdAt: DateTimeOutput;
  title: String;
  img?: String;
  tmdb_id?: String;
  genres: String[];
  vote_average?: String;
  overview?: String;
}

export interface MoviePreviousValuesPromise
  extends Promise<MoviePreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  title: () => Promise<String>;
  img: () => Promise<String>;
  tmdb_id: () => Promise<String>;
  genres: () => Promise<String[]>;
  vote_average: () => Promise<String>;
  overview: () => Promise<String>;
}

export interface MoviePreviousValuesSubscription
  extends Promise<AsyncIterator<MoviePreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  title: () => Promise<AsyncIterator<String>>;
  img: () => Promise<AsyncIterator<String>>;
  tmdb_id: () => Promise<AsyncIterator<String>>;
  genres: () => Promise<AsyncIterator<String[]>>;
  vote_average: () => Promise<AsyncIterator<String>>;
  overview: () => Promise<AsyncIterator<String>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface UserPreviousValues {
  id: ID_Output;
  name?: String;
  email: String;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
}

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "Movie",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;
