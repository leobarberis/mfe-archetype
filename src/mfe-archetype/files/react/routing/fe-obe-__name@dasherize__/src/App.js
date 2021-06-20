import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Page from "./components/Page";

const devRoot = document.querySelector("#_<%= name %>-dev-root");

export default ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/<%= name %>" component={Home} />
        <Route exact path="/<%= name %>/page" component={Page} />
        <Route>{devRoot && <Redirect to="/<%= name %>" />}</Route>
      </Switch>
    </Router>
  );
};
