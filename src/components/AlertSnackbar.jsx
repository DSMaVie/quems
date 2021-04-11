import { Snackbar } from '@material-ui/core';
import { AlertContext } from '../contexts/alert';
import React, { useContext, useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export const AlertSnackbar = () => {
  //provide display toggle and alert context
  const alert = useContext(AlertContext);
  const [display, setDisplay] = useState(false);

  //open snackbar if alert is fullfills certain reqs
  useEffect(() => {
    if (
      !!alert.severity &&
      alert.severity.length > 0 &&
      !!alert.message &&
      alert.message.length > 0
    ) {
      setDisplay(true);
    }
  }, [alert]);

  // provide handlers for closing and purging
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDisplay(false);
  };

  const purgeAlert = () => {
    alert.fireAlert({ severity: '', message: '', title: '' });
  };

  //render
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
      open={display}
      key={alert.message}
      onExited={purgeAlert}
      autoHideDuration={10000}
    >
      <Alert onClose={handleClose} severity={alert.severity}>
        {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
        {alert.message}
      </Alert>
    </Snackbar>
  );
};
