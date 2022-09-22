import gql from "graphql-tag";

export const SIGN_UP = gql`
  mutation SignUp($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput) {
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
