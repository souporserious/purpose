import React, { createElement } from 'react'
import withPurpose from './withPurpose'

const Box = withPurpose(({ tag = 'div', getRef, ...props }) => {
  return createElement(tag, { ref: getRef, ...props })
})

export default Box
