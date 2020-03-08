import React, { Component } from 'react';
import moment from "moment";
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
    this.formRow = this.formRow.bind(this);
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
    const { lasfmQueryWeeksAlbum, lasfmQueryWeekAlbum } = this.props;
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
    console.log(newFrom)
    console.log(newTo)
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

  formRow(rowItems) {
    return (
      <React.Fragment>
        {
          rowItems.map((item, index) => (
            <Grid item sm={3} key={index} style={{ padding: "1rem" }}>
              <AlbumCard album={this.aggregateAlbumData(item)}/>
            </Grid>
          ))
        }
      </React.Fragment>
    );
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
      const fromDate = moment(1000 * chunk.from);
      const toDate = moment(1000 * chunk.to);
      const splittedArray = splitToCreateRow(chunk.payload, 4);
      return (
        <React.Fragment key={i}>
          <Grid container item justify="center">
            <Typography variant="h6" component="h4">
              {fromDate.format("DD/MM/YYYY")} - {toDate.format("DD/MM/YYYY")}
            </Typography>
          </Grid>
          <Grid container item justify="center" style={{ padding: "1rem" }}>
            {
              splittedArray.map( (rowItems, index) => (
                <Grid item container sm={12} key={index} style={{ height: "30rem" }}>
                  {this.formRow(rowItems)}
                </Grid>
              ))
            }
          </Grid>
        </React.Fragment>
      );
    });
    return chunks;
  }

  render() {
    const { user } = this.props;
    return (
      <Grid>
        <Grid item className="App">
          <header className="App-header">
            <img src={logo} className="App-logo animated pulse infinite delay-10s" alt="logo" />
            <h1 className="App-title animated bounce delay-10s">My albums list</h1>
          </header>
          <Grid>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <MenuAppBar user={user} dateRange={this.getDateRange()} fromChange={this.updateFrom} toChange={this.updateTo} updateRangeDate={this.updateRangeDate} />
            </MuiPickersUtilsProvider>
            {this.renderError()}
              <Grid item>
                <Button onClick={this.appendData} variant="outlined" size="medium" color="primary" style={{margin: 20}}>
                  <AddIcon />
                </Button>
              </Grid>

              <Grid container justify="center" style={{ width: "100vw", padding: "0rem 10rem"}}>
                {this.renderData()}
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