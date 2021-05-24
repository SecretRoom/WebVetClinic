import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { getUserDataA } from './actions'

type userDataState = any

const INITIAL_STATE = Map<userDataState>({
  isFetching: false,
  fullName: '',
  surname: '',
  name: '',
  patronymic: '',
  shortName: '',
  birthday: '',
  sex: '',
  phone: '',
  email: '',
})

export default function reducer(
  state = INITIAL_STATE,
  action: ActionType<
    typeof getUserDataA
  >): typeof INITIAL_STATE {
  switch (action.type) {
    case getType(getUserDataA.request): {
      return state
        .set('isFetching', true)
    }
    case getType(getUserDataA.success): {
      return state
        .set('fullName', action.payload.fullName)
        .set('surname', action.payload.surname)
        .set('name', action.payload.name)
        .set('patronymic', action.payload.patronymic)
        .set('shortName', action.payload.shortName)
        .set('birthday', action.payload.birthday)
        .set('sex', action.payload.sex)
        .set('phone', action.payload.phone)
        .set('email', action.payload.email)
        .set('isFetching', false)
    }
    case getType(getUserDataA.failure): {
      return state
        .set('isFetching', false)
    }
    default:
      return state
  }
}
