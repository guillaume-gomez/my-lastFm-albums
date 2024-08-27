import React, { useState } from 'react';
import Button from '@mui/material/Button';
import NavigationIcon from '@mui/icons-material/Navigation';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';


import { LocalizationProvider } from '@mui/x-date-pickers';
// If you are using date-fns v3.x, please import the v3 adapter
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
    <Box sx={{
          backgroundColor: '#222222',
          borderRadius: 2,
          p: "0.5rem"
        }}>
      <Stack direction="row" spacing={3} justifyContent="start" alignItems="center">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id="date"
              label="from"
              value={from}
              format={"dd/MM/yyyy"}
              onChange={(value) => (console.log(value))}
            />
            <DatePicker
              id="date"
              label="to"
              format={"dd/MM/yyyy"}
              value={to}
              onChange={(value) => (console.log(value))}
            />
            <Button
              variant="contained"
              color="secondary"
              aria-label="Submit"
              onClick={updateDataRange}
            >
              <NavigationIcon/>
              Update
            </Button>

        </LocalizationProvider>
      </Stack>
    </Box>
  );
}

export default DataRangeComponent;