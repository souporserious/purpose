import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import cxs from 'cxs/monolithic'
import prefix from 'inline-style-prefixer/static'
import isValidAttr from './isValidAttr'

function getRules(rules, props) {
  return typeof rules === 'function' ? rules(props) : rules
}

function createResolver(props) {
  function resolve(...args) {
    return args.reduce((resolved, arg) => {
      if (arg.constructor === Array) {
        return resolve(arg)
      } else {
        const rules = getRules(arg, props)
        return rules.constructor === Array
          ? resolve(rules)
          : { ...resolved, ...rules }
      }
    }, {})
  }
  return resolve
}

/*
 * repurposed from Styled Components
 * https://github.com/styled-components/styled-components/blob/14a96775aa8eb01e7f0f7448c9d7bbb281dfc92e/src/models/StyledComponent.js#L91-L104
 *
 * This creates a purpose component by passing in a component or tag:
 * purpose('div', { columnSize: PropTypes.number })
 *  (props => ({ width: props.columnSize / 12 * 100 }))
 *
*/
export default function purpose(target) {
  const displayName = target.displayName || 'PurposeComponent'
  const propTypes = target.propTypes || {}

  return function(defaultCss = {}) {
    const StyledComponent = ({
      innerRef,
      css = {},
      className = '',
      ...props
    }) => {
      const resolve = createResolver(props)
      const propsForElement = {
        ref: innerRef,
        className: `${cxs(prefix(resolve(defaultCss, css)))} ${className}`,
      }

      /* Don't pass through non HTML tags through to HTML elements */
      Object.keys(props)
        .filter(propName => !target.tag || isValidAttr(propName))
        .forEach(propName => {
          propsForElement[propName] = props[propName]
        })

      return createElement(target.tag || target, propsForElement)
    }

    StyledComponent.displayName = displayName
    StyledComponent.propTypes = {
      css: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      ...propTypes,
    }

    return StyledComponent
  }
}
