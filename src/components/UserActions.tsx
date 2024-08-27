import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import ImageAvatars from "./ImageAvatars";

import { UserReducerState } from "../reducers/userReducer";

interface UserActionsInterface {
  user: UserReducerState;
  onChange: (username: string) => void;
}

function UserActions({user, onChange } : UserActionsInterface) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const anchorRef = useRef(null);

  function renderUserInfo() {
    if(!user.user) {
      return <CircularProgress />;
    }

    return (
      <span>
        <div>
          <ImageAvatars user={user}/>
        </div>
        <Typography variant="inherit" style={{ color: "white" }}>
          <b>{user.user.name}</b>
        </Typography>
      </span>
    );
  }

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  };

  function handleClose() {
    if(anchorRef.current) {
      setOpen(false);
    }
  };

   function handleListKeyDown() {
  //   if (event.key === 'Tab') {
  //     event.preventDefault();
  //     setOpen(false);
  //   }
   }

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {renderUserInfo()}
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem>
                     <TextField
                      id="input-with-icon-textfield"
                      label="Username"
                      value={search}
                      onChange={(event) => { setSearch(event.target.value) } }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                     />
                     <Button color="primary" variant="contained" onClick={() => onChange(search)}>Search</Button>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}


export default UserActions;