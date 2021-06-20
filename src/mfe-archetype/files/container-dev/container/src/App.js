import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Progress from "./components/Progress";
import useNavigation from "./services/useNavigation";

const history = createBrowserHistory({ basename: "/obe/" });

export default ({ pathname: nextPathname }) => {
  useNavigation(history, nextPathname);
  return (
    <Router history={history}>
      <Suspense fallback={<Progress />}>
        <ErrorBoundary>
          <Switch></Switch>
        </ErrorBoundary>
      </Suspense>
    </Router>
  );
};
