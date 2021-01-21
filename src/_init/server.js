import { Active, performStorage } from 'utils-pack'

if (!Active.log) Active.log = require('chalk')
if (!Active.Storage) {
  Active.Storage = require('node-persist')
  performStorage.init() // initiate local storage as async method for backend to avoid blocking concurrent processes
}
console.warn('!!!!init!!!!!!!!!!!')
