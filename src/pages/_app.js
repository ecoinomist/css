import Head from 'next/head'
import React from 'react'
import { Active, ENV } from 'utils-pack'
import { withStore } from '../store'

// @Note: must use `typeof window === 'undefined'` for next.js to remove backend code from client
// @see: https://flaviocopes.com/nextjs-server-client-code/
if (typeof window === 'undefined') {
  Active.log = require('chalk')
}

/* Test Benchmarks */

function App ({Component, pageProps}) {
  if (typeof window !== 'undefined') console.log('ENV', ENV)
  return <>
    <Head>
      <link rel="icon" href="/favicon.ico"/>
      <link rel="stylesheet" href="/static/semantic.css"/>
      <link rel="stylesheet" href="/static/all.css"/>
    </Head>
    <Component {...pageProps} />
  </>
}

export default withStore(App)
