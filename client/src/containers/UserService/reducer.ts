import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { getUserDataA } from './actions'

type userDataState = any

const INITIAL_STATE = Map<userDataState>({
  isFetching: false,
  idEmpl: '',
  fioEmpl: '',
  birthday: '',
  phone: '',
  email: '',
  deptName: '',
  posName: '',
  profName: '',
  catName: '',
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
        .set('idEmpl', action.payload.idEmpl)
        .set('fioEmpl', action.payload.fioEmpl)
        .set('birthday', action.payload.birthday)
        .set('phone', action.payload.phone)
        .set('email', action.payload.email)
        .set('deptName', action.payload.deptName)
        .set('posName', action.payload.posName)
        .set('profName', action.payload.profName)
        .set('catName', action.payload.catName)
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
