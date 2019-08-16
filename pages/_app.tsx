import NextApp, { Container } from 'next/app'

import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import { AppProvider } from '../components/app'

class App extends NextApp {
  public render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Grommet theme={grommet}>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </Grommet>
      </Container>
    )
  }
}

export default App
