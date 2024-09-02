import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AlbumIcon from '@mui/icons-material/Album';
import MicIcon from '@mui/icons-material/Mic';
import HearingIcon from '@mui/icons-material/Hearing';

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
    <Card sx={{border: "2px solid #444", backgroundColor: "#555"}}>
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