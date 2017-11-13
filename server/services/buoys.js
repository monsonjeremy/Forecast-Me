/* eslint-disable import/prefer-default-export */

import { redisClient } from '../redis/redis'

import {} from '../models'

/**
 * Service to retrieve buoy data from Redis
 * @param {string} buoyId The given buoyId to get data for
 * @return {Promise} Promise to get the buoy data
 */
export const getBuoyDataService = buoyId => {
  const getBuoyData = new Promise((resolve, reject) => {
    redisClient.get(buoyId, (err, response) => {
      if (err) reject(err)
      else {
        const splitLines = response
          .split('\n')
          .slice(0, 3)
          .map(line => line.split(/\s+/))
        const labelsLine = splitLines[0]
        const unitsLine = splitLines[1]
        const dataLine = splitLines[2]
        const jsonBuoyData = labelsLine.reduce((accum, label, index) => {
          accum[label] = {
            units: unitsLine[index],
            data: dataLine[index],
          }
          return accum
        }, {})
        resolve(jsonBuoyData)
      }
    })
  }).then(data => data)

  return getBuoyData
}
