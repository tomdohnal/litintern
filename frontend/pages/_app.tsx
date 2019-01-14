import ApolloClient from 'apollo-client'
import { Grommet } from 'grommet'
import App, { Container, NextAppContext } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import withData from '../utils/withData'

const theme = {
  global: {
    font: {
      family: 'roboto',
    },
  },
}

class MyApp extends App<{ apollo: ApolloClient<any> }> {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Grommet theme={theme}>
            <Component {...pageProps} />
          </Grommet>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp)
