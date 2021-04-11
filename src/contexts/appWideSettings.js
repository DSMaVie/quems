import React, { createContext, useReducer, useCallback } from 'react';
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

  const toggleLang = useCallback(() => dispatch({ type: TOGGLE_LANG }), []);
  const toggleDarkMode = useCallback(
    () => dispatch({ type: TOGGLE_DARK_MODE }),
    [],
  );

  return (
    <AppWideSettingsContext.Provider
      value={{
        langDe: settingsState.langDe,
        darkMode: settingsState.darkMode,
        toggleLang: toggleLang,
        toggleDarkMode: toggleDarkMode,
      }}
    >
      {props.children}
    </AppWideSettingsContext.Provider>
  );
};

AppWideSettingsProvider.propTypes = { children: PropTypes.node.isRequired };
