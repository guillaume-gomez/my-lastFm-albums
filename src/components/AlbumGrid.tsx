import React from "react";
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AlbumInterface } from "../reducers/lastFmReducer";
import { AlbumsInfoState, getCover } from "../reducers/albumInfosReducer";

import AlbumCard from "./AlbumCard";

interface AlbumsInterface {
  albums: AlbumInterface[];
  albumsInfos: AlbumsInfoState
}

function AlbumsGrid({ albums, albumsInfos } : AlbumsInterface) {
  if(!albums) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Box padding={"5rem"}>
          <CircularProgress size={200}/>
        </Box>
      </Grid>
    );
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
