import Commerce from '@chec/commerce.js'

if (!process.env.REACT_APP_CHEC_PUBLIC_KEY)
  throw new Error('error, key missing')

export const commerce = new Commerce(
  process.env.REACT_APP_CHEC_PUBLIC_KEY,
  true
)
