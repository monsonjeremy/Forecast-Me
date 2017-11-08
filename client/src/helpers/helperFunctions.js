// @flow

import moment from 'moment'

export const formatSurflineData = (
  dateTimeArray: Array<string>,
  forecastObject: Object,
  forecastDay: number,
  isSpot: boolean
) =>
  dateTimeArray.map((date, index) => {
    if (isSpot === false) {
      return {
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
        label: `${Math.round(forecastObject.agg_surf_min[forecastDay][index])}-${Math.round(
          forecastObject.agg_surf_max[forecastDay][index]
        )}ft`,
      }
    }
    return {
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
        forecastObject.surf_max[forecastDay][index] - forecastObject.surf_min[forecastDay][index],
      surfMin: forecastObject.surf_min[forecastDay][index],
      label: `${Math.round(forecastObject.surf_min[forecastDay][index])}-${Math.round(
        forecastObject.surf_max[forecastDay][index]
      )}ft`,
    }
  })
export const roundUpMaxSurfHeight = (maxSurfHeight: number) => Math.ceil(maxSurfHeight / 5) * 5

export const prepTideData = (dayToGraph: string, tideForecast: Array<Object>, width: number) =>
  tideForecast.filter(tideObject => {
    const printTime = moment(tideObject.Rawtime, 'MMMM DD, YYYY HH:mm:ss').format('h A')
    const dateOfEntry = moment(tideObject.Rawtime, 'MMMM DD, YYYY HH:mm:ss').format('ddd MMMM Do')
    tideObject.printtime = printTime
    tideObject.lineChartCurtain = width
    return dateOfEntry === dayToGraph && tideObject.type === 'NORMAL'
  })

export const mapNewStateToOldState = (oldState: Object, newState: Object) => {
  Object.keys(oldState).forEach(key => Object.assign(oldState[key], newState[key]))
  return oldState
}

export const setCookie = (cname: string, cvalue: any, exdays: number = 365) => {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${cname}=${cvalue};${expires};path=/`
}

export const getCookie = (cname: string) => {
  const name = `${cname}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
