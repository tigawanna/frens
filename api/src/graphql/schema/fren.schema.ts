import { prisma } from "@/db/client";
import type { PothosBuilderGenericTYpe } from "./builder";
import type { User } from "@/db/generated/nexus-prisma";

export interface IFren extends User {
  followerCount: number;
  followingCount: number;
  isFollowedByMe: boolean;
  isFollowingMe: boolean;
}

export function FrenSchema(
  builder: PothosSchemaTypes.SchemaBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<PothosBuilderGenericTYpe>
  >,
) {
  
const Fren =  builder.prismaObject('User', {
    variant: 'Fren',
    fields: (t) => ({
      id: t.exposeID("id"),
      email: t.exposeString("email"),
      name: t.exposeString("name"),
      image: t.exposeString("image", { nullable: true }),
      role: t.exposeString("role", { nullable: true }),
      // Count how many users are following this user
      followerCount: t.field({
        type: "Int",
        resolve: (user) => {
          return prisma.follow.count({
            where: {
              followingId: user.id, // User is being followed by others
            },
          });
        }
      }),
      
      // Count how many users this user is following
      followingCount: t.field({
        type: "Int",
        resolve: (user) => {
          return prisma.follow.count({
            where: {
              followerId: user.id, // User is following others
            },
          });
        }
      }),
      
      // Get the list of users who follow this user
      // followers: t.field({
      //   type: [Fren],
      //   resolve: async (user) => {
      //     const follows = await prisma.follow.findMany({
      //       where: {
      //         followingId: user.id, // User is being followed
      //       },
      //       include: {
      //         follower: true, // Include the users who are following
      //       },
      //     });
          
      //     return follows.map(follow => follow.follower);
      //   }
      // }),
      
      // Get the list of users this user follows
      // following: t.field({
      //   type: [Fren],
      //   resolve: async (user) => {
      //     const follows = await prisma.follow.findMany({
      //       where: {
      //         followerId: user.id, // User is following others
      //       },
      //       include: {
      //         following: true, // Include the users being followed
      //       },
      //     });
          
      //     return follows.map(follow => follow.following);
      //   }
      // }),
      
      // Check if the current user is following this user
      isFollowedByMe: t.field({
        type: "Boolean",
        resolve: async (user, _, context) => {
          if (!context.currentUser?.id) return false;
          
          const follow = await prisma.follow.findUnique({
            where: {
              followerId_followingId: {
                followerId: context.currentUser.id,
                followingId: user.id,
              },
            },
          });
          
          return !!follow;
        }
      }),
    }),
  });

  builder.queryType({
    fields: (t) => ({
      // Get the current user
      me: t.field({
        type: Fren,
        resolve: (parent, args, context) => { 
          if (!context.currentUser?.id) return null;
          return prisma.user.findUnique({
            where: {
              id: context.currentUser.id,
            },
          });
        }
      }),  
    }),
  });
//  followers query
  // builder.queryType({
  //   fields: (t) => ({
  //     followers: t.field({
  //       type: [Fren],
  //       resolve: async (user, _, context) => {
  //         if (!context.currentUser?.id) return null;
  //         const follows = await prisma.follow.findMany({
  //           where: {
  //             followingId: user.id, // User is being followed
  //           },
  //           include: {
  //             follower: true, // Include the users who are following
  //           },
  //         });
          
  //         return follows.map(follow => follow.follower);
  //       }
  //     }),
  //   }),
  // });

  // Commented out code block preserved but properly closed

  return builder;
}
