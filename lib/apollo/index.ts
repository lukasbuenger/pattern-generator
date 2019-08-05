import fetch from 'isomorphic-unfetch'

import ApolloClient from 'apollo-client'
import { ApolloLink, Operation } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import {
  InMemoryCache,
  IdGetterObj,
  NormalizedCacheObject,
} from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import {
  DefinitionNode,
  OperationDefinitionNode,
} from 'graphql'
import createWithApollo from 'next-with-apollo'

const isBrowser = typeof window !== 'undefined'

const API_URL = 'http://localhost:8000/api/v1/graphql/'
const API_WS_URL = 'ws://localhost:8000/ws/api/v1/graphql'
const API_AUTHORIZATION_HEADER = ''

export const dataIdFromObject = (object: IdGetterObj) => {
  if (object.__typename) {
    if (object.id !== undefined) {
      return `${object.__typename}:${object.id}`
    }
  }
  return null
}

const hasSubscriptionOperation = ({
  query: { definitions },
}: Operation) => {
  return definitions.some(
    (definition: DefinitionNode): boolean => {
      const def = definition as OperationDefinitionNode
      return (
        def.kind === 'OperationDefinition' &&
        def.operation === 'subscription'
      )
    }
  )
}

export const withApollo = createWithApollo<
  NormalizedCacheObject
>(({ headers, initialState }) => {
  const httpLink = new HttpLink({
    uri: API_URL,
    credentials: 'include',
    headers: {
      cookie: headers && headers.cookie,
      accept: headers && headers.accept,
      Authorization: API_AUTHORIZATION_HEADER,
    },
    fetch,
  })

  const link = isBrowser
    ? ApolloLink.split(
        hasSubscriptionOperation,
        new WebSocketLink({
          uri: API_WS_URL,
          options: {
            reconnect: true,
            timeout: 50000,
          },
        }),
        httpLink
      )
    : httpLink

  return new ApolloClient({
    connectToDevTools: isBrowser,
    cache: new InMemoryCache({
      dataIdFromObject,
    }).restore(initialState || {}),
    link,
  })
})
