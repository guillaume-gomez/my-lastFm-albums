import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Footer from "./components/Footer";
import ErrorMessage  from "./components/ErrorMessage";
import MenuAppBar from "./components/MenuAppBar";
import AlbumChunk from "./components/AlbumChunk";
import DataRangeComponent from "./components/DataRangeComponent";


import { connect } from 'react-redux';
import { lasfmQueryWeekAlbum, fetchUser, lasfmQueryWeeksAlbum } from "./actions/lastFmActions";

import { UserReducerState } from "./reducers/userReducer";
import { AlbumsInfoState } from "./reducers/albumInfosReducer";

// for vite, should be at the bottom to avoid issues
import Box from '@mui/material/Box';

const defaultUser = "musirama";

interface AppInterface {
  user: UserReducerState;
  lastFmError: string;
  fetchUser: (username: string) => void;
  lasfmQueryWeekAlbum: (username: string, from?: string, to?: string) => void;
}

function App({ user, lastFmError, fetchUser, lasfmQueryWeekAlbum } : AppInterface) {
  useEffect(() => {
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
    if(lastFmError) {
      return <ErrorMessage message={lastFmError} />
    }

    const { error: userError } = user;
    if(userError) {
      return <ErrorMessage message={userError} />
    }

    return <></>
  }

  return (
    <Stack>
      <MenuAppBar
        user={user}
        onChangeUser={(user: string) => fetchUser(user)}
       />
      <Box>
        <Container maxWidth="xl">
          <Grid item>
            <DataRangeComponent onChange={updateRangeDate} />
          </Grid>
          <Box minHeight="60vh" sx={{ py: 4 }}>
            <Grid justify="center">
              {renderError()}
            </Grid>
            <AlbumChunk/>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Stack>
  );
}


const mapStateToProps = (store : any) => {
  return ({
    lastFmError: store.lastFm.error,
    user: store.user
  });
};

const mapDispatchToProps = (dispatch :any) => {
  return ({
    lasfmQueryWeekAlbum: (username: string, from?: string, to?: string) => dispatch(lasfmQueryWeekAlbum(username, from, to)),
    fetchUser: (user : string) => dispatch(fetchUser(user)),
    lasfmQueryWeeksAlbum: (user :string, weeks : any) => dispatch(lasfmQueryWeeksAlbum(user, weeks))
  });
};

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
