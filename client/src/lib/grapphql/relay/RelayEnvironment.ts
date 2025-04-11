import { envVariables } from "@/env";
import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  CacheConfig,
  RequestParameters,
  UploadableMap,
  Variables,
} from "relay-runtime";

const HTTP_ENDPOINT = `${envVariables.VITE_API_URL}/graphql`;

interface RelayFecherVars {
  request: RequestParameters;
  variables: Variables;
  cacheConfig: CacheConfig;
  uploadables?: UploadableMap | null | undefined;
}
interface RelayeFetcherFunctionArgs {
  fetchVars: RelayFecherVars;
  token?: string | null;
}
export async function fetchFn({
  fetchVars: { request, variables },
  token,
}: RelayeFetcherFunctionArgs) {
  try {
    // throw new Error("no gh_pat in env")
    const bearer_token = token;
    // console.log("=== bearer_token in relay fetchFn ====== ",bearer_token)
    // if (bearer_token == null) {
    //   throw new Error("no bearer_token in env");
    // }
    const resp = await fetch(HTTP_ENDPOINT, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
        "Content-Type": "application/json",
        // <-- Additional headers like 'Authorization' would go here
        // Authorization: `Bearer ${bearer_token}`,
      },
      body: JSON.stringify({
        query: request.text, // <-- The GraphQL document composed by Relay
        variables,
      }),
    });
    // if (!resp.ok) {
      // If the response is not okay, then throw an error
      // console.log(" ====== RELAY FETCHER STATUS TEXT ============== ", resp.statusText);
      // throw new Error(resp.statusText);/
    // }
    const json = await resp.json();
    // console.log(" ====== RELAY FETCHER JSON ============== ", json);
    // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
    // property of the response. If any exceptions occurred when processing the request,
    // throw an error to indicate to the developer what went wrong.
    if (json.data&&Array.isArray(json.errors)) {
      const { errors,...rest} = json;
      // console.log("====== RELAY FETCHER PARTIAL DATA ========",rest)
      // console.log("====== RELAY FETCHER PARTIAL ERROR ========",json.errors)
      return rest
    }
    if (!json.data&&Array.isArray(json.errors)) {
      throw new Error(
        `Error fetching GraphQL query '${request.name}' with variables '${JSON.stringify(
          variables
        )}': ${JSON.stringify(json.errors)}`
      );
    }
    return json;
  } catch (error) {
    // console.log(" ====== RELAY FETCHER ERROR ============== ", error);
    throw error;
  }
}

export function createRelayEnvironment() {
  return new Environment({
    network: Network.create((request, variables, cacheConfig, uploadables) =>
      fetchFn({
        fetchVars: { request, variables, cacheConfig, uploadables },
        // token,
      })
    ),
    store: new Store(new RecordSource()),
    isServer: false,
  });
}

;
