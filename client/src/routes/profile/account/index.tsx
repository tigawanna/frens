import { createFileRoute } from "@tanstack/react-router";
import { ProfileComponen } from "../-components/account/ProfileComponen";
import { z } from "zod";

export const accountTabs = ["overview", "details", "status", "keys"] as const;

const searchparams = z.object({
  tab: z.enum(accountTabs).default("overview").optional(),
});



export const Route = createFileRoute("/profile/account/")({
  component: RouteComponent,
  validateSearch: (search) => searchparams.parse(search),
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
