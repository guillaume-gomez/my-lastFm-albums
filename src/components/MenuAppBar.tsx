import React from 'react';
import Grid from '@mui/material/Grid';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import UserActions from "./UserActions";

import { UserReducerState } from "../reducers/userReducer";

import logo from '../assets/lastfm.svg';

interface MenuAppBarInterface {
  user: UserReducerState;
  onChangeUser: (username: string) => void;
}

function MenuAppBar({ user, onChangeUser, onChangeDate } : MenuAppBarInterface) {
  return (
    <AppBar
      position="static"
      color="primary"
      enableColorOnDark
    >
      <Toolbar
      >
        <Stack
          style={{ width: "100%"}}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >

            <img
              src={logo}
              style={{ width: 56, height: 56 }}
              className="animate__animated animate__pulse animate__infinite animate__slower"
              alt="logo"
            />
            <Typography
              variant="h3"
              component="h1"
              className="animate__animated animate__bounce animate__delay-1s"
            >
              LastFm Album List
            </Typography>
            <UserActions user={user} onChange={onChangeUser} />
        </Stack>

      </Toolbar>
    </AppBar>
  );
}


export default MenuAppBar;