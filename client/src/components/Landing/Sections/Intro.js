import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import msucclogo from "../../../images/ComputerClub_Logo.png";

const styles = {
    root:{
        paddingTop:"4em",
        paddingBottom:"4em"
    }
  };

function Intro(props) {
    const { classes } = props;
    return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.root}
          xs={12}
        >
          <Grid item className={classes.sub} xs={6}>
            <img style={{ width: "100%" }} src={msucclogo} alt={"computer club logo"} />
            <Typography className={classes.typo} align="center" variant="h4">
              Montclair State University
            </Typography>
          </Grid>
          <Grid item className={classes.sub} xs={6}>
            <Typography className={classes.typo} align="center" variant="h4">
              Computer Club
            </Typography>
          </Grid>
        </Grid>
    );
  }
  
  Intro.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(Intro);
  