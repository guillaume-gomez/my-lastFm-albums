import React from 'react';
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

import { AlbumInfo } from "../reducers/albumInfosReducer";

import defaultCover from '../default-release-cd.png';

interface AlbumCardInterface {
  album: any;
  cover: string | null;
}

function AlbumCard({ album , cover} : AlbumCardInterface) {

  function renderIconAndInfo(icon: any, info: any) {
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
    <Card>
      <CardMedia
        style={{
          height: 0,
          paddingTop: '56.25%', // 16:9
        }}
        image={cover ? cover : defaultCover}
        title={album.name}
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


export default React.memo(AlbumCard);