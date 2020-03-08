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
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

class MenuAppBar extends React.Component {

  helloMessage = () => {
    const { user } = this.props;
    if(!user.user) {
      return null;
    }
    return (
      <Typography variant="inherit" style={{color: "white", border: "2px solid blue"}}>
        Hello <b>{user.user.name}</b>
      </Typography>
    );
  }

  render() {
    const { classes, user, dateRange, fromChange, toChange, updateRangeDate } = this.props;
    return (
      <Grid style={{ border: "2px solid orange" }}>
        <AppBar position="static" style={{ border: "2px solid red" }}>
          <Toolbar>
            <DataRangeComponent dateRange={dateRange} fromChange={fromChange} toChange={toChange} submitHandler={updateRangeDate}/>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            </IconButton>
            <Typography variant="body1" color="inherit" className={classes.flex}>
              {this.helloMessage()}
            </Typography>
            {user && (
              <div>
                <ImageAvatars user={user}/>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Grid>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);