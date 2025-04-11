import { prisma } from "@/db/client";
import { builder } from "./builder";
import { Fren } from "./fren.types";


export const FrenPost = builder.prismaNode("Post", {
  variant: "FrenPost",
  id: { field: "id" },
  fields: (t) => ({
    postId: t.exposeString("id", { nullable: false }),
    content: t.exposeString("content"),
    imageUrl: t.exposeString("imageUrl", { nullable: true }),
    createdAt: t.field({
      type: "String",
      resolve: (post) => {
        return post.createdAt.toISOString();
      },
    }),
    updatedAt: t.field({
      type: "String",
      resolve: (post) => {
        return post.updatedAt.toISOString();
      },
    }),
    likeCount: t.field({
      type: "Int",
      resolve: async (parent) => {
        return prisma.like.count({
          where: {
            postId: parent.id,
          },
        });
      },
    }),
    likedByMe: t.field({
      type: "Boolean",
      resolve: async (parent, args, context) => {
        if (!context.currentUser?.id) return false;
        const like = await prisma.like.findFirst({
          where: {
            userId: context.currentUser.id,
            postId: parent.id,
          },
        });
        return !!like;
      }
    }),
  })
})

export const FeedPost = builder.prismaNode("Post", {
  variant: "FeedPost",
  id: { field: "id" },
  fields: (t) => ({
    postId: t.exposeString("id", { nullable: false }),
    content: t.exposeString("content"),
    imageUrl: t.exposeString("imageUrl"),
    createdAt: t.field({
      type: "String",
      resolve: (post) => {
        return post.createdAt.toISOString();
      },
    }),
    updatedAt: t.field({
      type: "String",
      resolve: (post) => {
        return post.createdAt.toISOString();
      },
    }),
    postedBy: t.field({
      type: Fren,
      resolve: async (parent, args, context) => {
        return prisma.user.findUnique({
          where: {
            id: parent.authorId
          },
        });
      }
    }),
    likeCount: t.field({
      type: "Int",
      resolve: async (parent) => {
        return prisma.like.count({
          where: {
            postId: parent.id,
          },
        });
      },
    }),
    likedByMe: t.field({
      type: "Boolean",
      resolve: async (parent, args, context) => {
        if (!context.currentUser?.id) return false;
        const like = await prisma.like.findFirst({
          where: {
            userId: context.currentUser.id,
            postId: parent.id,
          },
        });
        return !!like;
      }
    })
  }),
});
