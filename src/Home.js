import React, { useState } from 'react';
import Menu from './components/Menu';
import AppBar from './components/AppBar';
import NavBar from './components/NavBar';
import pages from './components/pages';
import ServiceWorker from './components/ServiceWorker';

export default function Home() {
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
    <>
      <ServiceWorker />
      <AppBar title={currentPage.label} toggleMenu={toggleMenu} pages={pages} setPage={setPage} />
      <Menu isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} pages={pages} setPage={setPage} />
      {currentPage.component}
      <NavBar pages={pages} setPage={setPage} currentPage={currentPage} />
    </>
  );
}
