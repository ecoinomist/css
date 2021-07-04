import { multiple, search, upward, withForm } from 'modules-pack/form'
import 'modules-pack/form/renders' // required for activation
import { FIELD, FILE_TYPE } from 'modules-pack/variables'
import React, { Component } from 'react'
import { cn, PropTypes } from 'react-ui-pack'
import Icon from 'react-ui-pack/Icon'
import { isRequired, OK } from 'react-ui-pack/inputs/validationRules'
import Text from 'react-ui-pack/Text'
import View from 'react-ui-pack/View'
import { cloneDeep, l, localise, localiseTranslation, warn } from 'utils-pack'
import { _ } from 'utils-pack/translations'

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

// DEFINITIONS -----------------------------------------------------------------
export const _TEXTURE = {
  KIND: {
    BASE: {
      _: 'base',
      [l.ENGLISH]: 'Base',
    },
    BUMP: {
      _: 'bump',
      [l.ENGLISH]: 'Bump',
    },
  },
  RES: {
    LOW: {
      _: '0', // identifier for upload file name in the server (do not change!!!)
      [l.ENGLISH]: '',
    },
    HD: {
      _: 'hd',
      [l.ENGLISH]: 'HD',
    },
    // HDR: {
    //   _: 'hdr',
    //   [l.ENGLISH]: 'HDR',
    // },
  }
}
localise(_TEXTURE)
export const TEXTURE_KINDS = Object.values(_TEXTURE.KIND)
export const TEXTURE_RESOLUTIONS = Object.values(_TEXTURE.RES)

// TRANSLATIONS ----------------------------------------------------------------
localiseTranslation({
  BASE_FILE_REQUIRED: {
    [l.ENGLISH]: 'Base file required',
  },
  BASE_LOW_RESOLUTION_FILE_REQUIRED: {
    [l.ENGLISH]: 'Base low resolution file required',
  },
  LOW_RESOLUTION_FILE_REQUIRED: {
    [l.ENGLISH]: 'Low resolution file required',
  },
  DRAG_N_DROP: {
    [l.ENGLISH]: 'Drag & Drop',
  },
  ABOUT: {
    [l.ENGLISH]: 'About',
  },
  FILES: {
    [l.ENGLISH]: 'Files',
  },
  ENTER___: {
    [l.ENGLISH]: 'Enter...',
  },
  TAGS: {
    [l.ENGLISH]: 'Tags',
  },
  PHOTO: {
    [l.ENGLISH]: 'Photo',
  },
})

// FIELDS ----------------------------------------------------------------------
FIELD.ID = {
  FILE: 'file',
  FILE_GRID: 'fileGrid',
  FILE_GRID_KIND: 'fileGridKind',
  TAGS: 'tags',
}
FIELD.FOR = {
  FORM: [
    {id: FIELD.ID.FILE, required: true, get label () {return _.PHOTO}},
    {id: FIELD.ID.EMAIL, required: true,},
    {id: FIELD.ID.ABOUT, required: true,},
    {id: FIELD.ID.TAGS, required: true, info: 'Keywords to identify this entry'},
    {
      id: FIELD.ID.FILE_GRID_KIND,
      validate: [isRequired, requiredBaseUpload, requiredLowResUpload, requiredBaseLowResUpload]
    },
    {id: FIELD.ID.FILE_GRID},
  ]
}
FIELD.DEF = {
  [FIELD.ID.ABOUT]: {
    name: FIELD.ID.ABOUT,
    type: 'textarea',
    get label () {return _.ABOUT},
    view: FIELD.TYPE.INPUT, // required definition
  },

  [FIELD.ID.FILE]: {
    name: FIELD.ID.FILE,
    square: true,
    showName: true,
    type: FILE_TYPE.IMAGE,
    // loading: true,
    // disabled: true,
    // readonly: true, // will not render if no initial value exists - asField() logic
    // iconUpload: 'plus',
    // iconRemove: 'cross',
    get label () {return _.FILES},
    get placeholder () {return _.DRAG_N_DROP},
    view: FIELD.TYPE.UPLOAD_GRID,
  },

  [FIELD.ID.FILE_GRID]: {
    name: FIELD.ID.FILE_GRID,
    count: 4,
    square: true,
    showCount: true,
    type: FILE_TYPE.IMAGE,
    get label () {return _.FILES},
    get placeholder () {return <Icon name='picture' className='larger fade no-margin'/>},
    view: FIELD.TYPE.UPLOAD_GRID,
  },

  [FIELD.ID.FILE_GRID_KIND]: {
    name: FIELD.ID.FILE_GRID_KIND,
    square: {wScale: 2, hScale: 1},
    type: FILE_TYPE.IMAGE,
    get placeholder () {return <Icon name="picture" className="larger fade no-margin"/>},
    kinds: TEXTURE_KINDS.map(def => ({_: def._, get name () {return def.name}, types: TEXTURE_RESOLUTIONS})),
    view: FIELD.TYPE.UPLOAD_GRIDS,
  },

  [FIELD.ID.TAGS]: {
    name: FIELD.ID.TAGS,
    multiple, search, upward, allowAdditions: true, onAddItem: warn,
    get placeholder () {return _.ENTER___},
    get label () {return _.TAGS},
    // options - to be loaded by component
    view: FIELD.TYPE.SELECT,
  },
}

function requiredBaseUpload (files) {
  return files.find(f => f.kind === _TEXTURE.KIND.BASE._) ? OK : _.BASE_FILE_REQUIRED
}

function requiredLowResUpload (files) {
  return files.find(f => f.i === _TEXTURE.RES.LOW._) ? OK : _.LOW_RESOLUTION_FILE_REQUIRED
}

function requiredBaseLowResUpload (files) {
  return files.find(f => f.kind === _TEXTURE.KIND.BASE._ && f.i === _TEXTURE.RES.LOW._) ? OK : _.BASE_LOW_RESOLUTION_FILE_REQUIRED
}
