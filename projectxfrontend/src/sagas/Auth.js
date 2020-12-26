import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { getUserLocale } from "../services/i18n-service.js";

import AuthService from "../services/auth.service";

import {
  SIGNIN_FACEBOOK_USER,
  SIGNIN_GITHUB_USER,
  SIGNIN_GOOGLE_USER,
  SIGNIN_TWITTER_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  VERIFY_USER,
} from "constants/ActionTypes";
import {
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess,
  userSignUpSuccess,
  userVerificationSuccess,
} from "actions/Auth";
import {
  switchLanguage
} from "actions/Setting";


const createUser = async (user) => 
  await AuthService.register(user)
    .then((resp) => resp) //redirect to verification code
    .catch((error) => error);


//original method by jumbo
// const createUserWithEmailPasswordRequest = async (email, password) =>
//   await AuthService.register("username" ,"a@b.v", "123456")
//     .then((authUser) => authUser)
//     .catch((error) => error);

const signInUserWithEmailPasswordRequest = async (email, password) =>
  await AuthService.login(email, password)
    .then((authUser) => authUser)
    .catch((error) => error);

const verifyUserWithCodeRequest = async (email, verificationCode) =>
  await AuthService.verifyUser(email, verificationCode)
    .then((authUser) => authUser)
    .catch((error) => error);

const signOutRequest = async () => AuthService.logout();

function* createXChangeItUser({ payload }) {
  console.log("inside createXChangeItUser", payload);
  const user = payload;
  try {
    const signUpUser = yield call(createUser, user);
    console.log("signUpUser", signUpUser);
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      yield put(userSignUpSuccess(signUpUser));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signInUserWithEmailPassword({ payload }) {
  const { email, password } = payload;
  try {
    const signInUser = yield call(
      signInUserWithEmailPasswordRequest,
      email,
      password
    );
    console.log("signinuser", signInUser);

    if (signInUser.message) {
      yield put(showAuthMessage("Incorrect Username or Password"));
    } else {
      yield put(userSignInSuccess(signInUser));
      yield put(switchLanguage(getUserLocale(signInUser)));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* verifyUserWithCode({ payload }) {
  console.log("verifyUserWithCode saga", payload);
  const { email, verificationCode } = payload;
  try {
    const verifiedUser = yield call(
      verifyUserWithCodeRequest,
      email,
      verificationCode
    );
    console.log("verifyUserWithCode", verifiedUser);

    if (verifiedUser.message) {
      yield put(showAuthMessage(verifiedUser.message));
    } else {
      yield put(userVerificationSuccess(verifiedUser));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signOut() {
  try {
    const signOutUser = yield call(signOutRequest);
    console.log("inside signOut", signOutUser);
    if (signOutUser === undefined) {
      localStorage.removeItem("user"); //user_id
      yield put(userSignOutSuccess(signOutUser));
    } else {
      yield put(showAuthMessage(signOutUser.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createXChangeItUser);
}

export function* signInUser() {
  console.log("signInUser take every");
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* verifyUser() {
  console.log("verifyUser take every");
  yield takeEvery(VERIFY_USER, verifyUserWithCode);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
  yield all([
    fork(signInUser),
    fork(verifyUser),
    fork(createUserAccount),
    fork(signOutUser)
  ]);
}
