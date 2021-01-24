import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  VERIFY_USER_SUCCESS,
  REDIRECT_TO_LOGIN,
  SET_AUTH_USER
} from "constants/ActionTypes";
import { CLEAR_REDIRECT_INFO } from "../constants/ActionTypes";


const INIT_STATE = {
  loader: false,
  alertMessage: "",
  showMessage: false,
  initURL: "",
  authUser: JSON.parse(localStorage.getItem("user")),
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: {},
        phoneNumberToVerify: action.payload.phoneNumber,
        initURL: "/verify",
      };
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
        initURL: "",
      };
    }

    case VERIFY_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
        initURL: "/verified",
      };
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload,
      };
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        initURL: "/logout",
        loader: false,
      };
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        loader: false,
      };
    }

    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true,
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false,
      };
    }
    case REDIRECT_TO_LOGIN:
      return {
        ...state,
        redirectInfo: action.redirectInfo,
      };
    case SET_AUTH_USER:
      return {
        ...state,
        authUser: action.payload,
      };
    case CLEAR_REDIRECT_INFO:
      return {
        ...state,
        redirectInfo: null,
      };
    default:
      return state;
  }
};
