import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ThemeProvider extends Component {
  static childContextTypes = {
    theme: PropTypes.object,
  }

  getChildContext() {
    return {
      theme: this.props.theme,
    }
  }

  render() {
    return this.props.children
  }
}

export default ThemeProvider
