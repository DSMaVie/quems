import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, ButtonGroup, IconButton, Toolbar } from '@material-ui/core';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { IconFlagDE } from 'material-ui-flags';
function TabBar(props) {
  const [currentTab, setTab] = React.useState(props.listOfTabs[0]);
  const globalSettings = React.useContext(GlobalSettings);

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            centered //small displays should use variant="fullWidth" instead
          >
            {props.listOfTabs.map((tab) => (
              <Tab key={tab} label={tab} />
            ))}
            <ButtonGroup variant="text" color="secondary">
              <IconButton>
                <WbIncandescentIcon />
              </IconButton>
              <IconButton>
                <IconFlagDE />
              </IconButton>
            </ButtonGroup>
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

TabBar.propTypes = {
  listOfTabs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TabBar;
