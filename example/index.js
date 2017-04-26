import React, { Component, createElement } from 'react'
import ReactDOM, { render } from 'react-dom'
import PropTypes from 'prop-types'
import { Manager, Target, Popper, Arrow } from 'react-popper'
import purpose, { Media, Container } from '../src/index'
const { Div, Form } = purpose

const StyledTarget = purpose(Target)({
  width: 100,
  height: 50,
  backgroundColor: 'rebeccapurple',
  color: '#fff',
})

const StyledPopper = purpose(Popper)({
  width: 100,
  height: 50,
  backgroundColor: '#60dd20',
  color: '#fff',
})

const Input = purpose('input')({
  padding: 8,
  border: 0,
  backgroundColor: '#999',
  ':focus': {
    backgroundColor: '#ccc',
  },
})

const Button = purpose({
  tag: 'button',
  displayName: 'Button',
  propTypes: {
    small: PropTypes.bool,
    primary: PropTypes.bool,
  },
})(props => ({
  padding: props.small ? 12 : 18,
  color: props.primary ? 'orange' : 'grey',
}))

const Row = purpose({
  tag: 'div',
  displayName: 'Row',
})({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
})

const Column = purpose({
  tag: 'div',
  displayName: 'Column',
  propTypes: { size: PropTypes.number },
})(props => ({
  display: 'flex',
  flexDirection: 'column',
  flex: `0 0 ${props.size / 12 * 100}%`,
}))

const InputsWithButton = () => (
  <Container
    queries={{
      fullWidth: { maxWidth: 494 },
    }}
  >
    {({ containerRef, matches, resolve }) => {
      const styles = {
        form: {
          display: 'flex',
          flexDirection: matches.fullWidth ? 'column' : 'row',
        },
        input: matches.fullWidth
          ? { marginBottom: 8 }
          : { flex: 1, marginRight: 8 },
      }
      return (
        <Form innerRef={containerRef} css={styles.form}>
          <Input type="text" css={styles.input} />
          <Input type="text" css={styles.input} />
          <Button primary small>
            Full width until 494px
          </Button>
        </Form>
      )
    }}
  </Container>
)

const breakpoints = {
  sm: { minWidth: 400 },
  md: { minWidth: 600 },
  lg: { minWidth: 800 },
}

const colors = {
  grey: '#ccc',
  grey0: '#ebebeb',
}

const Page = props => (
  <Media queries={breakpoints}>
    {({ resolve, matches }) => (
      <Row>
        <Column size={resolve({ default: 12, md: 6 })}>
          Span 12 columns by default and 6 at the medium breakpoint
        </Column>
        <Column size={resolve({ default: 12, md: 6 })}>
          ...
        </Column>
      </Row>
    )}
  </Media>
)

const PopperComponent = () => (
  <Manager>
    <StyledTarget>
      Target
    </StyledTarget>
    <StyledPopper placement="bottom">
      Cool beans
    </StyledPopper>
  </Manager>
)

class App extends Component {
  render() {
    return (
      <Media queries={breakpoints}>
        {({ resolve, matches }) => (
          <Div
            css={resolve({
              sm: { color: 'red' },
              md: { backgroundColor: 'orange' },
              lg: { color: 'blue' },
            })}
          >
            <PopperComponent />
            <InputsWithButton />
            <Page />
          </Div>
        )}
      </Media>
    )
  }
}

render(<App />, document.getElementById('app'))
