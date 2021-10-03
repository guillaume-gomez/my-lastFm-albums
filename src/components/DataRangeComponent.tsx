import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

/* eslint-disable */
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
// pick utils
import DateFnsUtils from '@date-io/date-fns';

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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
        </MuiPickersUtilsProvider>
      </Grid>
    </Box>
  );
}

export default DataRangeComponent;