import Head from 'next/head'
import React, { PureComponent } from 'react'
import View from 'react-ui-pack/View'
import { logRender } from 'utils-pack'

import Content from './FormFields'
// import Content from './testerContent'

@logRender
export default class TesterPage extends PureComponent {
  render () {
    return (<>
        <Head>
          <title>Tester Pages</title>
        </Head>
        <View fill className='bg-primary max-size'>
          <Content/>
        </View>
      </>
    )
  }
}
