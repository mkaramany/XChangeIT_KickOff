import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";


const Profile = ({ match }) => {
  console.log("profile router",match);
  return(
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/userProfile`} />
      <Route
        path={`${match.url}/userProfile`}
        component={asyncComponent(() => import("./routes/userProfile"))}
      />
    </Switch>
  </div>
)};

export default Profile;
