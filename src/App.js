import React, { Component } from 'react';
// import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { lasfmQuery } from "./actions/lastFmActions";

import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.props.lasfmQuery();

    this.renderError = this.renderError.bind(this);
    this.renderData = this.renderData.bind(this);
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
    return (
      <ul>
        {
          data.map((d, index) =><li key={index}>{d.artist["#text"]} / {d.name} : #{d.playcount}</li>)
        }
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My albums list</h1>
        </header>
        {this.renderError()}
        {this.renderData()}
      </div>
    );
  }
};

const mapStateToProps = (store) => {
  return ({
    lastFm: store.lastFm
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    lasfmQuery: () => dispatch(lasfmQuery()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(App);