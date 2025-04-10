import { prisma } from "@/db/client";
import { builder } from "./schema/builder";

export const FeedPost = builder.prismaNode("Post", {
  variant: "FeedPost",
  id: { field: "id" },
  fields: (t) => ({
    constent: t.exposeString("content"),
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
    likeCoount: t.field({
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
