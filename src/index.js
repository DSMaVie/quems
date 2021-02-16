import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { deDE, enUS } from '@material-ui/core/locale';

const GlobalSettings = React.createContext({
  darkMode: false,
  locale: 'enUS',
});

const locales = {
  enUs: enUS,
  deDE: deDE,
};

const theme = createMuiTheme(
  {
    palette: {
      type: GlobalSettings.darkMode,
    },
  },
  locales[GlobalSettings.locale],
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
