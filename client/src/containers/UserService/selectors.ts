import { Map } from 'immutable'

/** Стэйт модуля */
export const userDataStateS = (state: RootStateInterface): Map<string, any> => state.userData

export const isFetchingS = (state: RootStateInterface): boolean => userDataStateS(state).get('isFetching')

export const idEmplS = (state: RootStateInterface): string => userDataStateS(state).get('idEmpl')

export const fioEmplS = (state: RootStateInterface): string => userDataStateS(state).get('fioEmpl')

export const birthdayEmplS = (state: RootStateInterface): string => userDataStateS(state).get('birthday')

export const phoneEmplS = (state: RootStateInterface): string => userDataStateS(state).get('phone')

export const emailEmplS = (state: RootStateInterface): string => userDataStateS(state).get('email')

export const deptNameEmplS = (state: RootStateInterface): string => userDataStateS(state).get('deptName')

export const posNameEmplS = (state: RootStateInterface): string => userDataStateS(state).get('posName')

export const profNameEmplS = (state: RootStateInterface): string => userDataStateS(state).get('profName')

export const catNameEmplS = (state: RootStateInterface): string => userDataStateS(state).get('catName')

