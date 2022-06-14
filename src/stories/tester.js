import Head from 'next/head'
import React, { PureComponent } from 'react'
import { ScrollView } from 'react-ui-pack/ScrollView'
import { ENV, logRender } from 'utils-pack'

import Content from './FormFields'
// import Content from './testerContent'

@logRender
export default class TesterPage extends PureComponent {
  render () {
    return (<>
        <Head>
          <title>Tester Pages - {ENV.REACT_APP_NAME}</title>
        </Head>
        <ScrollView fill className="bg-primary max-size">
          <Content/>
        </ScrollView>
      </>
    )
  }
}
