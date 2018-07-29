import React from "react";
import cx from "classnames";

// material-ui components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

function Footer({ ...props }) {
  const { children, className } = props;
  return (
    <footer className={className}>
      <p>
        Made by <a href="https://github.com/guillaume-gomez">Guillaume Gomez</a>, 2018
      </p>
      <p>
        <i>
          Lastfm icon from <a href="https://www.flaticon.com/authors/pixel-buddha">Pixel Buddha</a>
        </i>
      </p>
    </footer>
  );
}


export default Footer;
