import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import "assets/vendors/style";
import indigoTheme from "./themes/indigoTheme";
import cyanTheme from "./themes/cyanTheme";
import orangeTheme from "./themes/orangeTheme";
import amberTheme from "./themes/amberTheme";
import pinkTheme from "./themes/pinkTheme";
import blueTheme from "./themes/blueTheme";
import purpleTheme from "./themes/purpleTheme";
import greenTheme from "./themes/greenTheme";
import darkTheme from "./themes/darkTheme";
import AppLocale from "../lngProvider";
import OAuth2RedirectHandler from '../oauth2/OAuth2RedirectHandler';

import {
  AMBER,
  BLUE,
  CYAN,
  DARK_AMBER,
  DARK_BLUE,
  DARK_CYAN,
  DARK_DEEP_ORANGE,
  DARK_DEEP_PURPLE,
  DARK_GREEN,
  DARK_INDIGO,
  DARK_PINK,
  DEEP_ORANGE,
  DEEP_PURPLE,
  GREEN,
  INDIGO,
  PINK,
} from "constants/ThemeColors";

import MainApp from "app/index";
import SignIn from "./SignIn";
import VerifyUser from "./VerifyUser";
import SignUp from "./SignUp";
import { setInitUrl } from "../actions/Auth";
import RTL from "util/RTL";
import asyncComponent from "util/asyncComponent";
import Items from "../app/routes/items";
// import languageData from '../components/LanguageSwitcher/data';


// const RestrictedRoute = ({ component: Component, authUser, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       authUser ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/signin",
//             state: { from: props.location },
//           }}
//         />
//       )
//     }
//   />
// );

class App extends Component {
  componentWillMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    if (this.props.initURL === "") {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }

  //  getLocale = (authUser) => {

  //   let locale = {
  //     languageId: 'english',
  //     locale: 'en',
  //     name: 'English',
  //     icon: 'us'
  //   };

  //   languageData.map((language, index) => {
  //     if (language.locale === authUser.defaultLanguage) {
  //       locale = language;
  //     }
  //   });


  //   console.log("authUser is: ", authUser);
  //   console.log("auth locale is: ", locale);

  //   return locale;

  // }

  getColorTheme(themeColor, applyTheme) {
    switch (themeColor) {
      case INDIGO: {
        applyTheme = createMuiTheme(indigoTheme);
        break;
      }
      case CYAN: {
        applyTheme = createMuiTheme(cyanTheme);
        break;
      }
      case AMBER: {
        applyTheme = createMuiTheme(amberTheme);
        break;
      }
      case DEEP_ORANGE: {
        applyTheme = createMuiTheme(orangeTheme);
        break;
      }
      case PINK: {
        applyTheme = createMuiTheme(pinkTheme);
        break;
      }
      case BLUE: {
        applyTheme = createMuiTheme(blueTheme);
        break;
      }
      case DEEP_PURPLE: {
        applyTheme = createMuiTheme(purpleTheme);
        break;
      }
      case GREEN: {
        applyTheme = createMuiTheme(greenTheme);
        break;
      }
      case DARK_INDIGO: {
        applyTheme = createMuiTheme(indigoTheme);
        break;
      }
      case DARK_CYAN: {
        applyTheme = createMuiTheme(cyanTheme);
        break;
      }
      case DARK_AMBER: {
        applyTheme = createMuiTheme(amberTheme);
        break;
      }
      case DARK_DEEP_ORANGE: {
        applyTheme = createMuiTheme(orangeTheme);
        break;
      }
      case DARK_PINK: {
        applyTheme = createMuiTheme(pinkTheme);
        break;
      }
      case DARK_BLUE: {
        applyTheme = createMuiTheme(blueTheme);
        break;
      }
      case DARK_DEEP_PURPLE: {
        applyTheme = createMuiTheme(purpleTheme);
        break;
      }
      case DARK_GREEN: {
        applyTheme = createMuiTheme(greenTheme);
        break;
      }
      default:
        createMuiTheme(greenTheme);
    }
    return applyTheme;
  }

  render() {
    const {
      match,
      location,
      themeColor,
      isDarkTheme,
      locale,
      authUser,
      initURL,
      isDirectionRTL,
    } = this.props;
    let applyTheme = createMuiTheme(greenTheme);
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
      applyTheme = createMuiTheme(darkTheme);
    } else {
      applyTheme = this.getColorTheme(themeColor, applyTheme);
    }

    if (initURL === "/logout") {
      this.props.setInitUrl("");
      return <Redirect to={"/signin"} />;
    } else if (initURL === "/verified") {
      this.props.setInitUrl("");
      return <Redirect to={"/app/"} />;
    } else {
      if (location.pathname === "/") {
        // ToDo allow all and add exceptions here later
        // if (authUser === null) {
        //   return <Redirect to={"/signin"} />;
        // } else
        if (initURL === "" || initURL === "/") {
          return <Redirect to={"/app/"} />;
        } else {
          return <Redirect to={initURL} />;
        }
      }
    }

    if (isDirectionRTL) {
      applyTheme.direction = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
      applyTheme.direction = "ltr";
    }

    let currentAppLocale = AppLocale[locale.locale];
    return (
      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <RTL>
              <div className="app-main">
                <Switch>
                  {/* <Route path={`${match.url}app/items`} component={Items} /> */}
                  <Route
                    path={`${match.url}app`}
                    authUser={authUser}
                    component={MainApp}
                  />
                  <Route path="/signin" component={SignIn} />
                  <Route path="/verify" component={VerifyUser} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                  {/* <Route
                    component={asyncComponent(() =>
                      import("app/routes/items/routes/allItems")
                    )}
                  /> */}
                </Switch>
              </div>
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const {
    themeColor,
    sideNavColor,
    darkTheme,
    locale,
    isDirectionRTL,
  } = settings;
  const { authUser, initURL } = auth;
  return {
    themeColor,
    sideNavColor,
    isDarkTheme: darkTheme,
    locale,
    isDirectionRTL,
    authUser,
    initURL,
  };
};

export default connect(mapStateToProps, { setInitUrl })(App);
