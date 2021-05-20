import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { authA, logoutA } from './actions'

type authState = any

const INITIAL_STATE = Map<authState>({
  isAuthenticated: !!sessionStorage.getItem('login') || false,
  userID: sessionStorage.getItem('userID') || '',
  isFetching: false,
})

export default function reducer(
  state = INITIAL_STATE,
  action: ActionType<
    typeof authA
    | typeof logoutA
  >): typeof INITIAL_STATE {
  switch (action.type) {
    case getType(authA.request): {
      return state
        .set('isFetching', true)
    }
    case getType(authA.success): {
      return state
        .set('isAuthenticated', action.payload.isAuth)
        .set('userID', action.payload.userID)
        .set('isFetching', false)
    }
    case getType(authA.failure): {
      return state
        .set('isFetching', false)
    }
    case getType(logoutA): {
      return state
        .set('isAuthenticated', false)
    }
    default:
      return state
  }
}
