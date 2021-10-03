import React from "react";
import { format } from 'date-fns';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import AlbumGrid from "./AlbumGrid";


interface AlbumsInterface {
  data?: any;
}

function AlbumChunk({ data } : AlbumsInterface) {

  function aggregateAlbumData(albumFromStore: any) {
    /*const { albumsInfos } = this.props;
    const { albums } = albumsInfos;
    if(!albums || albums.length === 0) {
      return albumFromStore;
    }
    const albumData = albums.find((album) => albumFromStore.name === album.name && albumFromStore.artist["#text"] === album.artist);
    if(!albumData) {
      return albumFromStore;
    }
    return Object.assign({}, albumFromStore, { cover: albumData.image[3] });*/
  }

  function appendData() {
    /*const { lasfmQueryWeekAlbum, lastFm } = this.props;
    const lastChunk = lastFm.data[lastFm.data.length - 1];
    const { from } = lastChunk;
    const newTo = from - 1;
    const newFrom = newTo - (7 * 60 * 60 * 24);
    lasfmQueryWeekAlbum(defaultUser, newFrom, newTo);*/
  }

  function getDateRange() {
   /* const { lastFm } = this.props;
    if(lastFm.data.length === 0) {
      return { from: null, to: null};
    }
    const firstChunk = lastFm.data[0];
    const lastChunk = lastFm.data[lastFm.data.length - 1];
    const { from } = lastChunk;
    const { to } = firstChunk;
    return { from: (from * 1000), to: (to * 1000) };*/
  }


  return data.map((chunk : any, index: number) => {
    return (
      <div key={index}>
         <Grid container={true} justifyContent="center" alignItems="center" direction="column">
            <Button onClick={appendData} variant="outlined" color="primary" aria-label="Add" style={{margin: 20}}>
              {<AddIcon />}
            </Button>
            <Box padding="1rem">
              <Typography component="h4">
                {format(chunk.from * 1000, "dd/MM/yyyy")} - {format(chunk.to * 1000, "dd/MM/yyyy")}
              </Typography>
            </Box>
          </Grid>
        <AlbumGrid key={index} albums={chunk} />
      </div>
    );
  });
};

export default AlbumChunk;