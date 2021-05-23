import React from "react";
import Paper from "@material-ui/core/Paper";

export default () => {
  return (
      <Paper variant="outlined">
        <h1>Hello from <%= name %>!</h1>
      </Paper>
  );
};
