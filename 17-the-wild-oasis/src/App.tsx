import styled from 'styled-components'
import { GlobalStyles } from './styles/GlobalStyles'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Heading } from './ui/Heading'
import { Row } from './ui/Row'

const StyledApp = styled.div`
  padding: 20px;
`

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Chick in and out</Heading>
              <Button
                variation="primary"
                size="medium"
                onClick={() => alert('Hello world!')}
              >
                Check in
              </Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert('Hello world!')}
              >
                Check out
              </Button>
            </div>
          </Row>

          <Row type="vertical">
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="Number of guests"></Input>
              <Input type="number" placeholder="Number of guests"></Input>
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  )
}
