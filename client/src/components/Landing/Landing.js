import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import Intro from "./Sections/Intro";
import Subscribe from "./Sections/Subscribe"

import msucclogo from "../../images/ComputerClub_Logo.png";

const styles = {
  root: {},
  gridItem: {},
  intro: {
    margin: "2em"
  },
  grid: {},
  typo: {}
};

function Landing(props) {
  const { classes } = props;
  return (
        <div className="col-12 justify conent middle">
        <Intro />
        <Subscribe />
        </div>

  );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
