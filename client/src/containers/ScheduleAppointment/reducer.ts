import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'

import { fetchScheduleAppointmentA } from './actions'

type scheduleAppointmentState = any

const INITIAL_STATE = Map<scheduleAppointmentState>({
  isFetching: false,
  planned: [],
  adopted: [],
  filterDate: new Date(),
})

export default function reducer(
  state = INITIAL_STATE,
  action: ActionType<
    typeof fetchScheduleAppointmentA
  >): typeof INITIAL_STATE {
  switch (action.type) {
    case getType(fetchScheduleAppointmentA.request): {
      return state
        .set('isFetching', true)
    }
    case getType(fetchScheduleAppointmentA.success): {
      return state
        .set('filterDate', action.payload.date)
        .set('planned', action.payload.planned)
        .set('adopted', action.payload.adopted)
        .set('isFetching', false)
    }
    case getType(fetchScheduleAppointmentA.failure): {
      return state
        .set('isFetching', false)
    }
    default:
      return state
  }
}
