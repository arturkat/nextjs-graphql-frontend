import { gql } from "graphql-tag";

export const CHECK_AUTH = gql`
  query CheckAuth {
    checkAuth {
      loggedIn
    }
  }
`;
