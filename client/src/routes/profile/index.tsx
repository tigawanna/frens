import { createFileRoute } from "@tanstack/react-router";
import { authGuard } from "@/lib/viewer/auth0guard";
import { Suspense } from "react";
import { Me } from "./-components/fren/containers/Me";
import { FrensTabSuspenseFallBack } from "./-components/fren/containers/FrensTabSuspenseFallBack";


export const Route = createFileRoute("/profile/")({
  component: RouteComponent,
  beforeLoad(ctx) {
    authGuard(ctx);
  },
});

function RouteComponent() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-3">
      <Suspense fallback={<FrensTabSuspenseFallBack/>}>
        <Me/>
      </Suspense>
    </div>
  );
}
