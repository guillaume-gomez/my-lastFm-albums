import React, { useEffect } from 'react';
import logo from './lastfm.svg';
import './App.css';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Footer from "./components/Footer";
import ErrorMessage  from "./components/ErrorMessage";
import MenuAppBar from "./components/MenuAppBar";
import AlbumChunk from "./components/AlbumChunk";

import { connect } from 'react-redux';
import { lasfmQueryWeekAlbum, fetchUser, lasfmQueryWeeksAlbum } from "./actions/lastFmActions";

const defaultUser = "musirama";

interface AppInterface {
  user: any;
  lastFm: any;
  albumsInfos: any;
  fetchUser: any;
  lasfmQueryWeekAlbum: any;
}

function App({ user, lastFm, albumsInfos, fetchUser, lasfmQueryWeekAlbum } : AppInterface) {
  console.log(lastFm)

  useEffect(() => {
    lasfmQueryWeekAlbum(defaultUser);
    fetchUser(defaultUser)
  }, [lasfmQueryWeekAlbum, fetchUser]);

  function getDateRange() {
    
  }

  function updateFrom() {

  }

  function updateTo() {

  }

  function updateRangeDate() {
  }

  function renderError() {
    const { error: ApiError } = lastFm;
    if(ApiError) {
      return <ErrorMessage message={ApiError} />
    }

    const { error: albumsError } = albumsInfos;
    if(albumsError) {
      return <ErrorMessage message={albumsError} />
    }

    const { error: userError } = user;
    if(userError) {
      return <ErrorMessage message={userError.message} />
    }

    return <></>
  }

  return (
    <div>
      <Grid className="App-header" container direction="column" justifyContent="center" alignItems="center">
        <img src={logo} className="App-logo animated pulse infinite delay-10s" alt="logo" />
        <h1 className="App-title animated bounce delay-10s">My albums list</h1>
      </Grid>
      <MenuAppBar
        user={user}
        onChangeUser={(user: string) => fetchUser(user)}
        onChangeDate={updateRangeDate} />
      <Container maxWidth="xl">
        {renderError()}
        <AlbumChunk data={lastFm.data} />
      </Container>
      <Footer />
    </div>
  );
}


const mapStateToProps = (store : any) => {
  return ({
    lastFm: store.lastFm,
    user: store.user,
    albumsInfos: store.albumsInfos
  });
};

const mapDispatchToProps = (dispatch :any) => {
  return ({
    lasfmQueryWeekAlbum: (user : any, from: any, to :any) => dispatch(lasfmQueryWeekAlbum(user, from, to)),
    fetchUser: (user : string) => dispatch(fetchUser(user)),
    lasfmQueryWeeksAlbum: (user :any, weeks : any) => dispatch(lasfmQueryWeeksAlbum(user, weeks))
  });
};

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
