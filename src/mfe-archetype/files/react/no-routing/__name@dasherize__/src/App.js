import React from "react";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Home from "./components/Home";

const generateClassName = createGenerateClassName({
  productionPrefix: "<%= name %>",
});

export default () => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Home />
      </StylesProvider>
    </div>
  );
};
