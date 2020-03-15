import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import DataRangeComponent from "./DataRangeComponent";
import UserActions from "./UserActions";

const styles = {
};

class MenuAppBar extends React.Component {

  render() {
    const { user, dateRange, fromChange, toChange, updateRangeDate } = this.props;
    return (
        <AppBar position="static">
          <Toolbar>
            <Grid item style={{ width: "25%" }}>
              <DataRangeComponent dateRange={dateRange} fromChange={fromChange} toChange={toChange} submitHandler={updateRangeDate}/>
            </Grid>
            <Grid item style={{ width: "65%"}}>
              <IconButton  color="inherit" aria-label="Menu">
              </IconButton>
            </Grid>
            <Grid item style={{ width: "10%"}}>
              <UserActions user={user} />
            </Grid>
          </Toolbar>
        </AppBar>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);