import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertSnackbar } from '../components/AlertSnackbar';

const dummyState = {
  severity: '',
  title: '',
  message: '',
  fireAlert: () => {},
};

export const AlertContext = React.createContext(dummyState);

export const AlertProvider = (props) => {
  const [alert, setAlert] = useState({
    severity: dummyState.severity,
    title: dummyState.title,
    message: dummyState.message,
  });

  return (
    <AlertContext.Provider
      value={{
        severity: alert.severity,
        title: alert.title,
        message: alert.message,
        fireAlert: setAlert,
      }}
    >
      {props.children}
      <AlertSnackbar></AlertSnackbar>
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
