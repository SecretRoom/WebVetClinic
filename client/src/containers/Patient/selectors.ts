import { Map } from 'immutable'

/** Стэйт модуля */
export const patientStateS = (state: RootStateInterface): Map<string, any> => state.patient

export const isFetchingPatientS = (state: RootStateInterface): boolean => patientStateS(state).get('isFetching')

export const idPatS = (state: RootStateInterface): string => patientStateS(state).get('idPat')

export const fullNamePatS = (state: RootStateInterface): string => patientStateS(state).get('fullName')

export const patientInfoS = (state: RootStateInterface): any => ({
  oms: patientStateS(state).get('oms'),
  sex: patientStateS(state).get('sex'),
  name: patientStateS(state).get('name'),
  idPat: patientStateS(state).get('idPat'),
  phone: patientStateS(state).get('phone'),
  email: patientStateS(state).get('email'),
  snils: patientStateS(state).get('snils'),
  surname: patientStateS(state).get('surname'),
  birthday: patientStateS(state).get('birthday'),
  omsCompany: patientStateS(state).get('omsCompany'),
  patronymic: patientStateS(state).get('patronymic'),
})

export const scheduleAnalyzesS = (state: RootStateInterface): any => patientStateS(state).get('scheduleAnalyzes')

export const analyzesListS = (state: RootStateInterface): any => patientStateS(state).get('analyzesList')

