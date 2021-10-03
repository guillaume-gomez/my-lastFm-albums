import React from "react";
import Typography from '@material-ui/core/Typography';

interface ErrorMessageInterface {
  message: string;
}

function ErrorMessage({ message } : ErrorMessageInterface) {
  return <Typography  color="error">{message}</Typography>
};

export default ErrorMessage;
