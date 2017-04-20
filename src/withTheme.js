import React, { Component } from 'react'
import PropTypes from 'prop-types'

function withTheme(WrappedComponent) {
  const ThemeComponent = (props, context) => (
    <WrappedComponent theme={context.theme} {...props} />
  )

  ThemeComponent.contextTypes = {
    theme: PropTypes.object,
  }

  return ThemeComponent
}

export default withTheme
