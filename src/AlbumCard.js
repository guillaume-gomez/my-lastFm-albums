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
   
};

function AlbumCard(props) {
  const { classes, album } = props;
  return (
    <Card style={{ height: "100%" }}>
      <CardMedia
        style={{ height: "60%" }}
        image={album.cover && album.cover["#text"] ? album.cover["#text"] : cover}
        title="Contemplative Reptile"
      />
      <CardContent style={{ height: "30%" }}>
        <Typography gutterBottom variant="h2">
          {album.artist["#text"]} - {album.name}
        </Typography>
        <Typography component="h5">
          Listen : {album.playcount}
        </Typography>
      </CardContent>
      <CardActions style={{ height: "10%", display:"flex", justifyItems: "flex-start", alignItems: "flex-end" }}>
        <Button size="small" color="primary" href={album.url} target="_blank">
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