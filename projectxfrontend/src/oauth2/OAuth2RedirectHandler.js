import React, { Component } from "react";
import { ACCESS_TOKEN, API_BASE_URL } from "../constants/OAuth";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { switchLanguage } from "actions/Setting";
import { getUserLocale } from "../services/i18n-service.js";

class OAuth2RedirectHandler extends Component {
  request = (options) => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      );
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options).then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
  };

  getCurrentUser = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
    }

    return this.request({
      url: API_BASE_URL + "/users/me",
      method: "GET",
    });
  };

  getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(this.props.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  render() {
    const token = this.getUrlParameter("token");
    const error = this.getUrlParameter("error");

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      this.getCurrentUser().then((response) => {
        console.log("oauth user response", response);
        localStorage.setItem("user", JSON.stringify(response));
        this.props.onSetAuthUser(response);
        this.props.onSwitchLanguage(getUserLocale(response));
      });

      return (
        <Redirect
          to={{
            pathname: "/app",
            state: { from: this.props.location },
          }}
        />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/signin",
            state: {
              from: this.props.location,
              error: error,
            },
          }}
        />
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetAuthUser: (user) => dispatch(actions.setAuthUser(user)),
    onSwitchLanguage: (locale) => dispatch(switchLanguage(locale))
  };
};

export default connect(null, mapDispatchToProps)(OAuth2RedirectHandler);
