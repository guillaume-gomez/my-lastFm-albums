import React from 'react';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import DataRangeComponent from "./DataRangeComponent";
import UserActions from "./UserActions";

import { UserReducerState } from "../reducers/userReducer";

interface MenuAppBarInterface {
  user: UserReducerState;
  onChangeUser: (username: string) => void;
  onChangeDate: () => void;
}

function MenuAppBar({ user, onChangeUser, onChangeDate } : MenuAppBarInterface) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container direction="row" alignItems="center" justifyContent="space-between">
          <Grid item>
            <DataRangeComponent onChange={onChangeDate} />
          </Grid>
          <Grid item>
            <UserActions user={user} onChange={onChangeUser} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}


export default MenuAppBar;