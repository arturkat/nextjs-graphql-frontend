/* @ts-ignore */
/* eslint-disable */

/**
 * Apollo Setup
 * URL: https://dev.to/lico/react-apollo-refresh-tokens-5h0k
 */
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  FetchResult,
  GraphQLRequest,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { GraphQLError } from "graphql/error";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

function isRefreshRequest(operation: GraphQLRequest) {
  return operation.operationName === "refreshToken";
}

// Returns accesstoken if opoeration is not a refresh token request
function returnTokenDependingOnOperation(operation: GraphQLRequest) {
  if (isRefreshRequest(operation))
    return localStorage.getItem("refreshToken") || "";
  else return localStorage.getItem("accessToken") || "";
}

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

const authLink = setContext((operation, { headers }) => {
  let token = returnTokenDependingOnOperation(operation);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            // ignore 401 error for a refresh request
            if (operation.operationName === "refreshToken") return;

            const observable = new Observable<FetchResult<Record<string, any>>>(
              (observer) => {
                // used an annonymous function for using an async function
                (async () => {
                  try {
                    const accessToken = await refreshToken();

                    if (!accessToken) {
                      throw new GraphQLError("Empty AccessToken");
                    }

                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };

                    forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              }
            );

            return observable;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

// Request a refresh token to then stores and returns the accessToken.
const refreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate<{
      refreshToken: AccessToken;
    }>({
      mutation: REFRESH_TOKEN,
    });

    const accessToken = refreshResolverResponse.data?.refreshToken.accessToken;
    localStorage.setItem("accessToken", accessToken || "");
    return accessToken;
  } catch (err) {
    localStorage.clear();
    throw err;
  }
};
