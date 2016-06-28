var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './app/client-entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'client-bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process': {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }
    })
  ],
  devtools: '#source-map'
}
