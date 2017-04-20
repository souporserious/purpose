import React, { Component, createElement } from 'react'
import ReactDOM, { render } from 'react-dom'
import PropTypes from 'prop-types'
import { Box, ThemeProvider, withTheme, withPurpose } from '../src/index'

const theme = {
  colors: [],
}

const Flex = ({ inline, css, ...props }) => {
  return (
    <Box css={[{ display: inline ? 'inline-flex' : 'flex' }, css]} {...props} />
  )
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Flex
          css={{
            color: '#b4da55',
          }}
          onLayout={m => {
            console.log(m, 'measured!')
          }}
        >
          <Flex
            inline
            css={({ matchesElement }) => ({
              width: '50%',
              [matchesElement({ maxWidth: 300 })]: {
                background: 'orange',
              },
            })}
          >
            Here it goes!
          </Flex>
          <Flex
            inline
            css={({ matchesElement }) => ({
              width: '50%',
            })}
          >
            Another one!
          </Flex>
        </Flex>
      </ThemeProvider>
    )
  }
}

render(<App />, document.getElementById('app'))
