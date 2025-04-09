// import { builder } from "./builder";

import { prisma } from "@/db/client";
import type { PothosBuilderGenericTYpe } from "./builder";

export function UserSchema(
  builder: PothosSchemaTypes.SchemaBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<PothosBuilderGenericTYpe>
  >,
) {
  builder.prismaObject("User", {
    // Optional name for the object, defaults to the name of the prisma model
    name: "User",
    fields: (t) => ({
      id: t.exposeID("id"),
      email: t.exposeString("email"),
      name: t.exposeString("name"),
    }),
  });

  builder.queryType({
    fields: (t) => ({
      hello: t.string({
        args: {
          name: t.arg.string(),
        },
        resolve: (parent, { name }) => `hello, ${name || "fren"}`,
      }),
      me: t.prismaField({
        type: "User",
        resolve: async (query, root, args, ctx, info) => {
          if (!ctx.currentUser) {
            return;
          }
          return prisma.user.findUniqueOrThrow({
            ...query,
            where: { id: ctx.currentUser?.id },
          });
        },
      }),
    }),
  });

  builder.mutationType({
    fields: (t) => ({
      createUser: t.prismaField({
        type: "User",
        args: {
          email: t.arg.string({ required: true }),
          name: t.arg.string({ required: true }),
          password: t.arg.string({ required: true }),
        },
        resolve: async (query, root, { email, name,password }, ctx, info) => {
          if (!ctx.currentUser) {
            return;
          }
          return prisma.user.create({
            ...query,
            data: {
              email,
              name,
              password
            },
          });
        },
      })
    })
  });
  
  return builder;
}
