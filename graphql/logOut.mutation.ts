import gql from "graphql-tag";

export const LOG_OUT = gql`
  mutation LogOut($id: Int!) {
    logOut(id: $id) {
      loggedOut
    }
  }
`;
