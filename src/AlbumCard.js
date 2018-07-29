import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import cover from './default-release-cd.png';

const styles = {
  card: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

function AlbumCard(props) {
  const { classes, album } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={album.cover && album.cover["#text"] ? album.cover["#text"] : cover}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {album.artist["#text"]} - {album.name}
          </Typography>
          <Typography component="p">
            Listen : {album.playcount}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" href={album.url}>
            Show on last fm
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

AlbumCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlbumCard);