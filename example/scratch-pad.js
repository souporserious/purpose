import React, { Component, createElement } from 'react'
import ReactDOM, { render } from 'react-dom'
import PropTypes from 'prop-types'
import { Box, createBox, withPurpose } from '../src/index'

// import createPurpose from 'purpose/createPurpose'
// const { Box, createBox } = createPurpose({
//   cssInJs: style => cxs(style),
//   breakpoints: {
//     sm: {}
//   }
// })

const theme = {
  colors: [],
  breakpoints: {
    md: { minWidth: 400, maxWidth: 800 },
  },
}

const Flex = createBox('div', props => ({
  display: props.inline ? 'inline-flex' : 'flex',
}))

const colors = {
  warning: 'yellow',
  error: 'red',
  success: 'green',
  grey: '#ccc',
}

const sx = {
  base: {
    appearance: 'none',
    padding: 10,
    fontSize: 16,
    border: '1px solid #ddd',
    ':focus': {
      outline: 'none',
      borderColor: '#ccc',
    },
  },
  medium: {
    padding: 16,
    fontSize: 22,
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
}

const Input = createBox('input', props => [
  sx.base,
  props.container.width > 600 && sx.medium,
  props.hasSuccess && sx.success,
  props.hasError && sx.error,
])

const Page = withActiveQueries(({ activeQueries }) => (
  <Row>
    <Column size={activeQueries.sm ? 6 : 12} />
    <Column size={activeQueries.sm ? 6 : 12} />
  </Row>
))

const queries = {
  sm: '(min-width: 300px)',
  md: '(min-width: 600px)',
}
const Page = () => (
  <Media queries={queries}>
    {({ sm, md }) => (
      <Row>
        <Column size={sm ? 6 : 12} />
        <Column size={sm ? 6 : 12} />
      </Row>
    )}
  </Media>
)

const queries = {
  fullWidth: { maxWidth: 494 },
}
const InputsWithButton = () => (
  <Container queries={queries}>
    {({ ref, matches, resolve }) => {
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
        <Form ref={ref} css={styles.form}>
          <Input type="text" css={styles.input} />
          <Input type="text" css={styles.input} />
          <Button primary small block={matches.fullWidth}>
            Full width until 494px
          </Button>
        </Form>
      )
    }}
  </Container>
)

const queries = {
  sm: { minWidth: 0 },
  md: { minWidth: 575 },
  lg: { minWidth: 800 },
}
const Page = () => (
  <Container queries={queries}>
    {({ containerRef, resolve }) => (
      <Box ref={containerRef}>
        <Slider viewsToShow={resolve({ sm: 1, md: 2, lg: 3 })} />
      </Box>
    )}
  </Container>
)

const queries = {
  sm: { minWidth: 0 },
  md: { minWidth: 575 },
  lg: { minWidth: 800 },
}
const Page = () => (
  <Container queries={queries}>
    {({ containerRef, resolve }) => (
      <Box ref={containerRef}>
        <Slider viewsToShow={resolve({ sm: 1, md: 2, lg: 3 })} />
      </Box>
    )}
  </Container>
)

const queries = {
  sm: '(min-width: 300px)',
  md: '(min-width: 600px)',
  lg: '(min-width: 900px)',
}
const Page = () => (
  <Media queries={queries}>
    {resolve => (
      <Row>
        <Column size={resolve({ all: 12, md: 6, lg: 4 })} />
        <Column size={resolve({ all: 12, md: 6, lg: 4 })} />
      </Row>
    )}
  </Media>
)

class App extends Component {
  render() {
    return (
      <div>

        <Media
          render={({ activeQueries }) => (
            <Row ref={getRef}>
              <Column size={activeQueries.sm > 600 ? 6 : 12} />
              <Column size={activeQueries.sm > 600 ? 6 : 12} />
            </Row>
          )}
        />

        <Media>
          {({ activeQueries }) => (
            <Row ref={getRef}>
              <Column size={activeQueries.sm > 600 ? 6 : 12} />
              <Column size={activeQueries.sm > 600 ? 6 : 12} />
            </Row>
          )}
        </Media>

        <Input type="text" hasSuccess />

        <Container queries={{ md: { minWidth: 500, maxWidth: 800 } }}>
          {matches => (
            <Flex
              css={[
                {
                  width: '50%',
                  fontSize: 18,
                },
                matches.md && {
                  fontSize: 24,
                },
              ]}
            >
              <Input large={matches.md} />
            </Flex>
          )}
        </Container>

        <ContainerQuery minWidth="500" maxWidth="800">
          {({ ref, matches }) => (
            <Flex
              ref={ref}
              css={[
                {
                  width: '50%',
                  fontSize: 18,
                },
                matches && {
                  fontSize: 24,
                },
              ]}
            >
              <Label>Enter your favorite food:</Label>
              <Input large={matches} />
            </Flex>
          )}
        </ContainerQuery>

        <Media
          queries={{
            sm: { minWidth: 300 },
            md: { minWidth: 600 },
            lg: { minWidth: 900 },
          }}
        >
          {({ matches, resolve }) => (
            <Row>
              <Column size={resolve({ all: 12, md: 6, lg: 4 })} />
              <Column size={resolve({ all: 12, md: 6, lg: 4 })} />
            </Row>
          )}
        </Media>

        <Container queries={{ md: { minWidth: 500, maxWidth: 800 } }}>
          {({ ref, matches, resolve }) => (
            <Flex
              ref={ref}
              css={{
                width: '50%',
                fontSize: matches.md ? 24 : 18,
              }}
            >
              <Label>Enter your favorite food:</Label>
              <Input large={matches.md} />
            </Flex>
          )}
        </Container>

        <Flex
          inline
          css={({ container }) => [
            {
              width: '50%',
              fontSize: 18,
            },
            container.width >= 500 &&
            container.height <= 800 && {
              fontSize: 24,
            },
          ]}
        >
          <Input type="text" placeholder="this is legit" />
          <Input type="text" placeholder="this is legit" hasError />
          <Input type="text" placeholder="this is legit" hasSuccess />
        </Flex>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
