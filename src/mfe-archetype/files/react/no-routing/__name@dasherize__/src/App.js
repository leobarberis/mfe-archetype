import React from "react";
import Home from "./components/Home";
import ReactShadowRoot from "react-shadow-root";

export default () => {
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
        <Home />
      </ReactShadowRoot>
    </div>
  );
};
