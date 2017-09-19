/* eslint-disable no-console */
const express = require('express')
// const helpers = require('../helpers/helpers')

const router = express.Router()

/*
  Based on the ENV we will set the AWS Config to access either
  the prod db or the db hosted locally
*/
if (process.env.NODE_ENV === 'production') {
  /*
    Setup the DB using the process flags passed
    in when the container is created
  */
  // PUT PROD DB CONFIG HERE
} else {
  /*
    If we're in dev mode (on local) set the DB up to be pointed to our local.
    For instructions on setting up the dynamoDB local env see the following link
    http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html
  */
  // DEV DB HERE
}

/* DO SOME API STUFF HERE */

module.exports = router
