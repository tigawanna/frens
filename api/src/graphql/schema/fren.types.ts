import { prisma } from "@/db/client";
import { builder } from "./builder";
import { SortInput } from "./inputs";
import { FrenPost } from "./post.type";

export const Follower = builder.prismaNode("User", {
  variant: "Follower",
  id: { field: "id" },
  interfaces: [],
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
    isMe: t.field({
      type: "Boolean",
      resolve: (parent, args, context) => {
        if (!context.currentUser?.id) return false;
        return parent.id === context.currentUser.id;
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
    isMe: t.field({
      type: "Boolean",
      resolve: (parent, args, context) => {
        if (!context.currentUser?.id) return false;
        return parent.id === context.currentUser.id;
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
      resolve: (query, parent, args, context, info) => {
        // console.log("=== parent==== ",parent.id)
        return prisma.user.findMany({
          ...query,
          orderBy: {
            [args.sort?.field as string]: args.sort?.order,
          },
          where: {
            followers: { some: { followerId: parent.id } },
          },
        });
      },
    }),
    posts: t.prismaConnection({
      type: FrenPost,
      cursor: "id",
      args: {
        sort: t.arg({ type: SortInput, required: false }),
      },
      resolve: (query, parent, args, context, info) =>
        prisma.post.findMany({
          ...query,
          where: { authorId: parent.id },
          orderBy: {},
        }),
    }),
    postsCount: t.field({
      type: "Int",
      resolve: async (parent) => {
        return prisma.post.count({
          where: {
            authorId: parent.id,
          },
        });
      },
    }),
  }),
});
