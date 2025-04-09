import { redirect } from "@tanstack/react-router";
import { returnTo } from "../tanstack/router/utils";

export function authGuard(ctx: any) {
  if (!ctx.context.viewer) {
    throw redirect({
      to: "/auth",
      search: { returnTo: returnTo(ctx.location) },
    });
  }
}
