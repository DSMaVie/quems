import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { deDE, enUS } from '@material-ui/core/locale';

import {
  AppWideSettingsContext,
  AppWideSettingsProvider,
} from './contexts/appWideSettings';
import { AlertProvider } from './contexts/alert';

import { Provider } from 'react-redux';
import store from './redux/store';

const MuiThemeProvider = (props) => {
  const { darkMode, langDe } = useContext(AppWideSettingsContext);
  let theme = createMuiTheme(
    {
      palette: {
        type: darkMode ? 'dark' : 'light',
      },
    },
    langDe ? deDE : enUS,
  );
  theme = responsiveFontSizes(theme);
  return <ThemeProvider theme={theme}> {props.children}</ThemeProvider>;
};
MuiThemeProvider.propTypes = { children: PropTypes.node.isRequired };

const IndexComponent = () => {
  return (
    <React.StrictMode>
      <AppWideSettingsProvider>
        <MuiThemeProvider>
          <AlertProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </AlertProvider>
        </MuiThemeProvider>
      </AppWideSettingsProvider>
    </React.StrictMode>
  );
};

// render root of DOM
ReactDOM.render(<IndexComponent />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
