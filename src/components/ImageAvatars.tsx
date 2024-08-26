import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

function ImageAvatars({ classes, user } : ImageAvatarsInterface) {
  if(!user.user) {
    return null;
  }
  const photo = user.user.image[0];
  return (
    <Grid container={true} justifyContent="center">
      <Avatar alt={user.user.name} src={photo["#text"]} />
    </Grid>
  );
}


export default ImageAvatars;