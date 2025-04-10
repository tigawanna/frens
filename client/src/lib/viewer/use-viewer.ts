import { queryOptions, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { authClient } from "../better-auth/auth-client";


export type BetterAuthUserPayload = NonNullable<Awaited<ReturnType<typeof fetchCurrentViewer>>["data"]>
export type BetterAthViewer = BetterAuthUserPayload["user"]
export type BetterAuthSession = BetterAuthUserPayload["session"]

export function viewerQueryOptions(){
  return queryOptions({
    queryKey: ["viewer"],
    queryFn: async () => {
      const session  = await authClient.getSession()
      if(!session){
        return
      }
      return session
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })
}


export function useViewer() {
  // const routeApi = getRouteApi("__root__");
  // const data = routeApi.useLoaderData();
  const qc = useQueryClient()
  const {data} = useSuspenseQuery(viewerQueryOptions());

  function logoutMutation() {
    return authClient.signOut().then(() => {
      qc.invalidateQueries(viewerQueryOptions());
    })
  }
  return {viewer:data?.data?.user,session:data?.data?.session,logoutMutation};
}



// const GITHUB_API_URL = "https://api.github.com/user";
 // Replace with your GitHub token

// export interface GitHubViewer {
//   login: string;
//   id: number;
//   node_id: string;
//   avatar_url: string;
//   gravatar_id: string;
//   url: string;
//   html_url: string;
//   followers_url: string;
//   following_url: string;
//   gists_url: string;
//   starred_url: string;
//   subscriptions_url: string;
//   organizations_url: string;
//   repos_url: string;
//   events_url: string;
//   received_events_url: string;
//   type: string;
//   site_admin: boolean;
//   name: string | null;
//   company: string | null;
//   blog: string | null;
//   location: string | null;
//   email: string | null;
//   hireable: boolean | null;
//   bio: string | null;
//   twitter_username: string | null;
//   public_repos: number;
//   public_gists: number;
//   followers: number;
//   following: number;
//   created_at: string;
//   updated_at: string;
// }

export async function fetchCurrentViewer(){
  return authClient.getSession()
}


// export function getPAT(){
//   if(typeof window !== "undefined"){
//     const PAT = localStorage.getItem("PAT")
//     if(!PAT){
//       return
//     }
//     return PAT
//   }
// }
