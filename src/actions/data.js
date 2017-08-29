// @flow

import { createAction } from 'redux-actions'

export const RESET_APP_DATA = 'RESET_APP_DATA'
export const FETCH_FORECAST = 'FETCH_FORECAST'

export const resetAppData = createAction(RESET_APP_DATA)
export const fetchForecast = createAction(FETCH_FORECAST, (data, forecastIsLoading) => ({
  forecast: data,
  forecastIsLoading,
}))
