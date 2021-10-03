import React from "react";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


function Footer() {
  return (
    <Box component="footer" bgcolor="#222222" padding="3rem" color="white">
      <Grid container={true} direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <p>
            Made by <a style={{color: "#fafafa"}} href="https://github.com/guillaume-gomez">Guillaume Gomez</a>, 2018-2021
          </p>
        </Grid>
        <Grid item>
          <p>
            <i>
              Lastfm icon from <a style={{color: "#fafafa"}} href="https://www.flaticon.com/authors/pixel-buddha">Pixel Buddha</a>
            </i>
          </p>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;