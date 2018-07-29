import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

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
  },
};

class MenuAppBar extends React.Component {

  helloMessage = () => {
    const { user } = this.props;
    if(!user.user) {
      return null;
    }
    return (
      <p>
        Hello <b>{user.user.name}</b>
      </p>);
  }

  render() {
    const { classes, user } = this.props;
    const realname = user.user ? user.user.realname : null;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
            {this.helloMessage()}
            </Typography>
            {user && (
              <div>
                <ImageAvatars user={user}/>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);