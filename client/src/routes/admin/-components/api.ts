import { authClient } from "@/lib/better-auth/auth-client";
import { queryOptions } from "@tanstack/react-query";

export function usersQueryOptions() {
  return queryOptions({
    queryKey: ["admin", "users"],
    queryFn: () => {
      return authClient.admin.listUsers({
        query:{
            limit: 200,
        }
      })
    },
    staleTime: 1000 * 60 * 60 * 5, // 5 minutes
  });
}
