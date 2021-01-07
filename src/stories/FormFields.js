import { multiple, search, upward, withForm } from 'modules-pack/form'
import 'modules-pack/form/renders' // required for activation
import { FIELD } from 'modules-pack/variables'
import React, { Component } from 'react'
import { cn, PropTypes } from 'react-ui-pack'
import Text from 'react-ui-pack/Text'
import View from 'react-ui-pack/View'
import { cloneDeep, l, localiseTranslation } from 'utils-pack'
import { TRANSLATION } from 'utils-pack/translations'

@withForm()
class FormFields extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    tagOptions: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    tagOptions: [
      {text: 'Alpha', value: 1},
      {text: 'Beta', value: 2},
      {text: 'Omega', value: 99},
    ]
  }

  // Available input fields
  fields = cloneDeep(FIELD.FOR.FORM)

  fieldsSetup = (field) => {
    if (field.id === FIELD.ID.TAGS) field.options = this.props.tagOptions
    return field
  }

  render () {
    const {className, style} = this.props
    const fields = this.fields.map(this.fieldsSetup)
    if (!fields.length) return null
    return (
      <View className={cn('form', className)} style={style}>
        <View className='app__form padding-h'>
          {this.renderInput(fields)}
        </View>
      </View>
    )
  }
}

export default function () {
  return (<>
    <View fill className='center max-size'>
      <Text className='h5 center padding'>Form Fields Defined by Constants</Text>
      <FormFields className="max-width-400 bg-neutral padding-v"/>
    </View>
  </>)
}

FIELD.ID = {
  FILE: 'file',
  TAGS: 'tags',
}
FIELD.FOR = {
  FORM: [
    {id: FIELD.ID.EMAIL},
    {id: FIELD.ID.TAGS},
  ]
}
FIELD.DEF = {
  [FIELD.ID.FILE]: {
    name: FIELD.ID.FILE,
    get label () {return _.FILE},
    view: FIELD.TYPE.UPLOAD,
  },
  [FIELD.ID.TAGS]: {
    name: FIELD.ID.TAGS,
    multiple, search, upward,
    get placeholder () {return _.ENTER___},
    get label () {return _.TAGS},
    // options - to be loaded by component
    view: FIELD.TYPE.SELECT,
  },
}

const _ = {
  ...TRANSLATION,
  // FIELDS --------------------------------------------------------------------
  ENTER___: {
    [l.ENGLISH]: 'Enter...',
  },
  TAGS: {
    [l.ENGLISH]: 'Tags',
  },
}

localiseTranslation(_)
