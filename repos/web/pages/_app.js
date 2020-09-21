import Head from 'next/head'
import React from 'react'
import { Active } from 'utils-pack'
import { withStore } from '../src/store'

// @Note: must use `typeof window === 'undefined'` for next.js to remove backend code from client
// @see: https://flaviocopes.com/nextjs-server-client-code/
if (typeof window === 'undefined') {
  Active.log = require('chalk')
}

function App ({Component, pageProps}) {
  return <>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico"/>
      <link rel="stylesheet" href="/static/semantic.css"/>
      <link rel="stylesheet" href="/static/all.css"/>
    </Head>
    <Component {...pageProps} />
  </>
}

export default withStore(App)
