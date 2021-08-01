import { createElement } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import App from "./App";

class ContainerApp extends HTMLElement {

  static get observedAttributes() {
    return ['pathname'];
  }

  createApp(pathname) {
    return createElement(App, { pathname });
  }

  connectedCallback() {
    const pathname = this.getAttribute('pathname');
    render(this.createApp(pathname), this);
  }

  disconnectedCallback() {
    unmountComponentAtNode(App);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'pathname') {
      render(this.createApp(newValue), this);
    }
  }
}

customElements.define("container-ce", ContainerApp);

export default ContainerApp;
