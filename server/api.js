// Imports
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Set up API routes
const dynamoApi = require('./routes/api')

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json({ limit: '50mb', }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, }))
app.use(cookieParser())

// Create endpoint for API
app.use('/api', dynamoApi)

// Serve bundle for production on root URL
if (process.env.NODE_ENV === 'production') {
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
