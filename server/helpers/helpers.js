/* eslint-disable import/prefer-default-export */

import moment from 'moment'
/**
   * Source: https://gist.github.com/mikelehen/3596a30bd69384624c11#file-generate-pushid-js-L13
   * Fancy ID generator that creates 20-character string identifiers with the following properties:
   * 1. They're based on timestamp so that they sort *after* any existing ids.
   * 2. They contain 72-bits of random data after the timestamp so
   *    that IDs won't collide with other clients' IDs.
   * 3. They sort *lexicographically* (so the timestamp
   *    is converted to characters that will sort properly).
   * 4. They're monotonically increasing. Even if you generate more
   *    than one in the same timestamp, the latter ones will sort after the former ones.
   *    We do this by using the previous random bits
   *    but "incrementing" them by 1 (only in the case of a timestamp collision).
   */
export const generatePushID = (() => {
  // Modeled after base64 web-safe chars, but ordered by ASCII.
  const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'

  // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
  let lastPushTime = 0

  /**
     * We generate 72-bits of randomness which get turned into 12 characters and appended to the
     * timestamp to prevent collisions with other clients. We store the last characters we generated
     * because in the event of a collision, we'll use those same characters except
     * "incremented" by one.
     */
  const lastRandChars = []

  return () => {
    let now = new Date().getTime()
    const duplicateTime = now === lastPushTime
    lastPushTime = now

    const timeStampChars = new Array(8)

    for (let i = 7; i >= 0; i -= 1) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64)
      // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
      now = Math.floor(now / 64)
    }
    if (now !== 0) throw new Error('We should have converted the entire timestamp.')

    let id = timeStampChars.join('')

    if (!duplicateTime) {
      for (let i = 0; i < 12; i += 1) {
        lastRandChars[i] = Math.floor(Math.random() * 64)
      }
    } else {
      let i = 0
      // If the timestamp hasn't changed since last push,
      // use the same random number, except incremented by 1.
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i -= 1) {
        lastRandChars[i] = 0
      }
      lastRandChars[i] += 1
    }
    for (let i = 0; i < 12; i += 1) {
      id += PUSH_CHARS.charAt(lastRandChars[i])
    }
    if (id.length !== 20) throw new Error('Length should be 20.')

    return id
  }
})()

/**
 * Massages the surf forecast data and returns a properly formatted array of objects
 * 
 * @param {Object} data 
 * @param {boolean} isSpot 
 */
export const formatSurfData = (data, isSpot) =>
  data.dateStamp.map((day, forecastDay) =>
    day.map((date, index) => {
      const surfData = {
        dateTime: date,
        date,
        anindex: index,
        hour: moment(date, 'MMMM DD, YYYY HH:mm:ss').format('h A'),
        swellHeight1: data.swell_height1[forecastDay][index],
        swellHeight2: data.swell_height2[forecastDay][index],
        swellHeight3: data.swell_height3[forecastDay][index],
        swellPeriod1: data.swell_period1[forecastDay][index],
        swellPeriod2: data.swell_period2[forecastDay][index],
        swellPeriod3: data.swell_period3[forecastDay][index],
        swellDirection1: data.swell_direction1[forecastDay][index],
        swellDirection2: data.swell_direction2[forecastDay][index],
        swellDirection3: data.swell_direction3[forecastDay][index],
        surfMaxMaximum: data.surf_max_maximum,
      }
      if (isSpot === false) {
        return {
          ...surfData,
          surfMax: data.agg_surf_max[forecastDay][index] - data.agg_surf_min[forecastDay][index],
          surfMin: data.agg_surf_min[forecastDay][index],
          label: `${Math.round(data.agg_surf_min[forecastDay][index])}-${Math.round(
            data.agg_surf_max[forecastDay][index]
          )}ft`,
        }
      }
      return {
        ...surfData,
        surfMax: data.surf_max[forecastDay][index] - data.surf_min[forecastDay][index],
        surfMin: data.surf_min[forecastDay][index],
        label: `${Math.round(data.surf_min[forecastDay][index])}-${Math.round(
          data.surf_max[forecastDay][index]
        )}ft`,
      }
    })
  )

/**
 * Massages the tide and sunrise/sunset forecast data 
 * and returns a properly formatted array of objects
 * 
 * @param {Object} tideData 
 */

export const formatTideAndSunData = tideData => {
  const next10Days = []
  const formattedTideData = []
  const formattedSunData = []
  for (let i = 0; i < 10; i += 1) {
    next10Days.push({
      dayStart: moment()
        .startOf('day')
        .add(i, 'days')
        .local(),
      dayEnd: moment()
        .endOf('day')
        .add(i, 'days')
        .local(),
    })
  }
  next10Days.forEach(day => {
    const currDayTideData = tideData.dataPoints.filter(tideEntry => (
        moment(tideEntry.Localtime).isBetween(day.dayStart, day.dayEnd, '[]') &&
        (tideEntry.type === 'NORMAL' || tideEntry.type === 'Low' || tideEntry.type === 'High')
      ))
    const currDaySundData = tideData.SunPoints.filter(sunEntry =>
      moment(sunEntry.Localtime).isBetween(day.dayStart, day.dayEnd, '[]')
    )
    const mergeSunData = {}
    currDaySundData.forEach(data => {
      if (data.type === 'Sunrise') {
        mergeSunData.sunriseLocaltime = data.Localtime
        mergeSunData.sunrise = data.time
      } else {
        mergeSunData.sunsetLocaltime = data.Localtime
        mergeSunData.sunset = data.time
      }
    })
    formattedTideData.push(currDayTideData)
    formattedSunData.push(mergeSunData)
  })

  return {
    Tide: formattedTideData,
    Sun: formattedSunData,
  }
}

export const getTideMaxMin = tideData => {
  let tideMin = 0
  let tideMax = 0
  tideData.forEach(day =>
    day.forEach(data => {
      if (data.height > tideMax) {
        tideMax = data.height
        return
      }
      if (data.height < tideMin) {
        tideMin = data.height
      }
    })
  )

  return {
    tideMin,
    tideMax,
  }
}

export const massageSurflineData = (data, isSpot) => {
  const surfData = data.Surf
  const Surf = formatSurfData(surfData, isSpot)
  const tideAndSun = formatTideAndSunData(data.Tide)
  const { tideMin, tideMax, } = getTideMaxMin(tideAndSun.Tide)
  return {
    tideMin,
    tideMax,
    Surf,
    ...tideAndSun,
  }
}
