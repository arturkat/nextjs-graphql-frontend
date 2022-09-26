import gql from "graphql-tag";

export const GET_NEW_TOKENS = gql`
  mutation GetNewTokens {
    getNewTokens {
      accessToken
      refreshToken
    }
  }
`;
