import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Stack
      sx={{
        p: "1rem",
        bgcolor: '#222222',
      }}
      direction="column"
      alignItems="center"
    >
      <Typography>
        Made by <a style={{color: "#fafafa"}} href="https://github.com/guillaume-gomez">Guillaume Gomez</a>, 2018-2024
      </Typography>
      <Typography>
        <i>
          Lastfm icon from <a style={{color: "#fafafa"}} href="https://www.flaticon.com/authors/pixel-buddha">Pixel Buddha</a>
        </i>
      </Typography>
    </Stack>
  );
};

export default Footer;