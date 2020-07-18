import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

<<<<<<< HEAD:src/ImageAvatars.js
function ImageAvatars({classes, user}) {
=======
function ImageAvatars({user, classes}) {
>>>>>>> 02426bb099f7dd4ad8d5fa22dba890f7361ded9d:src/ImageAvatars.jsx
  if(!user.user) {
    return null;
  }
  const photo = user.user.image[0];
  return (
    <div className={classes.row}>
      <Avatar alt={user.user.name} src={photo["#text"]} className={classes.avatar} />
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);