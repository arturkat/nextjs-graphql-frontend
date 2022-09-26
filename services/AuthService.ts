import apolloClient from "@/http/apollo";
import { ApolloQueryResult, FetchResult, useMutation } from "@apollo/client";
import {
  CheckAuthQuery,
  CheckAuthQueryVariables,
  GetNewTokensMutation,
  GetNewTokensMutationVariables,
  LogOutMutation,
  LogOutMutationVariables,
  SignInMutation,
  SignInMutationVariables,
  SignResponse,
  SignUpMutation,
  SignUpMutationVariables,
} from "@/graphql/types";
import { SIGN_UP } from "@/graphql/signUp.mutation";
import { SIGN_IN } from "@/graphql/signIn.mutation";
import { CHECK_AUTH } from "@/graphql/checkAuth.query";
import { LOG_OUT } from "@/graphql/logOut.mutation";
import { GET_NEW_TOKENS } from "@/graphql/getNewTokens.mutation";

class AuthService {
  static async signUp(email: string, password: string, username: string) {
    let result: FetchResult<SignUpMutation>;
    result = await apolloClient.mutate<SignUpMutation, SignUpMutationVariables>(
      {
        mutation: SIGN_UP,
        variables: {
          signUpInput: {
            email: email,
            password: password,
            username: username,
          },
        },
      }
    );
    return result;
  }

  static async signIn(email: string, password: string) {
    let result: FetchResult<SignInMutation>;
    result = await apolloClient.mutate<SignInMutation, SignInMutationVariables>(
      {
        mutation: SIGN_IN,
        variables: {
          signInInput: {
            email: email,
            password: password,
          },
        },
      }
    );
    return result;
  }

  static async logOut(userId: number) {
    let result: FetchResult<LogOutMutation>;
    result = await apolloClient.mutate<LogOutMutation, LogOutMutationVariables>(
      {
        mutation: LOG_OUT,
        variables: {
          id: userId,
        },
      }
    );
    return result;
  }

  static async checkAuth() {
    let result: ApolloQueryResult<CheckAuthQuery>;
    result = await apolloClient.query<CheckAuthQuery, CheckAuthQueryVariables>({
      query: CHECK_AUTH,
    });
    return result;
  }

  static async getNewTokens() {
    let result: FetchResult<GetNewTokensMutation>;
    result = await apolloClient.mutate<
      GetNewTokensMutation,
      GetNewTokensMutationVariables
    >({
      mutation: GET_NEW_TOKENS,
    });
    return result;
  }
}

export default AuthService;
