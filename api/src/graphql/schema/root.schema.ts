import { builder } from "./builder";
import { FrenSchema } from "./fren.schema";
import { UserSchema } from "./user.schema";

UserSchema(builder);
FrenSchema(builder);

export const pothosSchema = builder.toSchema();
