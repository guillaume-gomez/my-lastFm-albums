import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

import ImageAvatars from "./ImageAvatars";

interface UserActionsInterface {
  user: any;
  onChange: any
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