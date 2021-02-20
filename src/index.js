import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { deDE, enUS } from '@material-ui/core/locale';

// providing global settings object for other components (subject to refactor)
export const appWideSettings = React.createContext({
  darkMode: false,
  langDe: false,
});

// build theme based on global settings object
let theme = createMuiTheme(
  {
    palette: {
      type: appWideSettings.darkMode,
    },
  },
  appWideSettings.langDe ? deDE : enUS,
);
theme = responsiveFontSizes(theme);

// render root of DOM
ReactDOM.render(
  <React.StrictMode>
    <appWideSettings.Provider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </appWideSettings.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
