import React from "react";
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { AlbumInterface } from "../reducers/lastFmReducer";
import { AlbumsInfoState, getCover } from "../reducers/albumInfosReducer";

//import ErrorMessage from "./ErrorMessage";
import AlbumCard from "./AlbumCard";
import Box from '@mui/material/Box';

interface AlbumsInterface {
  albums: AlbumInterface[];
  albumsInfos: AlbumsInfoState
}

function AlbumsGrid({ albums, albumsInfos } : AlbumsInterface) {
/*  const { error: apiError } = albumsInfos;
  if(apiError) {
    return <ErrorMessage message={apiError} />
  }*/

  if(!albums) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Box padding={"5rem"}>
          <CircularProgress size={200}/>
        </Box>
      </Grid>
    );
  }

  if(albums.length === 0) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Typography component="h2">
          No Scrobble for this week
        </Typography>
      </Grid>
    )
  }

  return (
    <Grid container={true} spacing={4} justifyContent="center">
      { albums.map((album: AlbumInterface, index: number) => {
          return (
            <Grid key={index} item xs={3} xl={2} style={{height: "100%"}}>
              <AlbumCard key={index} album={album} cover={getCover(albumsInfos, album.name, album.artist["#text"]) }/>
            </Grid>
          );
        })
      }
    </Grid>
  );

};

const mapStateToProps = (store : any) => {
  return ({
    albumsInfos: store.albumsInfos
  });
};

const mapDispatchToProps = () => {
  return ({
  });
};

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(AlbumsGrid);
