import nookies from "nookies";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUpInput, SignUpMutation, User } from "@/graphql/types";
import AuthService from "@/services/AuthService";
import { errorToast, setToast, successToast } from "@/redux/toasterSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ApolloError, FetchResult } from "@apollo/client";
// import { ApolloError } from '@apollo/client/errors';

interface IAuthState {
  isAuth: boolean;
  user: User | null;
}

const initialState: IAuthState = {
  isAuth: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setSignInData(
      state,
      action: PayloadAction<{ user: User; isAuth: boolean }>
    ) {
      state.user = action.payload.user;
      state.isAuth = action.payload.isAuth;
    },
    setLogOutData(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setAuth, setUser, setLogOutData, setSignInData } =
  authSlice.actions;

export default authSlice.reducer;

function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export const signUpAsync =
  (email: string, password: string, username: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const signUpResponse = await AuthService.signUp(
        email,
        password,
        username
      );
      if (signUpResponse.data?.signUp) {
        const { user, accessToken, refreshToken } = signUpResponse.data?.signUp;
        dispatch(setSignInData({ user: user, isAuth: true }));
        setTokens(accessToken, refreshToken);
        successToast("Successful sing up!", dispatch);
        console.log("-> signUpAsync success -", signUpResponse);
      }
      return signUpResponse;
    } catch (err: any) {
      errorToast(err.toString(), dispatch);
      console.log("-> signUpAsync error -", err);
    }
  };

export const signInAsync =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const signInResponse = await AuthService.signIn(email, password);
      if (signInResponse.data?.signIn) {
        const { user, accessToken, refreshToken } = signInResponse.data?.signIn;
        dispatch(setSignInData({ user: user, isAuth: true }));
        setTokens(accessToken, refreshToken);
        successToast("Successful sing in!", dispatch);
        console.log("-> signUpAsync success -", signInResponse);
      }
      return signInResponse;
    } catch (err: any) {
      errorToast(err.toString(), dispatch);
      console.log("-> signUpAsync error -", err);
    }
  };

export const logOutAsync =
  () => async (dispatch: AppDispatch, getState: Function) => {
    try {
      let hasLoggedOut = false;
      const state: RootState = getState();
      if (state?.auth?.user) {
        const userId = state.auth.user.id;
        const logOutResponse = await AuthService.logOut(userId);
        if (logOutResponse.data?.logOut?.loggedOut) {
          hasLoggedOut = true;
          successToast("Successful log out!", dispatch);
          console.log("-> logOutAsync success -", logOutResponse);
        }
      }
      if (!hasLoggedOut) {
        errorToast(`Can't log out!`, dispatch);
      }
      dispatch(setLogOutData());
    } catch (err: any) {
      errorToast(err.toString(), dispatch);
      console.log("-> logOutAsync error -", err);
      dispatch(setLogOutData());
    }
  };

export const checkAuthAsync = () => async (dispatch: AppDispatch) => {
  try {
    const checkAuthResponse = await AuthService.checkAuth();
    if (checkAuthResponse.data?.checkAuth) {
      const checkAuth = checkAuthResponse.data?.checkAuth;
      successToast(`Check auth result: ${checkAuth}`, dispatch);
      console.log("-> signUpAsync success -", checkAuthResponse);
    }
    return checkAuthResponse;
  } catch (err: any) {
    console.log("-> checkAuthAsync error -", err);
  }
};
