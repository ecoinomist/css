import popup from 'modules-pack/popup'
import { connect } from 'modules-pack/redux'
import Head from 'next/head'
import React, { Component } from 'react'
import ScrollView from 'react-ui-pack/ScrollView'
import Text from 'react-ui-pack/Text'
import { logRender } from 'utils-pack'

// if (__DEV__) require('utils-pack/benchmark/object')

/**
 * MAP STATE & ACTIONS TO PROPS ------------------------------------------------
 * -----------------------------------------------------------------------------
 */
const mapStateToProps = (state) => ({
  activePopups: popup.select.activePopups(state),
})
@connect(mapStateToProps)
@logRender
export default class HomePage extends Component {
  render () {
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <ScrollView className='center padding' style={{background: 'teal'}}>
          <Text className='h2'>Welcome to npm packages tester!</Text>
        </ScrollView>
      </>
    )
  }
}
