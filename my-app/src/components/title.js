import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
    color: theme.palette.background.dark,
    marginBottom: "20px",
  },
}));

export default function Title(props) {
  const classes = useStyles();
  return (
    <Typography
      className={classes.title}
      component="h1"
      variant="h5"
      color="primary"
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
