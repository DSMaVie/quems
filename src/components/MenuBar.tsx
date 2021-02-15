import React, { ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function MenuBar(): ReactElement {
  const [cat, setCat] = React.useState('Events');
  const changeTab = (event: React.ChangeEvent<never>, newTab: tab) => {
    setCat(newTab);
  };

  const tabs = ['Events', 'Social Media', 'Templates'] as const;
  type tab = typeof tabs[number];
  const tabList = tabs.forEach((t: tab) => <Tab value={t} label={t}></Tab>);
  //   FIXME: might help https://stackoverflow.com/questions/58548531/how-to-use-react-typescript-to-render-components-by-looping-through-an-array
  return (
    <AppBar position="static">
      <Toolbar>{/* <Tabs value={cat}>{tabList}</Tabs> */}</Toolbar>
    </AppBar>
  );
}
