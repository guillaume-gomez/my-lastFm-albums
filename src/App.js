import React, { Component } from 'react';
// import PropTypes from "prop-types";
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import { lasfmQuery, fetchUser } from "./actions/lastFmActions";

import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.props.lasfmQuery();
    this.props.fetchUser("musirama");

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
        <div>
          <h5 key={i}>{chunk.from} - {chunk.to}</h5>
          <ul>
          {
            chunk.payload.map((d, j) => (<li key={j}>{d.artist["#text"]} / {d.name} : #{d.playcount}</li>))
          }
          </ul>
        </div>
      );
    });
    return chunks;
  }

  appendData() {
    const { lasfmQuery, lastFm } = this.props;
    const lastChunk = lastFm.data[lastFm.data.length - 1];
    const { from, to } = lastChunk;
    const newTo = from - 1;
    const newFrom = newTo - (7 * 60 * 60 * 24);
    lasfmQuery(newFrom, newTo);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My albums list</h1>
        </header>
        {this.renderError()}
        <div>
          <Button onClick={this.appendData} variant="contained" color="primary">More</Button>
          {this.renderData()}
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
    lasfmQuery: (from, to) => dispatch(lasfmQuery(from, to)),
    fetchUser: (user) => dispatch(fetchUser(user))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(App);