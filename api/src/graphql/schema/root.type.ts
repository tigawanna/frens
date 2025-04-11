import { prisma } from "@/db/client";
import { builder } from "./builder";
import { FollowInput, SortInput } from "./inputs";
import { Follower, Fren } from "./fren.types";
import { FeedPost } from "./post.type";
import { lexicographicSortSchema, printSchema } from "graphql";
import { console } from "inspector";

// root query type
builder.queryType({
  fields: (t) => ({
    // hooman queries
    me: t.prismaField({
      type: Fren,
      resolve: async (query, root, args, ctx, info) =>
        prisma.user.findUniqueOrThrow({
          // the `query` argument will add in `include`s or `select`s to
          // resolve as much of the request in a single query as possible
          ...query,
          where: { id: ctx.currentUser?.id },
        }),
    }),
    fren: t.prismaField({
      type: Fren,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) =>
        prisma.user.findUniqueOrThrow({
          ...query,
          where: { id: args.id },
        }),
    }),
    frens: t.prismaConnection(
      {
        type: Fren,
        cursor: "id",
        args: {
          sort: t.arg({ type: SortInput, required: false }),
          search: t.arg.string({ required: false,defaultValue:"" }),
        },
        resolve: (query, parent, args, context, info) => {
          return prisma.user.findMany({
            ...query,
            where: {
            OR: [
              { name: { contains: args.search??"" } },
              { email: { contains: args.search??"" } },
            ],
            },
            orderBy: {
              [args.sort?.field as string]: args.sort?.order,
            },
          });
        },
      },
      {}, // optional options for the Connection type
      {}, // optional options for the Edge type),
    ),
    //  aura marm queries
    feedPosts: t.prismaConnection({
      type: FeedPost,
      cursor: "id",
      resolve: (query, parent, args, context, info) => {
        return prisma.post.findMany({
          ...query,
          orderBy: {
            createdAt: "desc",
          },
        });
      },
    }),
    oneFeedpopst: t.prismaField({
      type: FeedPost,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) =>
        prisma.post.findUniqueOrThrow({
          ...query,
          where: { id: args.id },
        }),
    }),
  }),
});

// root mutation type
builder.mutationType({
  name: "Mutation",
  fields: (t) => ({
    // follow fren resolver
    follow: t.prismaField({
      type: Follower,
      args: {
        input: t.arg({ type: FollowInput, required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        await prisma.follow.create({
          data: {
            follower: { connect: { id: ctx.currentUser?.id } },
            following: { connect: { id: args.input.userId } },
          },
        });

        return prisma.user.findUniqueOrThrow({
          ...query,
          where: { id: ctx.currentUser?.id },
        });
      },
    }),

    // unfollow  fren resolver
    unfollow: t.prismaField({
      type: Follower,
      args: {
        input: t.arg({ type: FollowInput, required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        // Delete the follow relationship
        await prisma.follow.deleteMany({
          where: {
            followerId: ctx.currentUser?.id,
            followingId: args.input.userId,
          },
        });

        // Return the updated user
        return prisma.user.findUniqueOrThrow({
          ...query,
          where: { id: ctx.currentUser?.id },
        });
      },
    }),

    toggleFollow: t.prismaField({
      type: Fren,
      args: {
        input: t.arg({ type: FollowInput, required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        // Check if the user is authenticated
        if (!ctx.currentUser?.id) {
          throw new Error("User not authenticated");
        }

        // // First check if the target user exists
        // const targetUser = await prisma.user.findUnique({
        //   where: { id: args.input.userId },
        // });

        // if (!targetUser) {
        //   throw new Error(`User with ID ${args.input.userId} not found`);
        // }

        try {
          // Try to create a follow relationship
          await prisma.follow.create({
            data: {
              followerId: ctx.currentUser.id,
              followingId: args.input.userId,
            },
          });
        } catch (err: any) {
          // P2002: Unique constraint violation (follow relationship already exists)
          if (err.code === "P2002") {
            // Delete the existing follow
            await prisma.follow.deleteMany({
              where: {
                followerId: ctx.currentUser.id,
                followingId: args.input.userId,
              },
            });
          } else {
            // Handle any other unexpected errors
            console.error("Error toggling follow:", err);
            throw new Error(
              "An error occurred while toggling the follow relationship",
            );
          }
        }

        // Return the updated user
        return prisma.user.findUniqueOrThrow({
          ...query,
          where: { id: ctx.currentUser.id },
        });
      },
    }),
    // create post resolver
    createPost: t.prismaField({
      type: FeedPost,
      args: {
        content: t.arg.string({ required: true }),
        imageUrl: t.arg.string({ required: false }),
      },
      resolve: async (query, root, args, ctx, info) => {
        // Check if the user is authenticated
        if (!ctx.currentUser?.id) {
          throw new Error("User not authenticated");
        }
        return prisma.post.create({
          data: {
            content: args.content,
            imageUrl: args.imageUrl,
            authorId: ctx.currentUser?.id,
          },
        });
      },
    }),

    // Update post mutation
    updatePost: t.prismaField({
      type: FeedPost,
      args: {
        id: t.arg.string({ required: true }),
        content: t.arg.string({ required: false }),
        imageUrl: t.arg.string({ required: false }),
      },
      resolve: async (query, root, args, ctx, info) => {
        // Check if the user is authenticated
        if (!ctx.currentUser?.id) {
          throw new Error("User not authenticated");
        }

        // Find the post to verify ownership
        const post = await prisma.post.findUniqueOrThrow({
          where: { id: args.id },
          select: { authorId: true },
        });

        // Verify the user owns the post
        if (post.authorId !== ctx.currentUser.id) {
          throw new Error("You can only update your own posts");
        }

        // Update the post
        return prisma.post.update({
          ...query,
          where: { id: args.id },
          data: {
            ...(args.content !== undefined && {
              content: args.content as string | undefined,
            }),
            ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
          },
        });
      },
    }),

    // Delete post mutation
    deletePost: t.field({
      type: "Boolean",
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        // Check if the user is authenticated
        if (!ctx.currentUser?.id) {
          throw new Error("User not authenticated");
        }

        // Find the post to verify ownership
        const post = await prisma.post.findUniqueOrThrow({
          where: { id: args.id },
          select: { authorId: true },
        });

        // Verify the user owns the post
        if (post.authorId !== ctx.currentUser.id) {
          throw new Error("You can only delete your own posts");
        }

        // Delete the post
        await prisma.post.delete({
          where: { id: args.id },
        });

        return true;
      },
    }),

    toggleLiked: t.prismaField({
      type: FeedPost,
      args: {
        postId: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        // Check if the user is authenticated
        if (!ctx.currentUser?.id) {
          throw new Error("User not authenticated");
        }

        // Try to create a like
        try {
          await prisma.like.create({
            data: {
              postId: args.postId,
              userId: ctx.currentUser.id,
            },
          });
        } catch (err: any) {
          // P2002: Unique constraint violation (like already exists)
          if (err.code === "P2002") {
            await prisma.like.deleteMany({
              where: {
                postId: args.postId,
                userId: ctx.currentUser.id,
              },
            });
          }
          // P2003: Foreign key constraint failed (post doesn't exist)
          else if (err.code === "P2003") {
            throw new Error(`Post with ID ${args.postId} not found`);
          }
          // P2025: Record not found (trying to like a non-existent post)
          else if (err.code === "P2025") {
            throw new Error(`Post with ID ${args.postId} not found`);
          }
          // Handle any other unexpected errors
          else {
            console.error("Error toggling like:", err);
            throw new Error("An error occurred while toggling the like");
          }
        }

        // Return the updated post
        return prisma.post.findUniqueOrThrow({
          ...query,
          where: { id: args.postId },
        });
      },
    }),
  }),
});

export const pothosSchema = builder.toSchema();

// export const schemaAsString = printType(lexicographicSortSchema(pothosSchema))
export const pothosSchemaString = printSchema(
  lexicographicSortSchema(pothosSchema),
);
