// @flow

import { FETCH_FORECAST, RESET_APP_DATA } from '../actions/data'

const initialState = {
  forecastFetched: false,
}

const dataReducer = (
  state: Object = initialState,
  action: {
    type: string,
    payload: any,
  }
) => {
  switch (action.type) {
    case RESET_APP_DATA:
      return initialState
    case FETCH_FORECAST:
      return {
        ...state,
        forecastFetched: true,
        forecastIsLoading: true,
        ...action.payload,
      }
    default:
      return state
  }
}

export default dataReducer
