import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper variant="outlined">
        <h1>Hello from <%= name %>!</h1>
        <h2>Home</h2>
        <p>
          <RouterLink to="/<%= name %>/page">
            <Button bsStyle="primary">My Page</Button>
          </RouterLink>
        </p>
      </Paper>
    </div>
  );
};
