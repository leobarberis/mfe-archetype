import { mountCustomElement } from "./services/mount";

const mount = (el) => {
  mountCustomElement(el);
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_<%= name %>-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
