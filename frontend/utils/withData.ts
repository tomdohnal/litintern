import ApolloClient from 'apollo-boost'
import withApollo, { InitApolloOptions } from 'next-with-apollo'
import { ENDPOINT } from '../config'

function createClient({ headers }: InitApolloOptions<any>) {
  return new ApolloClient({
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      })

      return Promise.resolve()
    },
    uri: ENDPOINT,
  })
}

export default withApollo(createClient)
