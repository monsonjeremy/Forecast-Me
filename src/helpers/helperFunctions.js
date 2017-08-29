// @flow

import moment from 'moment'

export default {
  formatSurflineData: (
    dateTimeArray: Array<string>,
    forecastObject: Object,
    forecastDay: number,
    isSpot: boolean
  ) => {
    const formattedData = []
    dateTimeArray.forEach((date, index) => {
      if (isSpot === false) {
        formattedData.push({
          dateTime: date,
          anindex: index,
          hour: moment(date, 'MMMM DD, YYYY HH:mm:ss').format('h A'),
          swellHeight1: forecastObject.swell_height1[forecastDay][index],
          swellHeight2: forecastObject.swell_height2[forecastDay][index],
          swellHeight3: forecastObject.swell_height3[forecastDay][index],
          swellPeriod1: forecastObject.swell_period1[forecastDay][index],
          swellPeriod2: forecastObject.swell_period2[forecastDay][index],
          swellPeriod3: forecastObject.swell_period3[forecastDay][index],
          surfMax: forecastObject.surf_max[forecastDay][index],
          surfMin: forecastObject.surf_min[forecastDay][index],
          aggSurfMax:
            forecastObject.agg_surf_max[forecastDay][index] -
            forecastObject.agg_surf_min[forecastDay][index],
          aggSurfMin: forecastObject.agg_surf_min[forecastDay][index],
          aggHeight: forecastObject.agg_height1[forecastDay][index],
          aggPeriod: forecastObject.agg_period1[forecastDay][index],
        })
      } else {
        formattedData.push({
          dateTime: date,
          anindex: index,
          hour: moment(date, 'MMMM DD, YYYY HH:mm:ss').format('h A'),
          swellHeight1: forecastObject.swell_height1[forecastDay][index],
          swellHeight2: forecastObject.swell_height2[forecastDay][index],
          swellHeight3: forecastObject.swell_height3[forecastDay][index],
          swellPeriod1: forecastObject.swell_period1[forecastDay][index],
          swellPeriod2: forecastObject.swell_period2[forecastDay][index],
          swellPeriod3: forecastObject.swell_period3[forecastDay][index],
          surfMax:
            forecastObject.surf_max[forecastDay][index] -
            forecastObject.surf_min[forecastDay][index],
          surfMin: forecastObject.surf_min[forecastDay][index],
        })
      }
    })
    return formattedData
  },

  roundUpMaxSurfHeight: (maxSurfHeight: number) => Math.ceil(maxSurfHeight / 5) * 5,

  filterTideData: (dayToGraph: string, tideForecast: Array<Object>) =>
    tideForecast.filter((tideObject) => {
      const printTime = moment(tideObject.Rawtime, 'MMMM DD, YYYY HH:mm:ss').format('h A')
      const dateOfEntry = moment(tideObject.Rawtime, 'MMMM DD, YYYY HH:mm:ss').format('ddd MMMM Do')
      tideObject.printtime = printTime
      return (
        dateOfEntry === dayToGraph && tideObject.type !== 'Sunset' && tideObject.type !== 'Sunrise'
      )
    }),

  mapNewStateToOldState: (oldState: Object, newState: Object) => {
    Object.keys(oldState).forEach(key => Object.assign(oldState[key], newState[key]))
    return oldState
  },
}
