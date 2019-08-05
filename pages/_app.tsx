import NextApp, { Container } from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import { withApollo } from '../lib/apollo'
import ApolloClient from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'

interface AppProps {
  apollo: ApolloClient<NormalizedCacheObject>
}

class App extends NextApp<AppProps> {
  public render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
        <Grommet theme={grommet}>
          <ApolloProvider client={apollo}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Grommet>
      </Container>
    )
  }
}

export default withApollo(App)
