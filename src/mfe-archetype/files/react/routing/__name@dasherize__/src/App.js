import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Page from "./components/Page";
import ReactShadowRoot from "react-shadow-root";

const devRoot = document.querySelector("#_<%= name %>-dev-root");

export default ({ history }) => {
  return (
    <div>
      <ReactShadowRoot>
        <link
          href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css"
          rel="stylesheet"
        />
        <script
          src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"
          defer
        ></script>
        <Router history={history}>
          <Switch>
            <Route exact path="/<%= name %>" component={Home} />
            <Route exact path="/<%= name %>/page" component={Page} />
            <Route>{devRoot && <Redirect to="/<%= name %>" />}</Route>
          </Switch>
        </Router>
      </ReactShadowRoot>
    </div>
  );
};
