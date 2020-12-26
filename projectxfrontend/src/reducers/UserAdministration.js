import * as actionTypes from "../constants/XChangeItActionTypes/ActionTypes";
import { updateObject } from "./utility";

const initialState = {
  users: [],
  taskCompleted: false,
};

const getAllUsers = (state, action) => {
  console.log("reducer: getAllUsers", action);
  return updateObject(state, { users: action.users });
};

const getUser = (state, action) => {
  console.log("reducer: getUser", action);
  return updateObject(state, { user: action.user});
};

const editUserStart = (state) => {
  return updateObject(state, { loading: true });
};

const editUserSuccess = (state, action) => {
  return updateObject(state, {
    taskCompleted: true,
    loading: false,
  });
};

const editUserFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS:
      return getAllUsers(state, action);
    case actionTypes.GET_USER:
      return getUser(state, action);
    case actionTypes.EDIT_USER_START:
      return editUserStart(state, action);
    case actionTypes.EDIT_USER_SUCCESS:
      return editUserSuccess(state, action);
    case actionTypes.EDIT_USER_FAIL:
      return editUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;
