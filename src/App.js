import React, { Component } from 'react';
// import PropTypes from "prop-types";
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';

import { lasfmQueryWeekAlbum, fetchUser } from "./actions/lastFmActions";

import MenuAppBar from "./MenuAppBar";
import AlbumCard from "./AlbumCard";

import logo from './logo.svg';
import './App.css';

const defaultUser ="musirama";


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


class App extends Component {

  constructor(props) {
    super(props);
    this.props.lasfmQueryWeekAlbum(defaultUser);
    this.props.fetchUser(defaultUser);

    this.renderError = this.renderError.bind(this);
    this.renderData = this.renderData.bind(this);
    this.appendData = this.appendData.bind(this);
    this.aggregateAlbumData = this.aggregateAlbumData.bind(this);
  }

  renderError() {
    const { error } = this.props.lastFm;
    if(error) {
      return <p style={{color: "red"}}>{error}</p>;
    }
    return null;
  }

  aggregateAlbumData(albumFromStore) {
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

  renderData() {
    const { classes } = this.props;
    const { data } = this.props.lastFm;
    if(!data || data.length === 0) {
      return (
        <Grid container justify="center" alignItems="center">
          <CircularProgress className={classes.progress} size={50} style={{padding: 40}} />
        </Grid>
      );
    }
    const chunks = data.map((chunk, i) => {
      return (
        <Paper key={i * chunk.from} className={classes.root} elevation={5}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="headline" component="h5">
                {chunk.from} - {chunk.to}
              </Typography>
            </Grid>
            {
              chunk.payload.map((d, j) => (
                  <Grid item xs={3} style={{padding: 10}} key={chunk.from * j} >
                    <AlbumCard album={this.aggregateAlbumData(d)}/>
                  </Grid>
                )
              )
            }
          </Grid>
        </Paper>
      );
    });
    return chunks;
  }

  appendData() {
    const { lasfmQueryWeekAlbum, lastFm } = this.props;
    const lastChunk = lastFm.data[lastFm.data.length - 1];
    const { from } = lastChunk;
    const newTo = from - 1;
    const newFrom = newTo - (7 * 60 * 60 * 24);
    lasfmQueryWeekAlbum(defaultUser, newFrom, newTo);
  }

  render() {
    const { user, classes } = this.props;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">My albums list</h1>
          </header>
          <div>
            <MenuAppBar user={user}/>
            {this.renderError()}
            <Grid container spacing={24} direction="row">
              <div>
              <Button onClick={this.appendData} variant="fab" color="primary" aria-label="Add" className={classes.button} style={{margin: 20}}>
                <AddIcon />
              </Button>
              </div>
              {this.renderData()}
            </Grid>
          </div>
        </div>
    </div>
    );
  }
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
    fetchUser: (user) => dispatch(fetchUser(user))
  });
};

const styledComponent =  withStyles(styles)(App);
export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);