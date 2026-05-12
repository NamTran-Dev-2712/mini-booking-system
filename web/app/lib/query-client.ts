import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { getApiErrorMessage, isApiError } from "~/lib/api-error";

// ---------------------------------------------------------------------------
// Factory — creates a QueryClient with production-grade defaults
// ---------------------------------------------------------------------------
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 30 s — list data is considered fresh; avoids refetch spam on tab switch
        staleTime: 30_000,
        // 5 min — keep cache in memory after component unmounts
        gcTime: 5 * 60_000,
        // Don't refetch on window focus (admin panel, not a real-time feed)
        refetchOnWindowFocus: false,
        // Don't retry on 4xx — surface errors immediately
        retry: (failureCount, err) => {
          if (
            isApiError(err) &&
            [400, 401, 403, 404].includes(err.statusCode)
          ) {
            return false;
          }
          return failureCount < 2;
        },
      },
      mutations: {
        retry: 0,
        // Global fallback toast — individual mutations can override via onError
        onError: (err) => {
          import("sonner").then(({ toast }) =>
            toast.error(getApiErrorMessage(err)),
          );
        },
      },
      dehydrate: {
        // Include pending queries so React Router loaders can stream them
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

// ---------------------------------------------------------------------------
// Singleton on the client; new instance per request on the server
// ---------------------------------------------------------------------------
let browserQueryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
  if (isServer) {
    // Server: always create a new client to avoid cross-request data leaks
    return makeQueryClient();
  }
  // Browser: reuse the same client across HMR reloads
  return (browserQueryClient ??= makeQueryClient());
}
