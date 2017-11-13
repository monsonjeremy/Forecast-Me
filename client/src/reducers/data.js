// @flow

import { FETCH_FORECAST, SET_FORECAST, FETCH_SPOT_LIST, SET_SPOT_LIST } from '../actions/data'

const initialState = {
  forecastFetched: false,
  spotList: [],
}

const dataReducer = (
  state: Object = initialState,
  action: {
    type: string,
    payload: any,
  }
) => {
  switch (action.type) {
    case FETCH_FORECAST:
      return {
        ...state,
        forecastFetched: true,
        forecastIsLoading: true,
      }
    case SET_FORECAST:
      return {
        ...state,
        ...action.payload,
      }
    case FETCH_SPOT_LIST:
      return {
        ...state,
        spotListIsLoading: true,
      }
    case SET_SPOT_LIST:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default dataReducer
