import NextApp from 'next/app'
import { ThemeProvider } from '@material-ui/styles'

import { theme } from '../lib/theme'
import { AppProvider } from '../components/state/app'

class App extends NextApp {
  public render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ThemeProvider>
    )
  }
}

export default App
