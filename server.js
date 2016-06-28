process.env.VUE_ENV = 'server'

const fs = require('fs')
const path = require('path')
const express = require('express')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

const webpack = require('webpack')
const MFS = require('memory-fs')

const clientWebpackConfig = require('./webpack.client.config')
const serverWebpackConfig = require('./webpack.server.config')

buildClientBundle()

function buildClientBundle () {
  // build client bundle
  console.log('building client bundle...')
  webpack(clientWebpackConfig).run((err, stats) => {
    if (err) throw err
    if (stats.hasErrors()) {
      stats.toJson().errors.forEach(e => {
        console.error(e)
      })
      return
    }
    buildServerBundle()
  })
}

function buildServerBundle () {
  // build server bundle
  console.log('building server bundle...')
  const mfs = new MFS()
  const compiler = webpack(serverWebpackConfig)
  compiler.outputFileSystem = mfs
  compiler.run((err, stats) => {
    if (err) throw err
    if (stats.hasErrors()) {
      stats.toJson().errors.forEach(e => {
        console.error(e)
      })
      return
    }
    const bundle = mfs.readFileSync(path.resolve(
      serverWebpackConfig.output.path,
      serverWebpackConfig.output.filename
    ))
    startServer(bundle)
  })
}

function startServer (bundle) {
  console.log('starting server...')
  const app = express()
  const renderer = createBundleRenderer(bundle, {
    cache: {
      max: 10000
    }
  })

  app.use(express.static(path.resolve(__dirname, 'dist')))

  app.get('*', (req, res) => {
    const start = Date.now()
    const context = { url: req.url }
    const renderStream = renderer.renderToStream(context)
    let firstChunk = true

    res.write('<!DOCTYPE html><body>')

    renderStream.on('data', chunk => {
      if (firstChunk) {
        // send down initial store state
        if (context.initialState) {
          res.write(`<script>window.__INITIAL_STATE__=${JSON.stringify(context.initialState)}</script>`)
        }
        firstChunk = false
      }
      res.write(chunk)
    })

    renderStream.on('end', () => {
      console.log('request used: ' + (Date.now() - start) + 'ms')
      // end with script to client-bundle
      const clientPath = clientWebpackConfig.output.publicPath + clientWebpackConfig.output.filename
      res.end(`<script src="${clientPath}"></script></body>`)
    })

    renderStream.on('error', err => {
      throw err
    })
  })

  app.listen(3000, () => {
    console.log('ready at localhost:3000')
  })
}
