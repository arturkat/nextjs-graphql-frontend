import nookies from "nookies";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/graphql/types";
import AuthService from "@/services/AuthService";
import { errorToast, successToast } from "@/redux/toasterSlice";
import { AppDispatch, RootState } from "@/redux/store";
import apolloClient from "@/http/apollo";

interface IAuthState {
  user: User | null;
}

const initialState: IAuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setLogOut(state) {
      state.user = null;
      apolloClient.clearStore();
    },
  },
});

export const { setUser, setLogOut } = authSlice.actions;

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
        dispatch(setUser(user));
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
        dispatch(setUser(user));
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
      dispatch(setLogOut());
      setTokens("", "");
    } catch (err: any) {
      dispatch(setLogOut());
      setTokens("", "");
      errorToast(err.toString(), dispatch);
      console.log("-> logOutAsync error -", err);
    }
  };

export const checkAuthAsync = () => async (dispatch: AppDispatch) => {
  try {
    let loggedIn = false;
    const checkAuthResponse = await AuthService.checkAuth();
    if (checkAuthResponse.data?.checkAuth?.loggedIn) {
      loggedIn = checkAuthResponse.data?.checkAuth?.loggedIn;
      successToast(`Check auth result: ${loggedIn}`, dispatch);
      console.log("-> signUpAsync success -", checkAuthResponse);
    }
    if (!loggedIn) {
      errorToast(`You aren't authenticated`, dispatch);
    }
    return checkAuthResponse;
  } catch (err: any) {
    errorToast(err.toString(), dispatch);
    console.log("-> checkAuthAsync error -", err);
  }
};

export const getNewTokensAsync = () => async (dispatch: AppDispatch) => {
  try {
    let getNewTokensResponse = await AuthService.getNewTokens();
    if (getNewTokensResponse?.data?.getNewTokens) {
      const { accessToken, refreshToken } =
        getNewTokensResponse?.data?.getNewTokens;
      setTokens(accessToken, refreshToken);
      successToast(`Got new tokens`, dispatch);
      console.log("-> getNewTokensAsync success -", getNewTokensResponse);
    }
  } catch (err: any) {
    errorToast(err.toString(), dispatch);
    console.log("-> getNewTokensAsync error -", err);
  }
};
