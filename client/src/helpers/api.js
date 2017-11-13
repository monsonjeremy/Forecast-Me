// @flow

import axios from 'axios'

export const fetchSpot = (spotId: number) => {
  const encodedURI = window.encodeURI(`/api/surf/v1/GetSurf/${spotId}`)
  return axios.get(encodedURI)
}

export const getRegions = () => {
  const encodedURI = window.encodeURI(`/api/surf/v1/GetRegions`)
  return axios.get(encodedURI).then(response => response.data)
}

export const newAPI = () => {
  const encodedURI = window.encodeURI(
    `https://services.surfline.com/kbyg/spots/forecasts?spotId=584204214e65fad6a7709ce1&accesstoken=742331bb2b9e3c76107fd066e7291fca63976f06`
  )
  return axios.get(encodedURI)
}

export const getBuoyData = (buoyId: string) => {
  const encodedURI = window.encodeURI(`api/buoys/v1/GetData/${buoyId}`)
  return axios.get(encodedURI)
}
