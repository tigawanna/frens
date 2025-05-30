import { envVariables } from "@/env";
import { createAuthClient } from "better-auth/react";
import { adminClient, apiKeyClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  /** the base url of the server (optional if you're using the same domain) */

  baseURL: envVariables.VITE_API_URL,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [adminClient(), apiKeyClient()],
});
