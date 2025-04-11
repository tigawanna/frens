import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { authGuard } from "@/lib/viewer/auth0guard";
import { createFileRoute } from "@tanstack/react-router";

import { Suspense } from "react";
// import { Me } from "./-components/Me";


export const Route = createFileRoute("/frens/")({
  component: RouteComponent,
  beforeLoad(ctx) {
    authGuard(ctx);
  },
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<CardsListSuspenseFallback />}>
        {/* <Me/> */}
      </Suspense>
    </div>
  );
}


