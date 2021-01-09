import { multiple, search, upward, withForm } from 'modules-pack/form'
import 'modules-pack/form/renders' // required for activation
import { FIELD, FILE_TYPE } from 'modules-pack/variables'
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
      <Text className='h5 center padding'>Dynamic Field Definition</Text>
      <FormFields className="max-width-400 bg-neutral padding-v min-width-290"/>
    </View>
  </>)
}

FIELD.ID = {
  FILE: 'file',
  TAGS: 'tags',
}
FIELD.FOR = {
  FORM: [
    {id: FIELD.ID.FILE, required: true, get label () {return _.PHOTOS}},
    {id: FIELD.ID.EMAIL, required: true,},
    {id: FIELD.ID.TAGS, required: true, info: 'Keywords to identify this entry'},
  ]
}
FIELD.DEF = {
  [FIELD.ID.FILE]: {
    name: FIELD.ID.FILE,
    count: 1,
    square: true,
    id: FILE_TYPE.IMAGE,
    // loading: true,
    // disabled: true,
    // readonly: true, // will not render if no initial value exists - asField() logic
    // iconUpload: 'plus',
    // iconRemove: 'cross',
    get label () {return _.UPLOAD},
    get placeholder () {return _.DRAG_N_DROP},
    view: FIELD.TYPE.UPLOAD_GRID,
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
  DRAG_N_DROP: {
    [l.ENGLISH]: 'Drag & Drop',
  },
  ENTER___: {
    [l.ENGLISH]: 'Enter...',
  },
  TAGS: {
    [l.ENGLISH]: 'Tags',
  },
  PHOTOS: {
    [l.ENGLISH]: 'Photos',
  },
  UPLOAD: {
    [l.ENGLISH]: 'Upload',
  },
}

localiseTranslation(_)
