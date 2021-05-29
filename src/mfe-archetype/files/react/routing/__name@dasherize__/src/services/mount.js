import React from "react";
import { render } from "react-dom";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";
import App from "../App";

const mountCustomElement = (history, el) => {
  class <%= classify(name) %>CustomElement extends HTMLElement {
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: "open" });
      const mountPoint = document.createElement("span");
      const reactRoot = shadowRoot.appendChild(mountPoint);
      const jss = create({
        ...jssPreset(),
        insertionPoint: reactRoot,
      });

      render(
        <StylesProvider jss={jss}>
          <App history={history} />
        </StylesProvider>,
        mountPoint
      );
    }

    disconnectedCallback() {
      unmountComponentAtNode(App);
    }
  }

  customElements.define("<%= name %>-ce", <%= classify(name) %>CustomElement);
  render(<<%= name %>-ce />, el);
};

export { mountCustomElement };
