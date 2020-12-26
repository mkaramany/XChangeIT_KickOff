import * as actionTypes from "../constants/XChangeItActionTypes/ActionTypes";
import { updateObject } from "./utility";

const initialState = {
  items: [],
  loading: false,
  taskCompleted: false,
};

const getAllItems = (state, action) => {
  console.log("reducer: getAllItems", action);
  return updateObject(state, {
    allItems: action.items,
    taskCompleted: false,
    error: null,
  });
};

const getItem = (state, action) => {
  console.log("reducer: getItem", action);
  return updateObject(state, {
    itemDetails: action.item,
    taskCompleted: false,
  });
};

const reserveItemStart = (state) => {
  return updateObject(state, { loading: true });
};

const reserveItemSuccess = (state, action) => {
  return updateObject(state, {
    taskCompleted: true,
    loading: false,
  });
};

const reserveItemFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const addItemStart = (state) => {
  return updateObject(state, { loading: true });
};

const addItemSuccess = (state, action) => {
  return updateObject(state, {
    taskCompleted: true,
    loading: false,
  });
};

const addItemFail = (state, action) => {
  let error = action.error.data.error;
  if (action.error.status == 401) {
    error = "Invalid Session";
  }
  return updateObject(state, { error: error, loading: false });
};

const saveNewSlotsStart = (state) => {
  return updateObject(state, { loading: true });
};

const saveNewSlotsSuccess = (state, action) => {
  return updateObject(state, {
    taskCompleted: true,
    loading: false,
  });
};

const saveNewSlotsFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const getSearchItemsResults = (state, action) => {
  console.log("reducer: getSearchItemsResults", action);
  return updateObject(state, { allItems: action.items, taskCompleted: false });
};

const searchItemsStart = (state) => {
  return updateObject(state, { loading: true });
};

const searchItemsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const searchItemsFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const redirectToLogin = (state, action) => {
  return updateObject(state, { redirectInfo: action.redirectInfo });
};

const deleteItemStart = (state) => {
  return updateObject(state, { loading: true });
};

const deleteItemSuccess = (state, action) => {
  return updateObject(state, {
    taskCompleted: true,
    loading: false,
  });
};

const deleteItemFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const hasTradingItems = (state , action) =>{
  return updateObject(state, { userHasItemsToTrade: action.userHasItemsToTrade });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ITEMS:
      return getAllItems(state, action);
    case actionTypes.GET_ITEM:
      return getItem(state, action);
    case actionTypes.RESERVE_ITEM_START:
      return reserveItemStart(state);
    case actionTypes.RESERVE_ITEM_SUCCESS:
      return reserveItemSuccess(state, action);
    case actionTypes.RESERVE_ITEM_FAIL:
      return reserveItemFail(state, action);
    case actionTypes.ADD_ITEM_START:
      return addItemStart(state);
    case actionTypes.ADD_ITEM_SUCCESS:
      return addItemSuccess(state, action);
    case actionTypes.ADD_ITEM_FAIL:
      return addItemFail(state, action);
    case actionTypes.SAVE_NEW_SLOTS_START:
      return saveNewSlotsStart(state);
    case actionTypes.SAVE_NEW_SLOTS_SUCCESS:
      return saveNewSlotsSuccess(state, action);
    case actionTypes.SAVE_NEW_SLOTS_FAIL:
      return saveNewSlotsFail(state, action);
    case actionTypes.SEARCH_ITEMS_START:
      return searchItemsStart(state);
    case actionTypes.SEARCH_ITEMS_SUCCESS:
      return searchItemsSuccess(state, action);
    case actionTypes.SEARCH_ITEMS_FAIL:
      return searchItemsFail(state, action);
    case actionTypes.GET_SEARCH_ITEMS_RESULTS:
      return getSearchItemsResults(state, action);
    case actionTypes.DELETE_ITEM_START:
      return deleteItemStart(state, action);
    case actionTypes.DELETE_ITEM_SUCCESS:
      return deleteItemSuccess(state, action);
    case actionTypes.DELETE_ITEM_FAIL:
      return deleteItemFail(state, action);
    case actionTypes.USER_HAS_TRADING_ITEMS:
      return hasTradingItems(state, action);

    default:
      return state;
  }
};

export default reducer;
