import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export default () => {
  return (
    <Paper variant="outlined">
      <h1>My Page</h1>
      <p>
        <RouterLink to="/<%= name %>">
          <Button>Home</Button>
        </RouterLink>
      </p>
    </Paper>
  );
};
