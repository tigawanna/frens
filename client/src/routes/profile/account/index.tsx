import { createFileRoute } from "@tanstack/react-router";
import { ProfileComponen } from "../-components/account/ProfileComponen";

export const Route = createFileRoute("/profile/account/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-3">
      <div className="min-h-[70vh] w-full flex flex-col items-center gap-3 justify-center">
        <ProfileComponen />
      </div>
    </div>
  );
}
