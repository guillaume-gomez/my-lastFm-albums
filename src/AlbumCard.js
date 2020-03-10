import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import cover from './default-release-cd.png';

function AlbumCard({album}) {
  if(album.name === "The Money Store")
    console.log(album.name)

  return (
    <Card style={{ height: "100%", border: "2px solid violet", width: "100%"}}>
      <CardMedia
        style={{ height: "60%"}}
        image={album.cover && album.cover["#text"] ? album.cover["#text"] : cover}
        title={album.name}
      />
      <CardContent style={{ height: "30%" }}>
        <Typography gutterBottom variant="h5">
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

function areEqual(prevProps, nextProps) {
  
  const result = prevProps.album.cover && nextProps.album.cover && prevProps.album.cover["#text"] === nextProps.album.cover["#text"]
  return result;
}

export default React.memo(AlbumCard, areEqual);