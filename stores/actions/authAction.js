import { signIn, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { AUTH_ERROR, LOGOUT_SUCCESS, LOGIN_SUCCESS } from "../types";
import { beginsLoading, endsLoading } from "./loadingAction";
const logOutUserSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const signInUser = (userObj, loginType) => async (dispatch) => {
  dispatch(beginsLoading());
  if (loginType === "normal") {
    const result = await signIn("credentials", {
      redirect: false,
      userCred: JSON.stringify(userObj),
    });
    if (result.error) {
      dispatch({
        type: AUTH_ERROR,
        payload: result.status === 401 ? "Invalid Credentials" : result.error,
      });
    } else {
      toast.success("Login Successful");
    }
    dispatch(endsLoading());
  }
};

export const logOutUser = () => (dispatch) => {
  dispatch(logOutUserSuccess());
  signOut({ redirect: true, callbackUrl: "/" });
};
