import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

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
    <Grid container className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.intro}
        xs={6}
      >
        <Grid item className={classes.sub}>
          <img style={{ width: "100%" }} src={msucclogo} />
          <Typography className={classes.typo} align="center" variant="h4">
            Montclair State University
          </Typography>
        </Grid>
        <Grid item className={classes.sub}>
          <Typography className={classes.typo} align="center" variant="h4">
            Computer Club
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.intro}
        xs={6}
      >
        <Grid item className={classes.sub}>
          <img style={{ width: "100%" }} className="fas fa-sync" />
          <Typography className={classes.typo} align="center" variant="h4">
            Montclair State University
          </Typography>
        </Grid>
        <Grid item className={classes.sub}>
          <Typography className={classes.typo} align="center" variant="h4">
            Computer Club
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
