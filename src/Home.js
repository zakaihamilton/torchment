import React, { useState } from 'react';
import './Home.css';
import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Menu from './components/Menu';
import AppBar from './components/AppBar';
import NavBar from './components/NavBar';
import pages from './components/pages';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "6px"
  },
}));

export default function Home() {
  const classes = useStyles();
  const [isMenuVisible, showMenu] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const setPage = (id) => {
    setPageIndex(pages.findIndex(page => page.id === id));
  }

  const toggleMenu = () => {
    showMenu(!isMenuVisible);
  }

  const currentPage = pages[pageIndex];

  return (
    <div className="Home">
      <AppBar title={currentPage.label} toggleMenu={toggleMenu} pages={pages} setPage={setPage} />
      <Menu isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} pages={pages} setPage={setPage} />
      <Box className={classes.root}>
        {currentPage.component}
      </Box>
      <NavBar pages={pages} setPage={setPage} currentPage={currentPage} />
    </div>
  );
}
