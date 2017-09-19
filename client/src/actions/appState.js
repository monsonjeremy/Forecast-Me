// @flow

import { createAction } from 'redux-actions'

export const RESET_APP_STATE = 'RESET_APP_STATE'
export const SET_REGION = 'SET_REGION'
export const SET_SPOT = 'SET_SPOT'
export const INC_ACTIVE_DAY = 'INC_ACTIVE_DAY'
export const DEC_ACTIVE_DAY = 'DEC_ACTIVE_DAY'
export const VIEWED_WECLOME_MSG = 'VIEWED_WELCOME_MSG'
export const TOGGLE_SELECTOR_SIDEBAR = 'TOGGLE_SELECTOR_SIDEBAR'

export const resetAppState = createAction(RESET_APP_STATE)
export const viewedWelcomeMessage = createAction(VIEWED_WECLOME_MSG)
export const setRegion = createAction(SET_REGION)
export const setSpot = createAction(SET_SPOT)
export const incrementDay = createAction(INC_ACTIVE_DAY, activeDay => activeDay + 1)
export const decrementDay = createAction(DEC_ACTIVE_DAY, activeDay => activeDay - 1)
export const toggleSelector = createAction(TOGGLE_SELECTOR_SIDEBAR)
