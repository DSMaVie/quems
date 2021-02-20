import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, ButtonGroup, IconButton, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { IconFlagDE, IconFlagUK } from 'material-ui-flags';
import { appWideSettings } from '../index.js';
const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
  },
  tabs: {
    flexGrow: '1',
  },
  buttons: {
    flexShrink: '1',
  },
});

function TabBar(props) {
  const globalSettings = React.useContext(appWideSettings);
  const classes = useStyles();
  const handleTabChange = (event, newTab) => {
    console.assert(props.listOfTabs.includes(newTab), `${newTab} not in list of tabs`);
    props.setTab(newTab);
  };
  const handleDarkModeChange = () => {
    globalSettings.darkMode = !globalSettings.darkMode;
  };

  const handleLangChange = () => {
    globalSettings.langDe = !globalSettings.langDe;
  };

  // global settings seems to be empty -> check with debugger
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Tabs
            className={classes.tabs}
            value={props.currentTab}
            onChange={handleTabChange}
            centered //small displays should use variant="fullWidth" instead
          >
            {props.listOfTabs.map((tab) => (
              <Tab key={tab} label={tab} />
            ))}
          </Tabs>
          <ButtonGroup className={classes.buttons} variant="text" color="secondary">
            <IconButton onClick={handleDarkModeChange}>
              <WbIncandescentIcon />
            </IconButton>
            <IconButton onClick={handleLangChange}>
              {globalSettings.langDe ? <IconFlagUK /> : <IconFlagDE />}
            </IconButton>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}

TabBar.propTypes = {
  listOfTabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentTab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
};

export default TabBar;
