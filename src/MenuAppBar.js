import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import DataRangeComponent from "./DataRangeComponent";
import ImageAvatars from "./ImageAvatars";

const styles = {
};

class MenuAppBar extends React.Component {

  helloUser = () => {
    const { user } = this.props;
    if(!user.user) {
      return null;
    }
    return (
      <Typography variant="inherit" style={{ color: "white" }}>
        <b>{user.user.name}</b>
      </Typography>
    );
  }

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
              {user && (
                <div>
                  <ImageAvatars user={user}/>
                </div>
              )}
              <Typography variant="body1" color="inherit">
                {this.helloUser()}
              </Typography>
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