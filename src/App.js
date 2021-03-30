import React from 'react';
// import llogo from './logo.svg';
import './App.css';
import TabBar from './components/TabBar';
import EventView from './pages/Events';

function App() {
  const listsOfTabs = ['Events', 'Social Media', 'Templates'];
  const [tab, setTab] = React.useState(listsOfTabs[0]);
  return (
    <div>
      <TabBar listOfTabs={listsOfTabs} currentTab={tab} setTab={setTab} />
      <EventView />
    </div>
  );
}

export default App;
