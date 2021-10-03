import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

interface ImageAvatarsInterface {
  user: any;
  classes: any;
}

function ImageAvatars({ classes, user } : ImageAvatarsInterface) {
  if(!user.user) {
    return null;
  }
  const photo = user.user.image[0];
  return (
    <Grid container={true} justifyContent="center">
      <Avatar alt={user.user.name} src={photo["#text"]} className={classes.avatar} />
    </Grid>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);