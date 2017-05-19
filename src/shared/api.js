// @flow

import axios from 'axios'

module.exports = {
  fetchSpot: (spotId: any) => {
    const encodedURI = window.encodeURI(
      `http://api.surfline.com/v1/forecasts/${spotId}?resources=surf,analysis&days=6&getAllSpots=false&units=e&interpolate=false&showOptimal=false`,
    )

    return axios.get(encodedURI).then(response =>
      response.data.Surf,
    )
  },

  formatSurflineData: (dateTimeArray: Array<string>,
    forecastObject: Object,
    forecastDay: number,
    isSpot: boolean) => {
    const formattedData = []
    // eslint-disable-next-line
    dateTimeArray.map((date, index) => {
      if (isSpot === false) {
        formattedData.push({
          dateTime: date,
          swellHeight1: forecastObject.swell_height1[forecastDay][index],
          swellHeight2: forecastObject.swell_height2[forecastDay][index],
          swellHeight3: forecastObject.swell_height3[forecastDay][index],
          swellPeriod1: forecastObject.swell_period1[forecastDay][index],
          swellPeriod2: forecastObject.swell_period2[forecastDay][index],
          swellPeriod3: forecastObject.swell_period3[forecastDay][index],
          surfMax: forecastObject.surf_max[forecastDay][index],
          surfMin: forecastObject.surf_min[forecastDay][index],
          aggSurfMax: forecastObject.agg_surf_max[forecastDay][index],
          aggSurfMin: forecastObject.agg_surf_min[forecastDay][index],
          aggHeight: forecastObject.agg_height1[forecastDay][index],
          aggPeriod: forecastObject.agg_period1[forecastDay][index],
        })
      } else {
        formattedData.push({
          dateTime: date,
          swellHeight1: forecastObject.swell_height1[forecastDay][index],
          swellHeight2: forecastObject.swell_height2[forecastDay][index],
          swellHeight3: forecastObject.swell_height3[forecastDay][index],
          swellPeriod1: forecastObject.swell_period1[forecastDay][index],
          swellPeriod2: forecastObject.swell_period2[forecastDay][index],
          swellPeriod3: forecastObject.swell_period3[forecastDay][index],
          surfMax: forecastObject.surf_max[forecastDay][index],
          surfMin: forecastObject.surf_min[forecastDay][index],
        })
      }
    },
    )
    return formattedData
  },
}
