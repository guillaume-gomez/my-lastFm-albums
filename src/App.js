import React, { Component } from 'react';
// import PropTypes from "prop-types";
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import { lasfmQueryWeekAlbum, fetchUser } from "./actions/lastFmActions";

import MenuAppBar from "./MenuAppBar";
import AlbumCard from "./AlbumCard";

import logo from './logo.svg';
import './App.css';

const defaultUser ="musirama";

class App extends Component {

  constructor(props) {
    super(props);
    this.props.lasfmQueryWeekAlbum(defaultUser);
    this.props.fetchUser(defaultUser);

    this.renderError = this.renderError.bind(this);
    this.renderData = this.renderData.bind(this);
    this.appendData = this.appendData.bind(this);
  }

  renderError() {
    const { error } = this.props.lastFm;
    if(error) {
      return <p style={{color: "red"}}>{error}</p>;
    }
    return null;
  }

  renderData() {
    const { data } = this.props.lastFm;
    if(!data) {
      return null;
    }

    const chunks = data.map((chunk, i) => {
      return (
        <div key={i}>
          <h5>{chunk.from} - {chunk.to}</h5>
          {
            chunk.payload.map((d, j) => (
              <AlbumCard key={chunk.from * j} album={d}/>
              )
            )
          }
        </div>
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
    const { user } = this.props;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">My albums list</h1>
          </header>
          <MenuAppBar user={user}/>
            {this.renderError()}
            <div>
              <Button onClick={this.appendData} variant="contained" color="primary">More</Button>
              {this.renderData()}
            </div>
        </div>
    </div>
    );
  }
};

const mapStateToProps = (store) => {
  return ({
    lastFm: store.lastFm,
    user: store.user
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    lasfmQueryWeekAlbum: (user, from, to) => dispatch(lasfmQueryWeekAlbum(user, from, to)),
    fetchUser: (user) => dispatch(fetchUser(user))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(App);