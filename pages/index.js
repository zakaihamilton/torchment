import React from 'react'
import Head from 'next/head'
import Home from '../src/Home';

const Main = () => (
  <>
    <Head>
      <title>Torchment</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Home />
  </>
)

export default Main
