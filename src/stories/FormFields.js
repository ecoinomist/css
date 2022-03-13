import { multiple, required, search, withForm } from 'modules-pack/form'
import * as r from 'modules-pack/form/renders' // required for activation
import { CURRENCY, FIELD, FILE, OPTIONS, TYPE } from 'modules-pack/variables'
import React, { Component } from 'react'
import { cn, PropTypes } from 'react-ui-pack'
import Button from 'react-ui-pack/Button'
import Icon from 'react-ui-pack/Icon'
import { isRequired, OK } from 'react-ui-pack/inputs/validationRules'
import Text from 'react-ui-pack/Text'
import View from 'react-ui-pack/View'
import { cloneDeep, l, localise, localiseTranslation, warn } from 'utils-pack'
import { _ } from 'utils-pack/translations'

const sideEffects = {r}

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
    const {className, style, loading, saved} = this.props
    const fields = this.fields.map(this.fieldsSetup)
    if (!fields.length) return null
    const canSave = this.canSave
    warn(`${this.constructor.name}.formValues`, this.formValues)
    return (
      <View className={cn('form', className)} style={style}>
        <View className="app__form padding-h">
          {this.renderInput(fields)}
          <View className="margin-v-larger left">
            <Button className="secondary round" disabled={!canSave} loading={loading}>
              {saved && !canSave ? _.SAVED : _.SAVE}
            </Button>
            {this.validationErrorsTooltip}
          </View>
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
  FIRST_NAME: {
    [l.ENGLISH]: 'First Name',
  },
  LAST_NAME: {
    [l.ENGLISH]: 'Last Name',
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
  FIRST_NAME: 'firstname',
  LAST_NAME: 'surname',
  FILE: 'file',
  FILE_GRID: 'fileGrid',
  FILE_GRID_KIND: 'fileGridKind',
  GROUP: 'group', // can be reused with different layouts
  MULTIPLE_DROPDOWN: 'multipleDropdown',
  TAGS: 'tags',
}
FIELD.FOR = {
  FORM: [
    {id: FIELD.ID.EMAIL, required},
    {id: FIELD.ID.PHONE, required},
    {id: FIELD.ID.MULTIPLE_DROPDOWN, required},
    {id: FIELD.ID.TAGS, required, info: 'Keywords to identify this entry'},
    {id: FIELD.ID.ABOUT, required},
    { // `required` can be passed down as group, leave undefined by default for customisation
      id: FIELD.ID.GROUP,
      items: [{id: FIELD.ID.FIRST_NAME}, {id: FIELD.ID.LAST_NAME}],
    },
    {
      id: FIELD.ID.GROUP,
      // centerTabs: true,
      kind: FIELD.TYPE.TABS,
      items: TEXTURE_KINDS.map((def) => ({
        id: FIELD.ID.FILE,
        name: def._,
        multiple: false,
        required: def._ === _TEXTURE.KIND.BASE._,
        get label () {return def.name}
      }))
    },
    {id: FIELD.ID.FILE, required, get label () {return _.PHOTO}},
    {id: FIELD.ID.FILE_GRID},
    {
      id: FIELD.ID.FILE_GRID_KIND,
      validate: [isRequired, requiredBaseUpload, requiredLowResUpload, requiredBaseLowResUpload]
    },
  ]
}
FIELD.DEF = {
  [FIELD.ID.FIRST_NAME]: {
    name: 'name',
    get label () {return _.FIRST_NAME},
    // get hint () {return _.MY_FIRST_NAME_IS},
    view: FIELD.TYPE.INPUT,
  },

  [FIELD.ID.LAST_NAME]: {
    name: 'surname',
    get label () {return _.LAST_NAME},
    // get hint () {return _.MY_FAMILY_NAME_IS},
    view: FIELD.TYPE.INPUT,
  },

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
    fileType: FILE.TYPE.IMAGE,
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
    fileType: FILE.TYPE.IMAGE,
    get label () {return _.FILES},
    placeholder: <Icon name="picture" className="larger fade no-margin"/>,
    view: FIELD.TYPE.UPLOAD_GRID,
  },

  [FIELD.ID.FILE_GRID_KIND]: {
    name: FIELD.ID.FILE_GRID_KIND,
    square: {wScale: 2, hScale: 1},
    fileType: FILE.TYPE.IMAGE,
    placeholder: <Icon name="picture" className="larger fade no-margin"/>,
    kinds: TEXTURE_KINDS.map(def => ({_: def._, get name () {return def.name}, types: TEXTURE_RESOLUTIONS})),
    view: FIELD.TYPE.UPLOAD_GRIDS,
  },

  [FIELD.ID.MULTIPLE_DROPDOWN]: {
    name: 'currency',
    get labelGroup () {return 'Countries'},
    get labelType () {return TYPE.CURRENCY.name},
    options: OPTIONS.CURRENCY,
    minFields: 1,
    /**
     * Map props to each Input Field inside multiple Fields
     * @param {Object<value, text>} field - one of `options` value
     * @param {Class<props, state, fields>} instance - of the Fields component
     * @returns {Object} props - to pass down to each selected field
     */
    kindProps: (field, instance) => {
      const options = instance._does_not_exist_prop || []
      const props = {options, search, multiple}
      switch (field.value) {
        case CURRENCY.USD._:
          props.options.push('America')
          return props
        case CURRENCY.EUR._:
          props.options.push('Germany', 'France', 'Italy')
          return props
        case CURRENCY.RUB._:
          props.options.push('Russia')
          return props
        default:
          return props
      }
    },
    kind: FIELD.TYPE.SELECT,
    view: FIELD.TYPE.MULTIPLE,
  },

  [FIELD.ID.GROUP]: {
    view: FIELD.TYPE.GROUP,
  },

  [FIELD.ID.TAGS]: {
    name: FIELD.ID.TAGS,
    multiple, search, allowAdditions: true, onAddItem: warn,
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
