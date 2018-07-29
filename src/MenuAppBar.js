import React from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

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
  textFieldDate: {
    color: "white"
  },
  textFieldDateLabel: {
    color: "white",
    shrink: true,
  }
};

class MenuAppBar extends React.Component {

  helloMessage = () => {
    const { user } = this.props;
    if(!user.user) {
      return null;
    }
    return (
      <Typography variant="headline" component="p" style={{color: "white"}}>
        Hello <b>{user.user.name}</b>
      </Typography>
    );
  }

  render() {
    const { classes, user, dateRange } = this.props;
    const { from, to } = dateRange;
    const formattedFrom = moment(from).format("YYYY-MM-DD");
    const formattedTo = moment(to).format("YYYY-MM-DD");
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <TextField
              color="white"
              id="date"
              label="from"
              type="date"
              value={formattedFrom}
              InputLabelProps={{className: classes.textFieldDateLabel}}
              InputProps={{className: classes.textFieldDate}}
            />
            <TextField
              id="date"
              label="to"
              type="date"
              value={formattedTo}
              onChange={(data) => {console.log(data.target.value)}}
              InputLabelProps={{className: classes.textFieldDateLabel}}
              InputProps={{className: classes.textFieldDate}}
            />
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