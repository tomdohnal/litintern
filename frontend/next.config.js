const withTypescript = require("@zeit/next-typescript")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = withTypescript({
  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.GRAPHQL_ENDPOINT': JSON.stringify(process.env.GRAPHQL_ENDPOINT),
      })
    );
    return config
  }
})
