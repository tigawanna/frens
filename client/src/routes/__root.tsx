import { createRootRouteWithContext } from "@tanstack/react-router";
import "@/view-transition/angled-transition.css";
import "@/view-transition/wipe-transition.css";
import "@/view-transition/slides-transition.css";
import "@/view-transition/flip-transition.css";
import "@/view-transition/vertical-transition.css";
import "../components/pagination/pagination.css";
import "./index.css";
import { QueryClient } from "@tanstack/react-query";
import { RootComponent } from "./-components/RootComponent";
import { z } from "zod";
import { fetchCurrentViewer } from "@/lib/viewer/use-viewer";
import { authClient } from "@/lib/better-auth/auth-client";

const searchparams = z.object({
  globalPage: z.number().optional(),
  globalSearch: z.string().optional(),
});

// const list = createRouteMask({

// })

type BetterAuthSession = NonNullable<Awaited<ReturnType<typeof fetchCurrentViewer>>["data"]>


export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  viewer?: BetterAuthSession["user"];
  session?: BetterAuthSession["session"]
}>()({
  component: RootComponent,
  validateSearch: (search) => searchparams.parse(search),
});
