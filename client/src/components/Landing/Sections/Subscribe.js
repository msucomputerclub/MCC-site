import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";


const styles={

}

function Subscribe(props) {
    const { classes } = props;
    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
        <Grid item>
        <p>HelloWorld</p>
        </Grid>
        <Grid item>
        <p>HelloWorld2</p>
        </Grid>
        </Grid>
    )}

Subscribe.propTypes = {
    classes: PropTypes.object.isRequired
    };
    
    export default withStyles(styles)(Subscribe);