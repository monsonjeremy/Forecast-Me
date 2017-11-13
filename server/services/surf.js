/* eslint-disable import/prefer-default-export */

import { redisClient } from '../redis/redis'

import {} from '../models'

/**
 * Service to retrieve buoy data from Redis
 * @param {string} buoyId The given buoyId to get data for
 * @return {Promise} Promise to get the buoy data
 */
export const getSurfDataService = id => {
  const getSurfData = new Promise((resolve, reject) => {
    redisClient.get(id, (err, response) => {
      if (err) reject(err)
      else {
        resolve(JSON.parse(response))
      }
    })
  }).then(data => data)

  return getSurfData
}
