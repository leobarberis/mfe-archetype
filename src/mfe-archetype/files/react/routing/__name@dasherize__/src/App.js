import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Home from "./components/Home";
import Page from "./components/Page";

const generateClassName = createGenerateClassName({
  productionPrefix: "<%= name %>",
});

const devRoot = document.querySelector("#_<%= name %>-dev-root");

export default ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route exact path="/<%= name %>/page" component={Home} />
            <Route exact path="/<%= name %>" component={Page} />
            <Route>{devRoot && <Redirect to="/<%= name %>" />}</Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
