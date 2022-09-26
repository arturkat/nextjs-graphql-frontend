/* @ts-ignore */

// URL: https://able.bio/AnasT/apollo-graphql-async-access-token-refresh--470t1c8

import { onError } from "@apollo/client/link/error";
import { fromPromise, concat } from "@apollo/client";

let isRefreshing = false;
let pendingRequests: any[] = [];

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            // error code is set to UNAUTHENTICATED
            // when AuthenticationError thrown in resolver
            let forward$;

            if (!isRefreshing) {
              isRefreshing = true;
              forward$ = fromPromise(
                getNewToken()
                  .then(({ accessToken, refreshToken }: any) => {
                    // Store the new tokens for your auth link
                    resolvePendingRequests();
                    return accessToken;
                  })
                  .catch((error: any) => {
                    pendingRequests = [];
                    // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                    return;
                  })
                  .finally(() => {
                    isRefreshing = false;
                  })
              ).filter((value) => Boolean(value));
            } else {
              // Will only emit once the Promise is resolved
              forward$ = fromPromise(
                new Promise((resolve) => {
                  pendingRequests.push(() => resolve(""));
                })
              );
            }

            return forward$.flatMap(() => forward(operation));
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // if you would also like to retry automatically on
      // network errors, we recommend that you use
      // apollo-link-retry
    }
  }
);

const apolloLink = concat(errorLink, concat(authLink, httpLink));
