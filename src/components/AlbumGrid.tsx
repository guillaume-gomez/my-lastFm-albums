import React from "react";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import AlbumCard from "./AlbumCard";


interface AlbumsInterface {
  albums?: any;
}

function AlbumsGrid({ albums } : AlbumsInterface) {
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
      { albums.payload.map((album: any, index: number) => {
          return (
            <Grid key={index} item xs={3} xl={2} style={{height: "100%"}}>
              <AlbumCard key={index} album={album}/>
            </Grid>
          );
        })
      }
    </Grid>
  );

};

export default AlbumsGrid;