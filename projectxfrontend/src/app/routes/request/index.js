import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";


const Request = ({ match }) => {
  console.log("Request router",match);
  return(
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/request`} />
      <Route
        path={`${match.url}/request`}
        component={asyncComponent(() => import("./routes/requestItem"))}
      />
    </Switch>
  </div>
)};

export default Request;
