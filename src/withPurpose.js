import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cxs from 'cxs'
import styleResolver, { UNIQUE_KEY } from './style-resolver'
import withTheme from './withTheme'
import withDimensions from './withDimensions'

function createTestQuery({ width, height }) {
  return ({
    minWidth = 0,
    maxWidth = Infinity,
    minHeight = 0,
    maxHeight = Infinity,
  }) =>
    minWidth <= width &&
    width <= maxWidth &&
    minHeight <= height &&
    height <= maxHeight
}

export default function withPurpose(WrappedComponent) {
  const StyleProvider = ({
    css = {},
    dimensions,
    theme,
    className = '',
    ...props
  }) => {
    const testQuery = createTestQuery(dimensions)

    function matchesElement(query) {
      if (testQuery(query)) {
        const key = typeof query === 'object' ? JSON.stringify(query) : query
        return UNIQUE_KEY + key
      }
      return false
    }

    const getCss = _css =>
      (typeof _css === 'function'
        ? _css({ props, dimensions, matchesElement })
        : _css)

    const finalCss = css.constructor === Array
      ? css.reduce((newStyles, rule) => ({ ...newStyles, ...getCss(rule) }), {})
      : getCss(css)

    const cssClassName = cxs(styleResolver(finalCss))

    return (
      <WrappedComponent className={`${cssClassName} ${className}`} {...props} />
    )
  }
  return withTheme(withDimensions(StyleProvider))
}
