import NextApp, { Container } from 'next/app'
import { ThemeProvider } from '@material-ui/styles'

import { theme } from '../lib/theme'
import { AppProvider } from '../components/state/app'

class App extends NextApp {
  public render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </ThemeProvider>
      </Container>
    )
  }
}

export default App
