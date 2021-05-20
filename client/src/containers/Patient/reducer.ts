import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { fetchAnalyzesListA, fetchAnalyzesScheduleA, fetchPatientA, selectPatientA } from './actions'

type patientState = any

const INITIAL_STATE = Map<patientState>({
  isFetching: false,
  idPat: sessionStorage.getItem('idPat') || '',
  fullName: '',
  surname: '',
  name: '',
  patronymic: '',
  shortName: '',
  birthday: '',
  sex: '',
  phone: '',
  email: '',
  oms: '',
  omsCompany: '',
  snils: '',
  scheduleAnalyzes: [],
  analyzesList: [],
})

export default function reducer(
  state = INITIAL_STATE,
  action: ActionType<
    typeof fetchPatientA
    | typeof selectPatientA
    | typeof fetchAnalyzesListA
    | typeof fetchAnalyzesScheduleA
  >): typeof INITIAL_STATE {
  switch (action.type) {
    case getType(fetchPatientA.request): {
      return state
        .set('isFetching', true)
    }
    case getType(fetchPatientA.success): {
      const {
        fullName,
        surname,
        name,
        patronymic,
        shortName,
        birthday,
        sex,
        phone,
        email,
        oms,
        omsCompany,
        snils,
      } = action.payload
      return state
        .set('sex', sex)
        .set('oms', oms)
        .set('name', name)
        .set('phone', phone)
        .set('email', email)
        .set('snils', snils)
        .set('surname', surname)
        .set('isFetching', false)
        .set('fullName', fullName)
        .set('birthday', birthday)
        .set('shortName', shortName)
        .set('patronymic', patronymic)
        .set('omsCompany', omsCompany)
    }
    case getType(fetchPatientA.failure): {
      return state
        .set('isFetching', false)
    }
    case getType(selectPatientA): {
      sessionStorage.setItem('idPat', action.payload)
      return state
        .set('idPat', action.payload)
    }
    case getType(fetchAnalyzesListA.success): {
      return state
        .set('isFetching', false)
        .set('analyzesList', action.payload)
    }
    case getType(fetchAnalyzesListA.failure): {
      return state
        .set('isFetching', false)
    }
    case getType(fetchAnalyzesScheduleA.success): {
      return state
        .set('isFetching', false)
        .set('scheduleAnalyzes', action.payload)
    }
    case getType(fetchAnalyzesScheduleA.failure): {
      return state
        .set('isFetching', false)
    }

    default:
      return state
  }
}
