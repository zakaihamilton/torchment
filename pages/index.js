import React from 'react'
import Head from 'next/head'
import Home from '../src/Home';
import ServiceWorker from '../src/components/ServiceWorker';

const Main = () => (
  <>
    <Head>
      <title>Torchment</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ServiceWorker />
    <Home />
  </>
)

export default Main;