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
      image: t.exposeString("image"),
      role: t.exposeString("role"),
    }),
  });
  return builder;
}
