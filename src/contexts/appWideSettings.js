import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const dummyState = {
  darkMode: false,
  langDe: false,
  toggleLang: () => {},
  toggleDarkMode: () => {},
};

const appWideSettingsReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    case TOGGLE_LANG:
      return { ...state, langDe: !state.langDe };
    default:
      return state;
  }
};

const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
const TOGGLE_LANG = 'TOGGLE_LANG';

export const AppWideSettingsContext = createContext(dummyState);

export const AppWideSettingsProvider = (props) => {
  const [settingsState, dispatch] = useReducer(appWideSettingsReducer, {
    langDe: dummyState.langDe, //TODO: change to reflect user preference
    darkMode: dummyState.darkMode,
  });

  return (
    <AppWideSettingsContext.Provider
      value={{
        langDe: settingsState.langDe,
        darkMode: settingsState.darkMode,
        toggleLang: dispatch({ type: TOGGLE_LANG }),
        toggleDarkMode: dispatch({ type: TOGGLE_DARK_MODE }),
      }}
    >
      {props.children}
    </AppWideSettingsContext.Provider>
  );
};

AppWideSettingsProvider.propTypes = { children: PropTypes.node.isRequired };
