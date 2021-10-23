import React from "react";
import { format } from 'date-fns';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import AlbumGrid from "./AlbumGrid";

import { chunkInterface } from "../reducers/lastFmReducer";


interface AlbumsInterface {
  chunks?: chunkInterface[];
}

function AlbumChunk({ chunks } : AlbumsInterface) {
  function appendData() {
    /*const { lasfmQueryWeekAlbum, lastFm } = this.props;
    const lastChunk = lastFm.data[lastFm.data.length - 1];
    const { from } = lastChunk;
    const newTo = from - 1;
    const newFrom = newTo - (7 * 60 * 60 * 24);
    lasfmQueryWeekAlbum(defaultUser, newFrom, newTo);*/
  }



  if(!chunks || chunks.length === 0) {
    return (
    <Grid container={true} justifyContent="center" alignItems="center">
      <CircularProgress size={120}/>
    </Grid>);
  }
  else {
    const chunksDom = chunks.map((chunk : chunkInterface, index: number) => 
      (<div key={index}>
         <Grid container={true} justifyContent="center" alignItems="center" direction="column">
            <Button onClick={appendData} variant="outlined" color="primary" aria-label="Add" style={{margin: 20}}>
              {<AddIcon />}
            </Button>
            <Box padding="1rem">
              <Typography component="h4">
                {format(parseInt(chunk.from, 10) * 1000, "dd/MM/yyyy")} - {format(parseInt(chunk.to, 10) * 1000, "dd/MM/yyyy")}
              </Typography>
            </Box>
          </Grid>
        <AlbumGrid key={index} albums={chunk.payload} />
      </div>)
    );
    return <>{chunksDom}</>;
  }


};


const mapStateToProps = (store : any) => {
  return ({
    chunks: store.lastFm.data
  });
};

const mapDispatchToProps = (dispatch :any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumChunk);
