import config from 'next/config'
import { ENV } from 'utils-pack'

Object.assign(ENV, config().publicRuntimeConfig)

// @Note: must use `typeof window === 'undefined'` for next.js to remove backend code from client
// @see: https://flaviocopes.com/nextjs-server-client-code/
if (typeof window === 'undefined') {
  require('./server')
} else {
  require('./client')
}
