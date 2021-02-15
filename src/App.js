import React from 'react';
// import llogo from './logo.svg';
import './App.css';
import TabBar from './components/TabBar';

function App() {
  const listsOfTabs = ['Events', 'Social Media', 'Templates'];
  return (
    <TabBar listOfTabs={listsOfTabs} />
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
