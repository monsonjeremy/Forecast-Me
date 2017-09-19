#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('./api')
const debug = require('debug')('automation-web-app-backend:server')
const http = require('http')

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3001')
app.set('port', port)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = app.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port)
app.on('error', onError)
app.on('listening', onListening)
