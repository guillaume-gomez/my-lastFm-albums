import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { lasfmQuery } from "./actions/lastFmActions";

import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.props.lasfmQuery();

    this.renderError = this.renderError.bind(this);
  }

  renderError() {
    const { error } = this.props.lastFm;
    if(error) {
      return <p style={{color: "red"}}>{error}</p>;
    }
    return null;
  }

  render() {
    const { error } = this.props.lastFm;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.renderError()}
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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