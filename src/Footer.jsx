import React from "react";

function Footer({ ...props }) {
  const { className } = props;
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
