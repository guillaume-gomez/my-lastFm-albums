import React from "react";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//import AddIcon from '@material-ui/core/AddIcon';

import AlbumCard from "./AlbumCard";


interface AlbumsInterface {
  albums?: any;
}

function AlbumsGrid({ albums } : AlbumsInterface) {

  
/*  function aggregateAlbumData(albumFromStore: any) {
    const { albumsInfos } = this.props;
    const { albums } = albumsInfos;
    if(!albums || albums.length === 0) {
      return albumFromStore;
    }
    const albumData = albums.find((album) => albumFromStore.name === album.name && albumFromStore.artist["#text"] === album.artist);
    if(!albumData) {
      return albumFromStore;
    }
    return Object.assign({}, albumFromStore, { cover: albumData.image[3] });
  }
*/
 /* function appendData() {
    const { lasfmQueryWeekAlbum, lastFm } = this.props;
    const lastChunk = lastFm.data[lastFm.data.length - 1];
    const { from } = lastChunk;
    const newTo = from - 1;
    const newFrom = newTo - (7 * 60 * 60 * 24);
    lasfmQueryWeekAlbum(defaultUser, newFrom, newTo);
  }

  function getDateRange() {
    const { lastFm } = this.props;
    if(lastFm.data.length === 0) {
      return { from: null, to: null};
    }
    const firstChunk = lastFm.data[0];
    const lastChunk = lastFm.data[lastFm.data.length - 1];
    const { from } = lastChunk;
    const { to } = firstChunk;
    return { from: (from * 1000), to: (to * 1000) };
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

  return albums.map((chunk : any, i: number) => {
    //const fromDate = moment(1000 * chunk.from);
    //const toDate = moment(1000 * chunk.to);
    return (
      <React.Fragment key={i}>
        {/*<Grid container={true} justifyContent="center" alignItems="center" direction="column" padding="3rem">
          <Button onClick={this.appendData} variant="outlined" color="primary" aria-label="Add" className={classes.fab} style={{margin: 20}}>
            {<AddIcon />}
          </Button>
          <Box padding="1rem">
            <Typography variant="headline" component="h4">
              {fromDate.format("DD/MM/YYYY")} - {toDate.format("DD/MM/YYYY")}
            </Typography>
          </Box>
        </Grid>*/}
        <Grid container={true} spacing={4} justifyContent="center">
          {
            chunk.payload.map((item: any, index: number) => {
              return (
                <Grid item xs={3} xl={2} style={{height: "100%"}}>
                  <AlbumCard key={index} album={item}/>
                </Grid>
              );
            })
          }
        </Grid>
      </React.Fragment>
    );
  });
};

export default AlbumsGrid;