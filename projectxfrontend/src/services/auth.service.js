import axios from "axios";

import { ACCESS_TOKEN , API_BASE_URL } from '../constants/OAuth';

class AuthService {
  login(username, password) {
    console.log("inside login auth serv", username, password);
    return axios
      .post(API_BASE_URL + "/authenticate", {
        username,
        password,
      })
      .then((response) => {
        console.log("inside login response", response);
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
  }

  logout() {
    console.log("inside authservice", localStorage.getItem("user"));
    localStorage.removeItem("user");
    localStorage.removeItem(ACCESS_TOKEN);
    return undefined;
  }

  register(user) {
    console.log("inside register auth serv", user);
    return axios.post(API_BASE_URL + "/signUp", user)
    .then((response) => {
      console.log("inside register response", response);
      return response.data;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  //verifies and returns an authenticated instance of the user
  verifyUser(email, verificationCode) {
    console.log("inside auth serv verifyUser", email, verificationCode);
    return axios
      .post(API_BASE_URL + "/verify", {
        email,
        verificationCode,
      })
      .then((response) => {
        console.log("inside verify response", response);
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        console.log("verifyUser error", error);
      });
  }
}

export default new AuthService();
