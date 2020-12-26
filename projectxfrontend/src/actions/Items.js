import * as actionTypes from "../constants/XChangeItActionTypes/ActionTypes";
import { CLEAR_REDIRECT_INFO } from "../constants/ActionTypes";
import axios from "../axios-xchangeit";
import authHeader from "../services/auth-header";

export const getAllItems = (items) => {
  return {
    type: actionTypes.GET_ALL_ITEMS,
    items: items,
  };
};

export const fetchAllItems = () => {
  console.log("inside action: fetch all items");
  return (dispatch) => {
    axios
      .get("/items/permitAll/list")
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(getAllItems(response.data));
      })
      .catch((error) => {
        console.log("fetchAllItems error", error);
      });
  };
};

export const getItem = (item) => {
  return {
    type: actionTypes.GET_ITEM,
    item: item,
  };
};

export const getItemById = (id) => {
  console.log("inside action: getItemById");
  return (dispatch) => {
    axios
      .get("/items/permitAll/" + id)
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(getItem(response.data));
      })
      .catch((error) => {
        console.log("getItemById error", error);
      });
  };
};

export const addItem = (item) => {
  console.log("inside action: addItem");
  return (dispatch) => {
    axios
      .post("/items/add", item, { headers: authHeader() })
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(fetchAllItems());
        dispatch(addItemSuccess());
        dispatch(clearRedirectInfo());
      })
      .catch((error) => {
        console.log("addItem error", error.response);
        dispatch(addItemFail(error.response));
      });
  };
};

export const addItemStart = () => {
  return {
    type: actionTypes.ADD_ITEM_START,
  };
};

export const addItemSuccess = () => {
  return {
    type: actionTypes.ADD_ITEM_SUCCESS,
  };
};

export const addItemFail = (error) => {
  return {
    type: actionTypes.ADD_ITEM_FAIL,
    error: error,
  };
};

export const clearRedirectInfo = () => {
  return {
    type: CLEAR_REDIRECT_INFO,
  };
};

export const reserveItem = (item) => {
  console.log("inside action: onReserveItem", item);
  return (dispatch) => {
    dispatch(reserveItemStart());
    axios
      .post("/items/reserve", item, { headers: authHeader() })
      .then((response) => {
        console.log("axios reserve response: ", response);
        dispatch(fetchAllItems());
        dispatch(reserveItemSuccess());
      })
      .catch((error) => {
        console.log("axios reserve error: ", error.response.data);
        dispatch(reserveItemFail(error.response.data));
      });
  };
};

export const reserveItemStart = () => {
  return {
    type: actionTypes.RESERVE_ITEM_START,
  };
};

export const reserveItemSuccess = () => {
  return {
    type: actionTypes.RESERVE_ITEM_SUCCESS,
  };
};

export const reserveItemFail = (error) => {
  return {
    type: actionTypes.RESERVE_ITEM_FAIL,
    error: error,
  };
};

export const setItemAsTaken = (id) => {
  console.log("inside action: setItemAsTaken", "/items/setTaken/" + id);
  return (dispatch) => {
    axios
      .put("/items/setTaken/" + id, {}, { headers: authHeader() })
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(fetchAllItems());
      })
      .catch((error) => {
        console.log("setItemAsTaken error", error);
      });
  };
};

export const setItemAsNotTaken = (id) => {
  console.log("inside action: setItemAsNotTaken", id);
  return (dispatch) => {
    axios
      .put("/items/setNotTaken/" + id, {}, { headers: authHeader() })
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(getItem(response.data));
      })
      .catch((error) => {
        console.log("setItemAsNotTaken error", error);
      });
  };
};

export const saveNewSlots = (item) => {
  console.log("inside action: saveNewSlots");
  return (dispatch) => {
    dispatch(saveNewSlotsStart());
    axios
      .put("/items/saveNewSlots", item)
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(fetchAllItems());
        dispatch(saveNewSlotsSuccess());
      })
      .catch((error) => {
        console.log("saveNewSlots error", error);
        dispatch(saveNewSlotsFail());
      });
  };
};

export const saveNewSlotsStart = () => {
  return {
    type: actionTypes.SAVE_NEW_SLOTS_START,
  };
};

export const saveNewSlotsSuccess = () => {
  return {
    type: actionTypes.SAVE_NEW_SLOTS_SUCCESS,
  };
};

export const saveNewSlotsFail = (error) => {
  return {
    type: actionTypes.SAVE_NEW_SLOTS_FAIL,
    error: error,
  };
};

export const getSearchItemResults = (items) => {
  return {
    type: actionTypes.GET_SEARCH_ITEMS_RESULTS,
    items: items,
  };
};
export const searchItems = (criteria) => {
  console.log("inside action: searchItems", criteria);
  return (dispatch) => {
    dispatch(searchItemsStart());
    axios
      .post("/items/permitAll/search", criteria)
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(getSearchItemResults(response.data));
        dispatch(searchItemsSuccess());
      })
      .catch((error) => {
        console.log("searchItems error", error);
        dispatch(searchItemsFail());
      });
  };
};

export const searchItemsStart = () => {
  return {
    type: actionTypes.SEARCH_ITEMS_START,
  };
};

export const searchItemsSuccess = () => {
  return {
    type: actionTypes.SEARCH_ITEMS_SUCCESS,
  };
};

export const searchItemsFail = (error) => {
  return {
    type: actionTypes.SEARCH_ITEMS_FAIL,
    error: error,
  };
};

export const getUserItems = (id) => {
  console.log("inside action: getUserItems");
  return (dispatch) => {
    axios
      .get("/items/userItems/" + id, { headers: authHeader() })
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(getAllItems(response.data));
      })
      .catch((error) => {
        console.log("getUserItems error", error);
      });
  };
};

export const deleteItem = (id) => {
  console.log("inside action: deleteItem");
  return (dispatch) => {
    dispatch(deleteItemStart());
    axios
      .put("/items/delete/" + id, {}, { headers: authHeader() })
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(deleteItemSuccess(id));
        dispatch(getUserItems(id));
      })
      .catch((error) => {
        console.log("deleteItem error", error);
        dispatch(deleteItemFail(error.response.data));
      });
  };
};

export const deleteItemStart = () => {
  return {
    type: actionTypes.DELETE_ITEM_START,
  };
};

export const deleteItemSuccess = () => {
  return {
    type: actionTypes.DELETE_ITEM_SUCCESS,
  };
};

export const deleteItemFail = (error) => {
  return {
    type: actionTypes.DELETE_ITEM_FAIL,
    error: error,
  };
};

export const userHasItemsToTrade = (hasItems) => {
  return {
    type: actionTypes.USER_HAS_TRADING_ITEMS,
    userHasItemsToTrade: hasItems
  };
};

export const checkIfUserHasItemsToTrade  = (id) => {
  console.log("inside action: checkIfUserHasItemsToTrade");
  return (dispatch) => {
    axios
      .get("/items/forTrading/"+id, { headers: authHeader() })
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(userHasItemsToTrade(response.data));
      })
      .catch((error) => {
        console.log("checkIfUserHasItemsToTrade error", error);
      });
  };
};