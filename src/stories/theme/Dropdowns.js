import { withForm } from 'modules-pack/form'
import React, { Component } from 'react'
import Dropdown from 'react-ui-pack/Dropdown'
import Row from 'react-ui-pack/Row'
import Text from 'react-ui-pack/Text'
import View from 'react-ui-pack/View'

/**
 * Form Inputs
 */
@withForm()
export default class Dropdowns extends Component {
  render () {
    const options = ['Alpha', 'Beta', 'Mega']
    return (
      <View className="full-width center">
        <Text className="p">@Note: these Dropdowns are not wrapped with Field, and do not have `done` flag
          required to keep `float` label in place when something is selected.
          The bug is to be expected, because all input fields should be wrapped with `asField`.</Text>
        <Row className="full-width center wrap margin top">
          {/* Raw Inputs */}
          <View className="app__form full-width max-width-290 padding-h-small">
            {/* @Note: float label only works correctly with controlled value */}
            <Dropdown float label="Select" options={options}/>
            <Dropdown placeholder="Select" options={options}/>
            <Dropdown label="Select" placeholder="Enter..." options={options}/>

            <Dropdown float label="Multiple" multiple options={options}/>
            <Dropdown placeholder="Multiple" multiple options={options}/>
            <Dropdown label="Multiple" placeholder="Enter..." multiple options={options}/>

            <Dropdown float label="disabled" disabled value={options[0]} options={options}/>
            <Dropdown placeholder="Disabled placeholder" disabled options={options}/>
            <Dropdown label="disabled" placeholder="Enter..." disabled value={options[0]} options={options}/>

            <Dropdown float label="Loading..." loading options={options}/>
            <Dropdown placeholder="Loading search..." loading search value={[1]} options={[
              {text: '[1]', value: '1'},
              {text: '[2]', value: '2'},
            ]}/>
            <Dropdown label="Loading..." placeholder="Enter..." loading options={options}/>

            {/* placeholder is used to control width in compact mode because label is floated */}
            <Row className="bottom justify">
              <Dropdown compact label="Compact" placeholder="Search..." search options={options}/>
              <Dropdown compact float label="Compact" placeholder="Select..." options={options}/>
            </Row>
            <Row>
              <Dropdown compact placeholder="Compact inside Row" search options={options}/>
            </Row>
          </View>

          {/* Raw Inputs */}
          <View className='app__form full-width max-width-290 padding-h-small'>
            <Dropdown float label='Search' search options={options}/>
            <Dropdown placeholder='Search' search options={options}/>
            <Dropdown label='Search' placeholder='Enter...' search options={options}/>

            <Dropdown float label='Search Multiple' search multiple options={options}/>
            <Dropdown placeholder='Search Multiple' search multiple options={options}/>
            <Dropdown label='Search Multiple' placeholder='Enter...' search multiple options={options}/>

            <Dropdown float label='readonly' readonly value={options[0]} options={options}/>
            <Dropdown placeholder='Readonly placeholder' readonly options={options}/>
            <Dropdown label='readonly' placeholder='Enter...' readonly value={options[0]} options={options}/>

            <Dropdown float label='Option removed' value={'none'} options={options}/>
            <Dropdown float label='Option removed' placeholder='multiple' multiple value={['none']} options={options}/>
            <Dropdown label='Option removed' placeholder='search multiple' search multiple value={['none']}
                      options={options}/>
          </View>

          {/* Redux Form Inputs */}
          {/*<form className='app__form full-width max-width-290 padding-h-small'>*/}
          {/*  <PlaceField name='place' placeholder='Enter address' required validate={isRequired}/>*/}
          {/*  <Place placeholder='Enter address' onChange={val => warn('onSelect', val)}*/}
          {/*    // value={{id: 'ChIJGaSPc1pKtUYRHzFSa1B9NHw', address: 'Red Square, Moskva, Russia, 109012'}}*/}
          {/*  />*/}
          {/*</form>*/}
        </Row>
      </View>
    )
  }
}
