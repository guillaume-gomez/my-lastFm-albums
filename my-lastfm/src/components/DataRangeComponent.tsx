import React, { useState } from 'react';
import Button from '@mui/material/Button';
import NavigationIcon from '@mui/icons-material/Navigation';
import Grid from '@mui/material/Grid';

import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

interface DataRangeComponentInterface {
  onChange: any;
}

function DataRangeComponent({ onChange }: DataRangeComponentInterface) {
  const [from, setFrom] = useState<Date>();
  const [to, setTo] = useState<Date>();

  function updateDataRange() {
    onChange(from, to);
  }

  return (
    <Box border="2px solid white" borderRadius="6px" padding="0.5rem">
      <Grid container item spacing={3} justifyContent="space-between" alignItems="center">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item>
            <DatePicker
              color="primary"
              id="date"
              label="from"
              value={from}
              format={"dd/MM/yyyy"}
              onChange={(value) => (console.log(value))}
              //InputLabelProps={{className: classes.textFieldDateLabel}}
              //InputProps={{className: classes.textFieldDate}}
            />
          </Grid>
          <Grid item>
            <DatePicker
              color="primary"
              id="date"
              label="to"
              format={"dd/MM/yyyy"}
              value={to}
              onChange={(value) => (console.log(value))}
              //InputLabelProps={{className: classes.textFieldDateLabel}}
              //InputProps={{className: classes.textFieldDate}}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" aria-label="Submit" onClick={updateDataRange}>
              <NavigationIcon/>
              Update
            </Button>
           </Grid>
        </LocalizationProvider>
      </Grid>
    </Box>
  );
}

export default DataRangeComponent;