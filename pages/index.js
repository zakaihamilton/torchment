import React from 'react'
import Head from 'next/head'
import Home from '../src/Home';
import ServiceWorker from '../src/components/ServiceWorker';

const Main = () => (
  <>
    <Head>
      <title>Torchment</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>

    <ServiceWorker />
    <Home />
  </>
)

export default Main;
