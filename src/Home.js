import React, { useState } from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Menu from './components/Menu';
import AppBar from './components/AppBar';
import Demo from './components/pages/Demo';
import DemoIcon from '@material-ui/icons/EmojiObjects';
import Dashboard from './components/pages/Dashboard';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "6px"
  },
}));

export default function Home() {
  const classes = useStyles();
  const [isMenuVisible, showMenu] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const pages = [
    {
      id: "dashboard",
      label: "Dashboard",
      component: <Dashboard />,
      icon: <DashboardIcon />
    },
    {
      id: "demo",
      label: "Demo",
      component: <Demo />,
      icon: <DemoIcon />
    }
  ];
  const setPage = (id) => {
    setPageIndex(pages.findIndex(page => page.id === id));
  }

  const toggleMenu = () => {
    showMenu(!isMenuVisible);
  }

  const currentPage = pages[pageIndex];

  return (
    <div className="Home">
      <AppBar title={currentPage.label} toggleMenu={toggleMenu} />
      <Menu isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} pages={pages} setPage={setPage} />
      <Box className={classes.root}>
        {currentPage.component}
      </Box>
    </div>
  );
}
