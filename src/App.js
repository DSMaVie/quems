import React from 'react';
// import llogo from './logo.svg';
import './App.css';
import TabBar from './components/TabBar';

function App() {
  const listsOfTabs = ['Events', 'Social Media', 'Templates'];
  const [tab, setTab] = React.useState(listsOfTabs[0]);
  return <TabBar listOfTabs={listsOfTabs} currentTab={tab} setTab={setTab} />;
}

export default App;
