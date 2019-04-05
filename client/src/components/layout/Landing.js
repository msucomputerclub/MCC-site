import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const styles = {
  gridItem: {},
  grid: {
    height: "100vh"
  },
  typo: {
    verticalAlign: "middle"
  }
};

function Landing(props) {
  const { classes } = props;
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.grid}
      xs={12}
    >
      <Grid item className={classes.gridItem}>
        <Typography className={classes.typo} align="center" variant="h2">
          Montclair State University
        </Typography>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography className={classes.typo} align="center" variant="h2">
          Computer Club
        </Typography>
      </Grid>
    </Grid>
  );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
