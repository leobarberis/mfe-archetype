import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export default () => {
  return (
      <Paper variant="outlined">
        <h1>Hello from <%= name %>!</h1>
        <p>
          <RouterLink to="/<%= name %>/page">
            <Button>My Page</Button>
          </RouterLink>
        </p>
      </Paper>
  );
};
