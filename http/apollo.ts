import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
  concat,
  ApolloLink,
  from,
  HttpLink,
  Observable,
  FetchResult,
  GraphQLRequest,
} from "@apollo/client";
import { ErrorResponse, onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
import { GraphQLErrors } from "@apollo/client/errors";
import { store } from "@/redux/store";
import { getNewTokensAsync } from "@/redux/authSlice";

const GetNewTokensOperationName = "GetNewTokens";

function returnTokenDependingOnOperation(operation: GraphQLRequest) {
  if (typeof localStorage === "undefined") {
    return "";
  }
  if (operation.operationName === GetNewTokensOperationName) {
    return localStorage.getItem("refreshToken") || "";
  } else {
    return localStorage.getItem("accessToken") || "";
  }
}

// const httpLink = createHttpLink({
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const authLink = new ApolloLink((operation, forward) => {
  let token = returnTokenDependingOnOperation(operation);

  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return forward(operation);
});

const errorLink = onError(
  ({
    graphQLErrors,
    networkError,
    response,
    operation,
    forward,
  }: ErrorResponse) => {
    if (graphQLErrors) {
      for (let gqlError of graphQLErrors) {
        switch (gqlError.extensions.code) {
          case "UNAUTHENTICATED":
            console.log("[GraphQLError]: UNAUTHENTICATED");

            // ignore 401 error for a refresh request
            if (operation.operationName === GetNewTokensOperationName) return;

            const stream$ = new Observable<FetchResult<Record<string, any>>>(
              (observer) => {
                (async () => {
                  try {
                    store.dispatch(getNewTokensAsync());

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

            return stream$;
        }
      }
    }

    if (networkError) console.log(`[NetworkError]: ${networkError}`);
  }
);

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
  connectToDevTools: true,
});

export default apolloClient;
