import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Page from "./components/Page";

const devRoot = document.querySelector("#_<%= name %>-dev-root");

export default ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/<%= route %>" component={Home} />
        <Route exact path="/<%= route %>/page" component={Page} />
        <Route>{devRoot && <Redirect to="/<%= route %>" />}</Route>
      </Switch>
    </Router>
  );
};
