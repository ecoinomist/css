import { required } from 'modules-pack/form/constants'
import { InputField } from 'modules-pack/form/inputs'
import * as r from 'modules-pack/form/renders'
import { FIELD } from 'modules-pack/variables'
import Head from 'next/head'
import { PureComponent } from 'react'
import Button from 'react-ui-pack/Button'
import JsonView from 'react-ui-pack/JsonView'
import Row from 'react-ui-pack/Row'
import ScrollView from 'react-ui-pack/ScrollView'
import Text from 'react-ui-pack/Text'
import View from 'react-ui-pack/View'
import { logRender, warn } from 'utils-pack'

const sideEffects = {r}

FIELD.FOR = {
  CONTACT: [
    {
      id: FIELD.ID.EMAIL, required,
      // parse: (v) => {
      //   warn('parse.renderInput', v)
      //   return v ? v.toUpperCase() : v
      // },
      // format: (v) => {
      //   warn('format.renderInput', v)
      //   return v ? v.toLowerCase() : v
      // },
    },
    // {id: FIELD.ID.PHONE},
  ]
}
@logRender
export default class FormPage extends PureComponent {
  handleChange = (...args) => this.handleChangeInput(...args)

  render () {
    const {activePopups} = this.props
    const hasChanged = this.changedValues
    const canSave = this.canSave
    const changedValues = this.changedValues || {}
    const registeredValues = this.registeredValues || {}
    console.log('@connect.activePopups', activePopups)
    return (
      <>
        <Head>
          <title>Tester</title>
        </Head>
        <ScrollView className='padding'>
          <Text className='h3'>Tester</Text>
          {this.renderInput(FIELD.FOR.CONTACT)}
          <Row className='wrap margin-v'>
            <View>
              <InputField name='name' placeholder='Enter your name' label='First Name'
                // validate={isRequired}
                // onChange={this.handleChange}
                          parse={(v) => {
                            warn('parse', v)
                            return v ? v.toUpperCase() : v
                          }}
                          format={(v) => {
                            warn('format', v)
                            return v ? v.toLowerCase() : v
                          }}
              />
              {/*<InputField name={'surname'} placeholder='Enter your name' label='Last Name' format={toUpperCase}*/}
              {/*            validate={isRequired} onChange={this.handleChange}/>*/}
            </View>
            <View className='margin'>
              <Row className='wrap margin'>
                <Button disabled={!hasChanged}>Has Changed</Button>
                <Button disabled={!canSave}>Can Save</Button>
              </Row>
              <Row className='wrap margin'>
                <View className='padding'>
                  <Text>Changed Values</Text>
                  <JsonView data={changedValues}/>
                </View>
                <View className='padding'>
                  <Text>Registered Values</Text>
                  <JsonView data={registeredValues}/>
                </View>
              </Row>
            </View>
          </Row>
        </ScrollView>
      </>
    )
  }
}
