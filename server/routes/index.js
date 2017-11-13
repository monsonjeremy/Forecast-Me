import express from 'express'
import path from 'path'
import buoysApi from './buoys'
import surfApi from './surf'

const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Define if local dev or not
const isLocalDev = process.env.NODE_ENV === 'development'
const app = express()

app.use(logger('dev'))

app.use(cors())
app.use(bodyParser.json({ limit: '50mb', }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, }))
app.use(cookieParser())

// Node status for Load balancer to ping
app.get('/__status__/node', (req, res) => {
  res.sendStatus(200)
})

// Create endpoint for redis API
app.use('/api/buoys/v1', buoysApi)

// Create endpoint for redis API
app.use('/api/surf/v1', surfApi)

if (!isLocalDev) {
  // Serve bundle on root URL
  app.use(express.static(path.join(__dirname, '..', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
  })
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
