import { Map } from 'immutable'

/** Стэйт модуля */
export const patientsStateS = (state: RootStateInterface): Map<string, any> => state.patients

export const isFetchingPatientsListS = (state: RootStateInterface): boolean => patientsStateS(state).get('isFetching')

export const patientsListS = (state: RootStateInterface): any[] => patientsStateS(state).get('patientsList')
