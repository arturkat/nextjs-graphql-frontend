// @ts-ignore
import { ApolloLink, fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

let tokenRefreshPromise: Promise<any> = Promise.resolve();
let isRefreshing: boolean;

function createErrorLink(store: any): ApolloLink {
  return onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      // this is a helper method where we are checking the error message
      if (isExpiredLogin(graphQLErrors) && !isRefreshing) {
        isRefreshing = true;
        tokenRefreshPromise = store.dispatch("authentication/refreshToken");
        tokenRefreshPromise.then(() => (isRefreshing = false));
      }
      return fromPromise(tokenRefreshPromise).flatMap(() => forward(operation));
    }
    if (networkError) {
      handleNetworkError("My error message");
    }
  });
}

function isExpiredLogin(error: any) {
  return true;
}

function handleNetworkError(msg: any) {
  return true;
}
