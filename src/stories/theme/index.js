import Head from 'next/head'
import React, { Component } from 'react'
import Button from 'react-ui-pack/Button'
import Row from 'react-ui-pack/Row'
import ScrollView from 'react-ui-pack/ScrollView'
import { logRender } from 'utils-pack'
import Buttons from './Buttons'
import Charts from './Charts'
import Dropdowns from './Dropdowns'
import Forms from './Forms'
import Layouts from './Layouts'

@logRender
export default class Theme extends Component {
  state = {
    activeIndex: 0,
    items: [
      {name: 'Layouts', content: Layouts},
      {name: 'Buttons', content: Buttons},
      {name: 'Charts', content: Charts},
      {name: 'Dropdowns', content: Dropdowns},
      {name: 'Inputs', content: Forms},
    ]
  }

  render () {
    const {activeIndex, items} = this.state
    const Content = items[activeIndex].content
    return (
      <>
        <Head>
          <title>Theme Demo</title>
        </Head>
        <ScrollView className='app__page fade-in-left padding padding-bottom-largest'>
          <Row className='center wrap margin'>
            {items.map(({name}, i) => (
              <Button key={name || i} className={activeIndex === i ? 'primary' : 'transparent'}
                      onClick={() => this.setState({activeIndex: i})}>{name}</Button>
            ))}
          </Row>
          <Content/>
        </ScrollView>
      </>
    )
  }
}
