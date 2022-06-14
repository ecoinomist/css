import Head from 'next/head'
import React from 'react'
import * as i from '../_init'
import { ENV } from 'utils-pack'
import { withStore } from '../store'

const sideEffects = {i}

/* Test Benchmarks */
// todo: add App.js as wrapper
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
