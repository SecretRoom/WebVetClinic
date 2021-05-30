import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { getPetsA, resetSelectedPetA, selectPetA } from './actions'

type petsState = any

const INITIAL_STATE = Map<petsState>({
  isFetching: false,
  pets: [],
  selectedPet: {
    _id: sessionStorage.getItem('petID') || undefined,
  },
})

export default function reducer(
  state = INITIAL_STATE,
  action: ActionType<
    typeof getPetsA
    | typeof selectPetA
    | typeof resetSelectedPetA
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
    case getType(selectPetA): {
      sessionStorage.setItem('petID', action.payload._id)
      sessionStorage.setItem('photoSrc', action.payload.photoSrc)
      return state
        .set('selectedPet', action.payload)
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
