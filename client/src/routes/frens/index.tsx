import { authGuard } from "@/lib/viewer/auth0guard";
import { createFileRoute } from "@tanstack/react-router";
import { MyFrensContainer, FrensSuspenseFallBck } from "./-components/MyFrensContainer";
import { Suspense } from "react";


export const Route = createFileRoute("/frens/")({
  component: RouteComponent,
  beforeLoad(ctx) {
    authGuard(ctx);
  },
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<FrensSuspenseFallBck />}>
        <MyFrensContainer />
      </Suspense>
    </div>
  );
}


