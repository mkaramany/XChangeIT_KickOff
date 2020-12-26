import {
  CHANGE_DIRECTION,
  CHANGE_NAVIGATION_STYLE,
  DARK_THEME,
  DRAWER_TYPE,
  HORIZONTAL_MENU_POSITION,
  SWITCH_LANGUAGE,
  THEME_COLOR,
  TOGGLE_COLLAPSED_NAV,
  WINDOW_WIDTH,
  SET_DEFAULT_LANGUAGE
} from 'constants/ActionTypes';

import * as globalActionTypes from "../constants/ActionTypes";
import axios from "../axios-xchangeit";
import authHeader from "../services/auth-header";
import authService from "../services/auth.service";


export function toggleCollapsedNav(isNavCollapsed) {
  return { type: TOGGLE_COLLAPSED_NAV, isNavCollapsed };
}

export function setDrawerType(drawerType) {
  return { type: DRAWER_TYPE, drawerType };
}

export function updateWindowWidth(width) {
  return { type: WINDOW_WIDTH, width };
}

export function setThemeColor(color) {
  return { type: THEME_COLOR, color };
}

export function setDarkTheme() {
  return { type: DARK_THEME };
}

export function changeDirection() {
  return { type: CHANGE_DIRECTION };
}

export function changeNavigationStyle(layoutType) {
  return {
    type: CHANGE_NAVIGATION_STYLE,
    payload: layoutType
  };
}

export function setHorizontalMenuPosition(navigationPosition) {
  return {
    type: HORIZONTAL_MENU_POSITION,
    payload: navigationPosition
  };
}

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale
  };
}


export const updateSignedInUser = (locale) => {
  let updatedLoggedInUser = { ...authService.getCurrentUser() };

  updatedLoggedInUser.defaultLanguage = locale;

  console.log("updateSignedInUser settings", updatedLoggedInUser);
  return {
    type: globalActionTypes.SIGNIN_USER_SUCCESS,
    payload: updatedLoggedInUser
  };
};

export const setDefaultLanguage = (locale) => {
  console.log("locale is ", locale.locale);
  return (dispatch) => {
    axios
      .put("/users/setLang", locale.locale, { headers: authHeader() })
      .then((response) => {
        console.log("axios response: ", response);
        dispatch(updateSignedInUser(locale));
      })
      .catch((error) => {
        console.log("setDefaultLanguage error", error);
      });
  };
};
