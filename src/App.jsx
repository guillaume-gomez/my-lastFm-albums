import React, { Component, useEffect } from 'react';
import { format, differenceInWeeks } from 'date-fns';
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';


import { withStyles } from '@material-ui/core/styles';

import { splitToCreateRow } from './helperFunctions';

import { lasfmQueryWeekAlbum, fetchUser, lasfmQueryWeeksAlbum } from "./actions/lastFmActions";

import MenuAppBar from "./MenuAppBar";
import AlbumCard from "./AlbumCard";
import Footer from "./Footer";

import logo from './lastfm.svg';
import '../node_modules/animate.css/animate.min.css'
import './App.css';

const defaultUser = "musirama";


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});


function App(props) {

  useEffect( () => {
    props.lasfmQueryWeekAlbum(defaultUser);
    props.fetchUser(defaultUser);
  }, []);

  // todo 
  // const memoizedCallback = useCallback(
  //   () => {
  //     aggregateAlbumData(data);
  //   },
  //   [props.data],
  // );

  function updateFrom(newDate) {
    console.log(newDate)
  }

  function updateTo(newDate) {
    console.log(newDate)
  }

  function updateRangeDate(from, to) {
    console.log(from, "=>", to);

    const startWeek = new Date(from);
    const endWeek = new Date(to);
    const nbWeeks = differenceInWeeks(startWeek, endWeek);
    const weeks = [];
    
    let newTo = to / 1000;
    let newFrom = from / 1000;
    for(let i = 0; i < nbWeeks; i++) {
      weeks.push({from: newFrom, to: newTo});
      newTo = newFrom - 1;
      newFrom = newTo - (7 * 60 * 60 * 24);
    }
    const { lasfmQueryWeeksAlbum, lasfmQueryWeekAlbum } = props;
    lasfmQueryWeeksAlbum(defaultUser, weeks);
  }

  function renderError() {
    const { error } = props.lastFm;
    if(error) {
      return <p style={{color: "red"}}>{error}</p>;
    }

    if(props.albumsInfos.error) {
      return <p style={{color: "red"}}>{props.albumsInfos.error}</p>;
    }

    return null;
  }

  function aggregateAlbumData(albumFromStore) {
    const { albumsInfos } = props;
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

  function appendData() {
    const { lasfmQueryWeekAlbum, lastFm } = props;
    const lastChunk = lastFm.data[lastFm.data.length - 1];
    const { from } = lastChunk;
    const newTo = from - 1;
    const newFrom = newTo - (7 * 60 * 60 * 24);
    lasfmQueryWeekAlbum(defaultUser, newFrom, newTo);
  }

  function getDateRange() {
    const { lastFm } = props;
    if(lastFm.data.length === 0) {
      return { from: null, to: null};
    }
    const firstChunk = lastFm.data[0];
    const lastChunk = lastFm.data[lastFm.data.length - 1];
    const { from } = lastChunk;
    const { to } = firstChunk;
    return { from: (from * 1000), to: (to * 1000) };
  }

  function formRow(rowItems) {
    return (
      <React.Fragment>
        {
          rowItems.map((item, index) => (
            <Grid item sm={3} key={index} style={{ padding: "1rem" }}>
              <AlbumCard album={aggregateAlbumData(item)}/>
            </Grid>
          ))
        }
      </React.Fragment>
    );
  }


  function renderData() {
    const { classes } = props;
    const { data } = props.lastFm;
    if(!data || data.length === 0) {
      return (
        <Grid container justify="center" alignItems="center">
          <CircularProgress className={classes.progress} size={50} style={{padding: 40}} />
        </Grid>
      );
    }
    const chunks = data.map((chunk, i) => {
      const fromDate = new Date(1000 * chunk.from);
      const toDate = new Date(1000 * chunk.to);
      return (
        <React.Fragment key={i}>
          <Grid container item justify="center">
            <Typography variant="h6" component="h4">
              {format(fromDate, "yyyy/MM/dd")} - {format(toDate, "yyyy/MM/dd")}
            </Typography>
          </Grid>
          <Grid container item justify="center" style={{ padding: "1rem", border: "2px solid red" }}>
            {
              chunk.payload.map( (item, index) => (
                <Grid item container key={index} style={{ height: "30rem", width: "25%", padding: "1rem", border: "2px solid green" }}>
                  <AlbumCard album={aggregateAlbumData(item)}/>
                </Grid>
              ))
            }
          </Grid>
        </React.Fragment>
      );
    });
    return chunks;
  }

  const { user } = props;
  return (
    <Grid>
      <Grid item className="App">
        <header className="App-header">
          <img src={logo} className="App-logo animated pulse infinite delay-10s" alt="logo" />
          <h1 className="App-title animated bounce delay-10s">My albums list</h1>
        </header>
        <Grid>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <MenuAppBar user={user} dateRange={getDateRange()} fromChange={updateFrom} toChange={updateTo} updateRangeDate={updateRangeDate} />
          </MuiPickersUtilsProvider>
          {renderError()}
            <Grid item>
              <Button onClick={appendData} variant="outlined" size="medium" color="primary" style={{margin: 20}}>
                <AddIcon />
              </Button>
            </Grid>

            <Grid container justify="center" style={{ width: "100vw", padding: "0rem 10rem"}}>
              {renderData()}
            </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Footer className="App-footer">
          </Footer>
        </Grid>
      </Grid>
  </Grid>
  );
};

const mapStateToProps = (store) => {
  return ({
    lastFm: store.lastFm,
    user: store.user,
    albumsInfos: store.albumsInfos
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    lasfmQueryWeekAlbum: (user, from, to) => dispatch(lasfmQueryWeekAlbum(user, from, to)),
    fetchUser: (user) => dispatch(fetchUser(user)),
    lasfmQueryWeeksAlbum: (user, weeks) => dispatch(lasfmQueryWeeksAlbum(user, weeks))
  });
};

const styledComponent = withStyles(styles)(App);
export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);