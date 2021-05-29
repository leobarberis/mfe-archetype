import { createMemoryHistory, createBrowserHistory } from "history";
import { mountCustomElement } from "./services/mount";

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  mountCustomElement(history, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_<%= name %>-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
