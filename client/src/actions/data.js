// @flow

import { createAction } from 'redux-actions'

export const RESET_APP_DATA = 'RESET_APP_DATA'
export const FETCH_FORECAST = 'FETCH_FORECAST'
export const FETCH_SPOT_LIST = 'FETCH_SPOT_LIST'
export const SET_SPOT_LIST = 'SET_SPOT_LIST'
export const SET_FORECAST = 'SET_FORECAST'
export const SET_BUOY_DATA = 'SET_BUOY_DATA'

export const resetAppData = createAction(RESET_APP_DATA)
export const fetchForecast = createAction(FETCH_FORECAST)
export const setForecast = createAction(SET_FORECAST, (data, forecastIsLoading) => ({
  forecast: data,
  forecastIsLoading,
}))
export const fetchSpotList = createAction(FETCH_SPOT_LIST)
export const setSpotList = createAction(SET_SPOT_LIST, data => ({
  spotList: data,
  spotListIsLoading: false,
}))
export const setBuoyData = createAction(SET_BUOY_DATA, (data, forecastIsLoading) => ({
  buoyData: data,
  forecastIsLoading,
}))
