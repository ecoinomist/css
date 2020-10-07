import { withForm } from 'modules-pack/form'
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
  initialValues: {
    email: 'co@gmail.com'
  },
})
@connect(mapStateToProps)
@withForm({subscription: {pristine: true, valid: true}})
export default class FinalForm extends FormPage {}
