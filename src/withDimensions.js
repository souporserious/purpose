import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'

const getDimensions = node => {
  const d = node.getBoundingClientRect()
  return {
    width: d.width,
    height: d.height,
    top: d.top,
    right: d.right,
    bottom: d.bottom,
    left: d.left,
  }
}

const noop = () => {
  return null
}

function withDimensions(MeasuredComponent) {
  return class ObservedComponent extends Component {
    static propTypes = {
      getRef: PropTypes.func,
      onLayout: PropTypes.func,
    }

    static defaultProps = {
      getRef: noop,
      onLayout: noop,
    }

    state = {
      dimensions: {
        width: -1,
        height: -1,
        top: -1,
        right: -1,
        bottom: -1,
        left: -1,
      },
    }

    componentDidMount() {
      if (this._node) {
        this._resizeObserver = new ResizeObserver(() => this.measure())
        this._resizeObserver.observe(this._node)
        this.measure()
      }
    }

    componentWillUnmount() {
      if (this.resizeObserver && this._node) {
        this.resizeObserver.disconnect(this._node)
      }
    }

    measure() {
      const dimensions = getDimensions(this._node)

      this.setState({
        dimensions,
      })

      this.props.onLayout(dimensions)
    }

    _handleRef = component => {
      this._node = component
      this.props.getRef(component)
    }

    render() {
      const { getRef, onLayout, ...props } = this.props
      return (
        <MeasuredComponent
          {...props}
          getRef={this._handleRef}
          dimensions={this.state.dimensions}
        />
      )
    }
  }
}

export default withDimensions
