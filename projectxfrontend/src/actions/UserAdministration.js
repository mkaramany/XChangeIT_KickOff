import * as actionTypes from "../constants/XChangeItActionTypes/ActionTypes";
import * as globalActionTypes from "../constants/ActionTypes";
import axios from "../axios-xchangeit";
import authHeader from "../services/auth-header";
import authService from "../services/auth.service";

export const editUser = (user) => {
  console.log("inside action: editUser", user);
  return (dispatch) => {
    dispatch(editUserStart());
    axios
      .put("/users/edit", user, { headers: authHeader() })
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(getUser(response.data));
        dispatch(updateSignedInUser(response.data));
        dispatch(editUserSuccess());
      })
      .catch((error) => {
        console.log("editUser error", error);
        dispatch(editUserFail());
      });
  };
};

export const editUserStart = () => {
  return {
    type: actionTypes.EDIT_USER_START,
  };
};

export const updateSignedInUser = (user) => {
  let updatedLoggedInUser = { ...authService.getCurrentUser() };

  updatedLoggedInUser.profilePicture = user.profilePicture;
  updatedLoggedInUser.firstName = user.firstName;
  updatedLoggedInUser.lastName = user.lastName;
  updatedLoggedInUser.address = user.address;

  console.log("updateSignedInUser2", updatedLoggedInUser);
  return {
    type: globalActionTypes.SIGNIN_USER_SUCCESS,
    payload: updatedLoggedInUser,
  };
};

export const editUserSuccess = () => {
  return {
    type: actionTypes.EDIT_USER_SUCCESS,
  };
};

export const editUserFail = (error) => {
  return {
    type: actionTypes.EDIT_USER_FAIL,
    error: error,
  };
};
export const getUserById = (id) => {
  console.log("inside action: getUserById");
  return (dispatch) => {
    axios
      .get("/users/" + id, { headers: authHeader() })
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(getUser(response.data));
      })
      .catch((error) => {
        console.log("getUserById error", error);
      });
  };
};

export const getUser = (user) => {
  return {
    type: actionTypes.GET_USER,
    user: user,
  };
};
