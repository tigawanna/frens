import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
// import { OtherFrenProfileContainer } from "./-components/OtherFrenProfileContainer";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { FrensTabSuspenseFallBack } from "../-components/fren/containers/FrensTabSuspenseFallBack";
import { Fren } from "../-components/fren/containers/Fren";

export const Route = createFileRoute("/profile/$frenId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { frenId } = Route.useParams();
  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-3">
      <Suspense fallback={<FrensTabSuspenseFallBack/>}>
        <Fren frenId={frenId}/>
      </Suspense>
    </div>
  );
}
