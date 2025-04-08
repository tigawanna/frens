// import { builder } from "./builder";

import type PrismaTypes from "@pothos/plugin-prisma/generated";

export function UserSchema(
  builder: PothosSchemaTypes.SchemaBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<{
      PrismaTypes: PrismaTypes;
    }>
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
    }),
  });
  return builder;
}


