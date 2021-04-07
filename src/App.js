import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import './App.css';
import TabBar from './components/TabBar';
import EventView from './pages/Events';

const useStyles = makeStyles({
  content: {
    height: '90vh',
  },
  tabBar: { marginBottom: '10px' },
});

function App() {
  const classes = useStyles();
  const listsOfTabs = ['Events', 'Social Media', 'Templates'];
  const [tab, setTab] = React.useState(listsOfTabs[0]);
  return (
    <div>
      <TabBar
        className={classes.tabBar}
        listOfTabs={listsOfTabs}
        currentTab={tab}
        setTab={setTab}
      />
      <Container className={classes.content}>
        <EventView />
      </Container>
    </div>
  );
}

export default App;
