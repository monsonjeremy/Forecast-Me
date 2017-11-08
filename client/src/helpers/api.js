// @flow

import axios from 'axios'

export const fetchSpot = (spotId: number) => {
  const encodedURI = window.encodeURI(
    `http://api.surfline.com/v1/forecasts/${spotId}?resources=surf,tide&days=10&getAllSpots=false&units=e&interpolate=false&showOptimal=false`
  )
  return axios.get(encodedURI)
}

export const newAPI = () => {
  const encodedURI = window.encodeURI(
    `https://services.surfline.com/kbyg/spots/forecasts?spotId=584204214e65fad6a7709ce1&accesstoken=742331bb2b9e3c76107fd066e7291fca63976f06`
  )
  return axios.get(encodedURI)
}

export const getBuoyData = (buoyId: string) => {
  const encodedURI = window.encodeURI(`http://www.ndbc.noaa.gov/data/realtime2/${buoyId}.spec`)
  return axios.get(encodedURI, {
    Accept: 'text/plain',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain',
  })
}
