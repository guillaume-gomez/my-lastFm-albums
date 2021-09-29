import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AlbumIcon from '@material-ui/icons/Album';
import MicIcon from '@material-ui/icons/Mic';
import HearingIcon from '@material-ui/icons/Hearing';

import cover from './default-release-cd.png';

const styles = {
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

function AlbumCard({classes, album}) {
  function renderIconAndInfo(icon, info) {
    return (
      <Grid container alignItems="center">
        <Grid item xs={2}>
          {icon}
        </Grid>
        <Grid item xs={10}>
          <Typography noWrap component="p">
            {info}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={album.cover && album.cover["#text"] ? album.cover["#text"] : cover}
        title="Contemplative Reptile"
      />
      <CardContent>
        {renderIconAndInfo(<MicIcon />, album.artist["#text"])}
        {renderIconAndInfo(<AlbumIcon />, album.name)}
        {renderIconAndInfo(<HearingIcon />, album.playcount)}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={album.url}>
          Show on last fm
        </Button>
      </CardActions>
    </Card>
  );
}

AlbumCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlbumCard);