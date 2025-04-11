import { prisma } from "@/db/client";
import { builder } from "./builder";
import { SortInput } from "./inputs";

export const Follower = builder.prismaNode("User", {
  variant: "Follower",
  id: { field: "id" },
  interfaces: [],
  fields: (t) => ({
    name: t.exposeString("name"),
    email: t.exposeString("email"),
    image: t.exposeString("image"),
    role: t.exposeString("role"),
    createdAt: t.field({
      type: "String",
      resolve: (user) => {
        return user.createdAt.toISOString();
      },
    }),
  }),
});

export const Fren = builder.prismaNode("User", {
  variant: "Fren",
  id: { field: "id" },
  fields: (t) => ({
    frenId: t.exposeString("id", { nullable: false }),
    name: t.exposeString("name", { nullable: false }),
    email: t.exposeString("email", { nullable: false }),
    image: t.exposeString("image"),
    role: t.exposeString("role"),
    createdAt: t.field({
      type: "String",
      resolve: (user) => {
        return user.createdAt.toISOString();
      },
    }),
    // Am I following this user?
    amFollowing: t.field({
      type: "Boolean",
      resolve: async (parent, args, context) => {
        if (!context.currentUser?.id) return false;
        const follow = await prisma.follow.findFirst({
          where: {
            followerId: context.currentUser.id,
            followingId: parent.id,
          },
        });

        return !!follow;
      },
    }),
    // Is this user following me?
    isFollowingMe: t.field({
      type: "Boolean",
      resolve: async (parent, args, context) => {
        if (!context.currentUser?.id) return false;
        const follow = await prisma.follow.findFirst({
          where: {
            followerId: parent.id,
            followingId: context.currentUser.id,
          },
        });

        return !!follow;
      },
    }),
    // Follower count
    followerCount: t.field({
      type: "Int",
      resolve: async (parent) => {
        return prisma.follow.count({
          where: {
            followingId: parent.id,
          },
        });
      },
    }),
    // Following count
    followingCount: t.field({
      type: "Int",
      resolve: async (parent) => {
        return prisma.follow.count({
          where: {
            followerId: parent.id,
          },
        });
      },
    }),
    followers: t.prismaConnection({
      type: Follower,
      cursor: "id",
      args: {
        // frenId: t.arg.string({ required: true }),
        sort: t.arg({ type: SortInput, required: false }),
      },
      resolve: (query, parent, args, context, info) =>
        prisma.user.findMany({
          ...query,
          orderBy: {
            [args.sort?.field as string]: args.sort?.order,
          },
          where: { following: { some: { followingId: parent.id } } },
        }),
    }),
    following: t.prismaConnection({
      type: Follower,
      cursor: "id",
      args: {
        // frenId: t.arg.string({ required: true }),
        sort: t.arg({ type: SortInput, required: false }),
      },
      resolve: (query, parent, args, context, info) =>
        prisma.user.findMany({
          ...query,
          orderBy: {
            [args.sort?.field as string]: args.sort?.order,
          },
          where: {
            followers: { some: { followerId:  parent.id } },
          },
        }),
    }),
  }),
});

export const ViewerFren = builder.prismaNode("User", {
  variant: "ViewerFren",
  id: { field: "id" },
  fields: (t) => ({
    name: t.exposeString("name"),
    email: t.exposeString("email"),
    image: t.exposeString("image"),
    role: t.exposeString("role"),
    createdAt: t.field({
      type: "String",
      resolve: (user) => {
        return user.createdAt.toISOString();
      },
    }),
    // Follower count
    followerCount: t.field({
      type: "Int",
      resolve: async (parent) => {
        return prisma.follow.count({
          where: {
            followingId: parent.id,
          },
        });
      },
    }),
    // Following count
    followingCount: t.field({
      type: "Int",
      resolve: async (parent) => {
        return prisma.follow.count({
          where: {
            followerId: parent.id,
          },
        });
      },
    }),
    followers: t.prismaConnection({
      type: Follower,
      cursor: "id",
      args: {
        sort: t.arg({ type: SortInput, required: false }),
      },
      resolve: (query, parent, args, context, info) =>
        prisma.user.findMany({
          ...query,
          orderBy: {
            [args.sort?.field as string]: args.sort?.order,
          },
          where: { following: { some: { followingId: context.currentUser?.id } } },
        }),
    }),
    following: t.prismaConnection({
      type: Follower,
      cursor: "id",
      args: {
        sort: t.arg({ type: SortInput, required: false }),
      },
      resolve: (query, parent, args, context, info) =>
        prisma.user.findMany({
          ...query,
          orderBy: {
            [args.sort?.field as string]: args.sort?.order,
          },
          where: {
            followers: { some: { followerId: context.currentUser?.id, } },
          },
        }),
    }),
  }),
});
