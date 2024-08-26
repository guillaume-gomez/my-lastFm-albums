import React from "react";
import Typography from '@mui/material/Typography';

interface ErrorMessageInterface {
  message: string;
}

function ErrorMessage({ message } : ErrorMessageInterface) {
  return <Typography  color="error">{message}</Typography>
};

export default ErrorMessage;
