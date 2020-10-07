import { l, localiseTranslation } from 'utils-pack'
import { TRANSLATION } from 'utils-pack/translations'

export const _ = {
  ...TRANSLATION,
  NEW_PHRASE: {
    [l.ENGLISH]: 'New Phrase',
    [l.RUSSIAN]: 'Новая Фраза',
  },
}
localiseTranslation(_)

console.log('!!!!!!!Test Translation', _.ARE_YOU_SURE_YOU_WANT_TO)
console.log(_.NEW_PHRASE)
