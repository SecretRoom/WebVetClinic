import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { getPetsA } from './actions'

type petsState = any

const INITIAL_STATE = Map<petsState>({
  isFetching: false,
  pets: [],
})

export default function reducer(
  state = INITIAL_STATE,
  action: ActionType<
    typeof getPetsA
  >): typeof INITIAL_STATE {
  switch (action.type) {
    case getType(getPetsA.request): {
      return state
        .set('isFetching', true)
    }
    case getType(getPetsA.success): {
      return state
        .set('idEmpl', action.payload)
    }
    case getType(getPetsA.failure): {
      return state
        .set('isFetching', false)
    }
    default:
      return state
  }
}
