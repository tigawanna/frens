import { builder } from "./builder";
import { UserSchema } from "./User";

UserSchema(builder);

export const pothosSchema = builder.toSchema();
