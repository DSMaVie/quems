import { Snackbar } from '@material-ui/core';
import { AlertContext } from '../contexts/alert';
import React, { useContext, useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export const AlertSnackbar = () => {
  const alert = useContext(AlertContext);
  const nonEmptyAlert = alert.severity && alert.message;
  const [display, setDisplay] = useState(true);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={() => setDisplay(false)}
      open={nonEmptyAlert && display}
      key={alert.message}
      autoHideDuration={10000}
    >
      <Alert severity={alert.severity}>
        if (alert.title) {<AlertTitle>{alert.title}</AlertTitle>}
        {alert.message}
      </Alert>
    </Snackbar>
  );
};
