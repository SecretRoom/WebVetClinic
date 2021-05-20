import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'

import { fetchPatientsA } from './actions'

type patientsState = any

const INITIAL_STATE = Map<patientsState>({
  isFetching: false,
  patientsList: [],
})

export default function reducer(
  state = INITIAL_STATE,
  action: ActionType<
    typeof fetchPatientsA
  >): typeof INITIAL_STATE {
  switch (action.type) {
    case getType(fetchPatientsA.request): {
      return state
        .set('isFetching', true)
    }
    case getType(fetchPatientsA.success): {
      return state
        .set('patientsList', action.payload)
        .set('isFetching', false)
    }
    case getType(fetchPatientsA.failure): {
      return state
        .set('isFetching', false)
    }
    default:
      return state
  }
}
