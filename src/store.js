// import formRedux from 'modules-pack/formRedux'
import redux, { createStore } from 'modules-pack/redux'
import saga from 'modules-pack/saga'
import user from 'modules-pack/user'
import { createWrapper } from 'next-redux-wrapper'
import { __DEV__, Active } from 'utils-pack'

// =============================================================================
// STORE CREATION
// =============================================================================

let modules = [
  redux,
  saga,
]

if (typeof window === 'undefined') {
  // backend only modules
} else {
  // frontend only modules
  modules = modules.concat(require('./_init/clientModules'))
}

Active.store = createStore(modules.concat([
  // customModules
  user,
]))

export default Active.store

/**
 * Initialise Redux Store with Enhancers
 */
function makeStore () {
  return Active.store
}

export const withStore = createWrapper(makeStore, {debug: __DEV__}).withRedux
