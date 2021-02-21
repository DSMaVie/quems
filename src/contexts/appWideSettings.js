import React from 'react';

export const appWideSettingsContext = React.createContext({
  darkMode: false,
  langDe: false,
  toggleLang: () => {},
  toggleDarkMode: () => {},
});

// custom hook overloading useContext to provide setters as well
export const useAppWideSettingsContext = (appWideSettingsContext) => {
  const appWideSettings = React.useContext(appWideSettingsContext);
  appWideSettings.toggleLang = () => {
    console.log('toggled language change');
    appWideSettings.langDe = !appWideSettings.langDe;
  };
  appWideSettings.toggleDarkMode = () => {
    console.log('toggled dark mode change');
    appWideSettings.darkMode = !appWideSettings.darkMode;
  };
  return appWideSettings;
};
