import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab } from '@material-ui/core';

function TabBar(props) {
  const [currentTab, setTab] = React.useState(props.listOfTabs[0]);

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          centered //small displays should use variant="fullWidth" instead
        >
          {props.listOfTabs.map((tab) => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
}

TabBar.propTypes = {
  listOfTabs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TabBar;
