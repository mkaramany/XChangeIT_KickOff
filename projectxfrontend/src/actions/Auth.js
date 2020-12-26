import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  VERIFY_USER,
  VERIFY_USER_SUCCESS,
  REDIRECT_TO_LOGIN,
  SET_AUTH_USER

} from 'constants/ActionTypes';



export const setAuthUser = (authUser) => {
  return {
    type: SET_AUTH_USER,
    payload: authUser
  };
};

export const userSignUp = (user) => {
  return {
    type: SIGNUP_USER,
    payload: user
  };
};
export const userSignIn = (user) => {
  return {
    type: SIGNIN_USER,
    payload: user
  };
};
export const userSignOut = () => {
  return {
    type: SIGNOUT_USER
  };
};
export const userSignUpSuccess = (signUpUser) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: signUpUser
  };
};

export const userSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser
  }
};
export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  }
};

export const userVerification = (verificationData) => {
  console.log("userVerification action" , verificationData);
  return {
    type: VERIFY_USER,
    payload: verificationData
  };
};

export const userVerificationSuccess = (authUser) => {
  return {
    type: VERIFY_USER_SUCCESS,
    payload: authUser
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};


export const userGoogleSignIn = () => {
  return {
    type: SIGNIN_GOOGLE_USER
  };
};
export const userGoogleSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_GOOGLE_USER_SUCCESS,
    payload: authUser
  };
};
export const userFacebookSignIn = () => {
  return {
    type: SIGNIN_FACEBOOK_USER
  };
};
export const userFacebookSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_FACEBOOK_USER_SUCCESS,
    payload: authUser
  };
};
export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};
export const userTwitterSignIn = () => {
  return {
    type: SIGNIN_TWITTER_USER
  };
};
export const userTwitterSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_TWITTER_USER_SUCCESS,
    payload: authUser
  };
};
export const userGithubSignIn = () => {
  return {
    type: SIGNIN_GITHUB_USER
  };
};
export const userGithubSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_GITHUB_USER_SUCCESS,
    payload: authUser
  };
};
export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};
export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};


export const redirectToLogin= (redirectInfo) => {
  return {
    type: REDIRECT_TO_LOGIN,
    redirectInfo: redirectInfo
  };
};
