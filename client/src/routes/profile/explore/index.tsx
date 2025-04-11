import { createFileRoute } from "@tanstack/react-router";
import { OtherFrensPage } from "./-components/OtherFrensPage";

export const Route = createFileRoute("/profile/explore/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-3">
      <OtherFrensPage />
    </div>
  );
}
