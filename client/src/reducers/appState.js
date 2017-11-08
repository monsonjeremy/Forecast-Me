// @flow

import {
  RESET_APP_STATE,
  SET_SPOT,
  SET_REGION,
  INC_ACTIVE_DAY,
  DEC_ACTIVE_DAY,
  VIEWED_WECLOME_MSG,
  TOGGLE_SELECTOR_SIDEBAR
} from '../actions/appState'

const initialState = {
  selectedRegion: null,
  selectedSpot: null,
  showWelcomeMessage: true,
  selectorOpen: false,
}

const appStateReducer = (
  state: Object = initialState,
  action: {
    type: string,
    payload: any,
  }
) => {
  switch (action.type) {
    case RESET_APP_STATE:
      return {
        ...state,
        selectedSpot: null,
        selectedRegion: null,
        activeDay: 0,
        isSpot: false,
        showWelcomeMessage: false,
      }
    case SET_SPOT:
      return {
        ...state,
        selectedSpot: action.payload,
        isSpot: true,
        activeDay: 0,
      }
    case SET_REGION:
      return {
        ...state,
        selectedRegion: action.payload,
        isSpot: false,
        activeDay: 0,
      }
    case INC_ACTIVE_DAY:
      return {
        ...state,
        activeDay: action.payload,
      }
    case DEC_ACTIVE_DAY:
      return {
        ...state,
        activeDay: action.payload,
      }
    case VIEWED_WECLOME_MSG:
      return {
        ...state,
        showWelcomeMessage: false,
      }
    case TOGGLE_SELECTOR_SIDEBAR:
      return {
        ...state,
        selectorOpen: !state.selectorOpen,
      }
    default:
      return state
  }
}

export default appStateReducer
