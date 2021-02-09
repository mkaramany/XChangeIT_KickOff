import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";
import ViewItem from "./routes/viewItem";

const Items = ({ match }) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/allItems`} />
      <Route
        path={`${match.url}/allItems`}
        component={asyncComponent(() => import("./routes/allItems"))}
      />
      <Route
        path={`${match.url}/myItems`}
        component={asyncComponent(() => import("./routes/myItems"))}
      />
      <Route
        path={`${match.url}/addItem`}
        component={asyncComponent(() => import("./routes/addItem"))}
      />
      <Route
        path={`${match.url}/viewItem/:id`}
        render={(props) => <ViewItem {...props}></ViewItem>}
      />


     
    </Switch>
  </div>
);

export default Items;
