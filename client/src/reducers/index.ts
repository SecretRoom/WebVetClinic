/* eslint-disable import/no-named-default */
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { LOG_OUT } from '../containers/Auth/types'

import { default as pets } from '../containers/Pets/reducer'
import { default as global } from '../containers/Global/reducer'
import { default as authReducer } from '../containers/Auth/reducer'
import { default as userData } from '../containers/UserData/reducer'
import { default as notification } from '../containers/Blocks/Notification/reducer'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const rootReducer = (history: any): any => (state: any, action: any) => {
  const appReducer = combineReducers({
    pets,
    global,
    userData,
    notification,
    auth: authReducer,
    router: connectRouter(history),
  })

  if (action.type === LOG_OUT) {
    // eslint-disable-next-line no-param-reassign
    state = undefined
  }
  return appReducer(state, action)
}
