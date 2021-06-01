import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundSize: "cover",
  },
  buttton: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        titleTypographyProps={{variant: "inherit"}}
        subheaderTypographyProps={{variant: "inherit"}}
        avatar={
          <Avatar
            src="https://pbs.twimg.com/profile_images/922849160826470400/PWLsCRyX_400x400.jpg"
            className={classes.avatar}
          />
        }
        title="Supervielle"
        subheader="Home"
      />
      <CardMedia
        className={classes.media}
        image="https://bancosporinternet.com.ar/wp-content/uploads/2020/10/Banco-Supervielle-Home-Banking.jpg"
        title="Supervielle"
      />
      <CardContent>
        <Typography variant="inherit" color="textSecondary" component="p">
          Banco Supervielle es un entidad bancaria comercial de origen
          argentino, con sede en Buenos Aires. Supervielle surge de la fusión de
          Banco Banex y Société Générale de Argentina
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <RouterLink style={{ textDecoration: "none" }} to="/<%= name %>/page">
          <Button className={classes.buttton} variant="contained" size="small">
            Page
          </Button>
        </RouterLink>
      </CardActions>
    </Card>
  );
};
