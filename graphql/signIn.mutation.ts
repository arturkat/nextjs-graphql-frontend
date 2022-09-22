import gql from "graphql-tag";

export const SIGN_IN = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      accessToken
      refreshToken
      user {
        id
        username
        email
      }
    }
  }
`;
