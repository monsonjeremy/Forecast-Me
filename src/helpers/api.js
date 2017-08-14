// @flow

import axios from 'axios'

export default {
  fetchSpot: (spotId: any) => {
    const encodedURI = window.encodeURI(
      `http://api.surfline.com/v1/forecasts/${spotId}?resources=surf,tide&days=6&getAllSpots=false&units=e&interpolate=false&showOptimal=false`
    )

    return axios.get(encodedURI).then(response => response.data)
  },
}
