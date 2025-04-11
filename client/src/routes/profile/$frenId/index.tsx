import { Suspense } from "react";
import { createFileRoute } from '@tanstack/react-router';
// import { OtherFrenProfileContainer } from "./-components/OtherFrenProfileContainer";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";

export const Route = createFileRoute('/profile/$frenId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { frenId } = Route.useParams();
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-3">
      <Suspense fallback={<CardsListSuspenseFallback />}>
      <h1 className="text-2xl font-bold">{frenId}</h1>
        {/* <OtherFrenProfileContainer frenId={frenId} /> */}
      </Suspense>
    </div>
  );
}
