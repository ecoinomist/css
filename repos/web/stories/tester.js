import Head from 'next/head'
import React, { PureComponent } from 'react'
import View from 'react-ui-pack/View'
import { logRender } from 'utils-pack'

import Content from './testerContent'

@logRender
export default class TesterPage extends PureComponent {
  render () {
    return (<>
        <Head>
          <title>Tester Page</title>
        </Head>
        <View fill className='app__dashboard bg-primary'>
          <Content/>
        </View>
      </>
    )
  }
}
