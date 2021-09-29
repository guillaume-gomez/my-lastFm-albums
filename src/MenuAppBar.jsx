import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import DataRangeComponent from "./DataRangeComponent";
import UserActions from "./UserActions";

const styles = {
};

function MenuAppBar({ user, dateRange, fromChange, toChange, updateRangeDate }) {
  return (
      <AppBar position="static">
        <Toolbar>
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <Grid item>
              <DataRangeComponent dateRange={dateRange} fromChange={fromChange} toChange={toChange} submitHandler={updateRangeDate}/>
            </Grid>
            <Grid item>
              <UserActions user={user} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
  );
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);