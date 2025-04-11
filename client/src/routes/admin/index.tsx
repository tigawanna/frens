import { createFileRoute, redirect } from "@tanstack/react-router";
import { ListAllUsers } from "./-components/ListAllUsers";
import { BulkusresCreate } from "./-components/BulkusresCreate";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
  beforeLoad(ctx) {
    if (ctx.context.viewer?.role !== "admin") {
      throw redirect({
        to: "/profile",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center gap-3">
      <BulkusresCreate/>
      <ListAllUsers />
    </div>
  );
}
