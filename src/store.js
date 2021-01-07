// import formRedux from 'modules-pack/formRedux'
import form from 'modules-pack/form'
import popup from 'modules-pack/popup'
import redux, { createStore } from 'modules-pack/redux'
import saga from 'modules-pack/saga'
import upload from 'modules-pack/upload'
import { createWrapper } from 'next-redux-wrapper'
import { __DEV__, Active } from 'utils-pack'
import './testTranslation'

// =============================================================================
// STORE CREATION
// =============================================================================

Active.store = createStore([
  redux,
  saga,
  form,
  popup,
  upload
].concat(
  // coreModules
))

export default Active.store

/**
 * Initialise Redux Store with Enhancers
 */
function makeStore () {
  return Active.store
}

export const withStore = createWrapper(makeStore, {debug: __DEV__}).withRedux
