import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_USER_DETAILS,
  AUTH_ERROR,
} from "../types";

const initialState = {
  user: {},
  isAuthenticated: false,
  authenticationError: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        authenticationError: null,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        authenticationError: null,
      };

    case UPDATE_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
        authenticationError: null,
      };

    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        authenticationError: action.payload,
      };

    default:
      return state;
  }
};
