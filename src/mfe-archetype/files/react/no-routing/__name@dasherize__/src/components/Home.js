import React from "react";
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
      </Paper>
    </div>
  );
};
