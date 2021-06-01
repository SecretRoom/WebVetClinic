import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { getPetsA, getScheduleAppointmentA, getScheduleServiceA, resetSelectedPetA, selectPetA } from './actions'

type petsState = any

const INITIAL_STATE = Map<petsState>({
  isFetching: false,
  pets: [],
  selectedPet: {
    _id: sessionStorage.getItem('petID') || undefined,
  },
  services: {},
  appointments: {},
  isFetchingServices: false,
  isFetchingAppointments: false,
})

export default function reducer(
  state = INITIAL_STATE,
  action: ActionType<
    typeof getPetsA
    | typeof selectPetA
    | typeof resetSelectedPetA
    | typeof getScheduleServiceA
    | typeof getScheduleAppointmentA
  >): typeof INITIAL_STATE {
  switch (action.type) {
    case getType(getPetsA.request): {
      return state
        .set('isFetching', true)
    }
    case getType(getPetsA.success): {
      return state
        .set('pets', action.payload)
        .set('isFetching', false)
    }
    case getType(getPetsA.failure): {
      return state
        .set('isFetching', false)
    }
    case getType(getScheduleServiceA.request): {
      return state
        .set('isFetchingServices', true)
    }
    case getType(getScheduleServiceA.success): {
      return state
        .set('services', action.payload)
        .set('isFetchingServices', false)
    }
    case getType(getScheduleServiceA.failure): {
      return state
        .set('isFetchingServices', false)
    }
    case getType(getScheduleAppointmentA.request): {
      return state
        .set('isFetchingAppointments', true)
    }
    case getType(getScheduleAppointmentA.success): {
      return state
        .set('appointments', action.payload)
        .set('isFetchingAppointments', false)
    }
    case getType(getScheduleAppointmentA.failure): {
      return state
        .set('isFetchingAppointments', false)
    }
    case getType(selectPetA): {
      sessionStorage.setItem('petID', action.payload._id)
      sessionStorage.setItem('photoSrc', action.payload.photoSrc)
      return state
        .set('selectedPet', action.payload)
        .set('services', [])
        .set('appointments', [])
    }
    case getType(resetSelectedPetA): {
      sessionStorage.removeItem('petID')
      return state
        .set('selectedPet', {})
    }
    default:
      return state
  }
}
