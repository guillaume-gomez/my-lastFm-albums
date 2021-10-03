import React from "react";
import Typography from '@material-ui/core/Typography';

interface ErrorMessage {
  message: string;
}

function ErrorMessage({ message } : ErrorMessage) {
  return <Typography  color="error">{message}</Typography>
};

export default ErrorMessage;
