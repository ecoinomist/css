import { withFormRedux } from 'modules-pack/formRedux'
import popup from 'modules-pack/popup'
import { connect } from 'modules-pack/redux'
import React from 'react'
import FormPage from './form'

/**
 * MAP STATE & ACTIONS TO PROPS ------------------------------------------------
 * -----------------------------------------------------------------------------
 */
const mapStateToProps = (state) => ({
  activePopups: popup.select.activePopups(state),
})
@connect(mapStateToProps)
@withFormRedux({form: 'Redux', enableReinitialize: true})
export default class ReduxForm extends FormPage {}
