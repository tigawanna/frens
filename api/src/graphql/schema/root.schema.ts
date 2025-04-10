import { prisma } from "@/db/client";
import { builder } from "./builder";
import { printType, lexicographicSortSchema } from "graphql";
import type { User } from "@/db/generated/client";
// import { FrenSchema } from "./fren.schema";
// import { UserSchema } from "./user.schema";

// UserSchema(builder);
// FrenSchema(builder);

// Create a relay node based a prisma model
// Pre-define the Fren reference first
const FrenRef = builder.objectRef<User>('User');
// Create a relay node based a prisma model

const Follower = builder.prismaNode("User", {
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

})
const Fren = builder.prismaNode("User", {
  variant: "Fren",
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
    followers: t.prismaConnection({
      type: Follower,
      cursor: "id",
      resolve: (parent) => prisma.user.findMany({
        // @ts-expect-error
        where: { following: { some: { id:parent.cursor } } },
      }),
    }),
    following: t.prismaConnection({
      type: Follower, // You might want this too for bidirectional relationships
      cursor: "id", 
      resolve: (query, parent, args, context, info) => prisma.user.findMany({ ...query }),
    })
  }),
});


builder.queryType({
  fields: (t) => ({
    // Define a field that issues an optimized prisma query
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
  }),
});

export const pothosSchema = builder.toSchema();

// export const schemaAsString = printType(lexicographicSortSchema(pothosSchema))
