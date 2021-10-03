import React, { Component } from 'react';
import moment from "moment";
// import PropTypes from "prop-types";
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';

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
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
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
    this.getDateRange = this.getDateRange.bind(this);
    this.updateFrom = this.updateFrom.bind(this);
    this.updateTo = this.updateTo.bind(this);
    this.updateRangeDate = this.updateRangeDate.bind(this);
  }

  updateFrom(newDate) {
    console.log(newDate)
  }

  updateTo(newDate) {
    console.log(newDate)
  }

  updateRangeDate(from, to) {
    console.log(from, "=>", to);

    const startWeek = moment(from);
    const endWeek = moment(to);
    const nbWeeks = endWeek.diff(startWeek, 'weeks');
    const weeks = [];
    
    let newTo = to / 1000;
    let newFrom = from / 1000;
    for(let i = 0; i < nbWeeks; i++) {
      weeks.push({from: newFrom, to: newTo});
      newTo = newFrom - 1;
      newFrom = newTo - (7 * 60 * 60 * 24);
    }
    const { lasfmQueryWeeksAlbum } = this.props;
    lasfmQueryWeeksAlbum(defaultUser, weeks);
  }

  renderError() {
    const { error } = this.props.lastFm;
    if(error) {
      return <p style={{color: "red"}}>{error}</p>;
    }

    if(this.props.albumsInfos.error) {
      return <p style={{color: "red"}}>{this.props.albumsInfos.error}</p>;
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

  appendData() {
    const { lasfmQueryWeekAlbum, lastFm } = this.props;
    const lastChunk = lastFm.data[lastFm.data.length - 1];
    const { from } = lastChunk;
    const newTo = from - 1;
    const newFrom = newTo - (7 * 60 * 60 * 24);
    lasfmQueryWeekAlbum(defaultUser, newFrom, newTo);
  }

  getDateRange() {
    const { lastFm } = this.props;
    if(lastFm.data.length === 0) {
      return { from: null, to: null};
    }
    const firstChunk = lastFm.data[0];
    const lastChunk = lastFm.data[lastFm.data.length - 1];
    const { from } = lastChunk;
    const { to } = firstChunk;
    return { from: (from * 1000), to: (to * 1000) };
  }

  renderData() {
    const { classes } = this.props;
    const { data } = this.props.lastFm;
    if(!data || data.length === 0) {
      return (
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress className={classes.progress} size={50} style={{padding: 40}} />
        </Grid>
      );
    }

    const chunks = data.map((chunk, i) => {
      const fromDate = moment(1000 * chunk.from);
      const toDate = moment(1000 * chunk.to);
      return (
        <React.Fragment key={i}>
          <Grid container justifyContent="center" alignItems="center" direction="column" padding="3rem">
            <Button onClick={this.appendData} variant="outlined" color="primary" aria-label="Add" className={classes.fab} style={{margin: 20}}>
              <AddIcon />
            </Button>
            <Box padding="1rem">
              <Typography variant="headline" component="h4">
                {fromDate.format("DD/MM/YYYY")} - {toDate.format("DD/MM/YYYY")}
              </Typography>
            </Box>
          </Grid>
          <Grid container spacing={4} justifyContent="center">
            {
              chunk.payload.map((item, index) => {
                return (
                  <Grid item xs={3} xl={2} style={{height: "100%"}}>
                    <AlbumCard key={index} album={this.aggregateAlbumData(item)}/>
                  </Grid>
                );
              })
            }
          </Grid>
        </React.Fragment>
      );
    });
    return chunks;
  }

  render() {
    const { user, classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid className="App-header" container direction="column" justifyContent="center" alignItems="center">
          <img src={logo} className="App-logo animated pulse infinite delay-10s" alt="logo" />
          <h1 className="App-title animated bounce delay-10s">My albums list</h1>
        </Grid>
        <MenuAppBar user={user} onChangeUser={(user) => this.props.fetchUser(user)} dateRange={this.getDateRange()} fromChange={this.updateFrom} toChange={this.updateTo} updateRangeDate={this.updateRangeDate} />
        <Container maxWidth="xl">
          {this.renderError()}
          {this.renderData()}
        </Container>
        <Grid container>
          <Grid item xs={12}>
            <Footer className="App-footer">
            </Footer>
          </Grid>
        </Grid>
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
    fetchUser: (user) => dispatch(fetchUser(user)),
    lasfmQueryWeeksAlbum: (user, weeks) => dispatch(lasfmQueryWeeksAlbum(user, weeks))
  });
};

const styledComponent =  withStyles(styles)(App);
export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);