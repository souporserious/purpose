import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'
import json2mq from 'json2mq'

const noop = () => {
  return null
}

function matchProps(matches, propQueries) {
  let matchedProps
  Object.keys(propQueries).forEach(key => {
    if (matches[key] || key === 'default') {
      const props = propQueries[key]
      if (typeof props === 'object') {
        matchedProps = { ...matchedProps, ...props }
      } else {
        matchedProps = props
      }
    }
  })
  return matchedProps
}

export class Media extends Component {
  static propTypes = {
    queries: PropTypes.object,
    onUpdate: PropTypes.func,
  }

  static defaultProps = {
    queries: {},
    onUpdate: noop,
  }

  state = {
    matches: {},
  }

  componentWillMount() {
    if (typeof window !== 'object') return

    const { queries } = this.props

    this._queryLists = Object.keys(queries).reduce((queryLists, key) => {
      const queryList = window.matchMedia(json2mq(queries[key]))
      queryList.addListener(this._updateMatches)
      queryLists[key] = queryList
      return queryLists
    }, {})

    this._updateMatches()
  }

  componentWillUnmount() {
    Object.keys(this._queryLists).forEach(key =>
      this._queryLists[key].removeListener(this._updateMatches)
    )
  }

  _updateMatches = () => {
    const matches = Object.keys(this._queryLists).reduce((matches, key) => {
      const queryList = this._queryLists[key]
      return { ...matches, [key]: queryList.matches }
    }, {})
    this.setState({ matches })
  }

  _resolve = propQueries => {
    return matchProps(this.state.matches, propQueries)
  }

  render() {
    return this.props.children({
      matches: this.state.matches,
      resolve: this._resolve,
    })
  }
}

function matchQueries(queries, { width, height }) {
  const matchedQueries = {}

  Object.keys(queries).forEach(key => {
    const {
      minWidth = 0,
      maxWidth = Infinity,
      minHeight = 0,
      maxHeight = Infinity,
    } = queries[key]

    matchedQueries[key] =
      minWidth <= width &&
      width <= maxWidth &&
      minHeight <= height &&
      height <= maxHeight
  })

  return matchedQueries
}

function getDimensions(node) {
  const d = node.getBoundingClientRect()
  return {
    width: d.width,
    height: d.height,
  }
}

export class Container extends Component {
  static propTypes = {
    queries: PropTypes.object,
    onUpdate: PropTypes.func,
  }

  static defaultProps = {
    queries: {},
    onUpdate: noop,
  }

  state = {
    matches: {},
  }

  componentDidMount() {
    if (typeof window !== 'object') return

    if (this._node) {
      this._resizeObserver = new ResizeObserver(this._updateMatches)
      this._resizeObserver.observe(this._node)
      this._updateMatches()
    } else {
      console.error(
        'No ref found, attach the `containerRef` prop passed back in the child function to the component you want to measure.'
      )
    }
  }

  componentWillUnmount() {
    if (this.resizeObserver && this._node) {
      this.resizeObserver.disconnect(this._node)
    }
  }

  _updateMatches = () => {
    const dimensions = getDimensions(this._node)
    this.setState({
      matches: matchQueries(this.props.queries, dimensions),
    })
    this.props.onUpdate(dimensions)
  }

  _ref = component => {
    this._node = component
  }

  _resolve = propQueries => {
    return matchProps(this.state.matches, propQueries)
  }

  render() {
    return this.props.children({
      containerRef: this._ref,
      matches: this.state.matches,
      resolve: this._resolve,
    })
  }
}

export default { Media, Container }
