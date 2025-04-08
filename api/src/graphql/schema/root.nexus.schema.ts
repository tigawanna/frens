import { nexusPrisma } from "@repo/db";

import { makeSchema, objectType, queryType } from "nexus";

const { User } = nexusPrisma;

// import * as types from './types'

const UserType = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id);
    t.field(User.email);
    t.field(User.name);
    t.field(User.createdAt);
    t.field(User.updatedAt);
  },
});

const Query = queryType({
  definition(t) {
    t.string("hello", {
      resolve: () => "world",
    });
  },
});

export const nexusSchema = makeSchema({
  types: [Query, UserType],
  //   plugins: [nexusPrisma()],
});
