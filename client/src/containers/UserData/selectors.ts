import { Map } from 'immutable'

/** Стэйт модуля */
export const userDataStateS = (state: RootStateInterface): Map<string, any> => state.userData

export const isFetchingS = (state: RootStateInterface): boolean => userDataStateS(state).get('isFetching')

export const fullNameS = (state: RootStateInterface): string => userDataStateS(state).get('fullName')

export const surnameS = (state: RootStateInterface): string => userDataStateS(state).get('surname')

export const nameS = (state: RootStateInterface): string => userDataStateS(state).get('name')

export const patronymicS = (state: RootStateInterface): string => userDataStateS(state).get('patronymic')

export const shortNameS = (state: RootStateInterface): string => userDataStateS(state).get('shortName')

export const birthdayS = (state: RootStateInterface): string => userDataStateS(state).get('birthday')

export const sexS = (state: RootStateInterface): string => userDataStateS(state).get('sex')

export const phoneS = (state: RootStateInterface): string => userDataStateS(state).get('phone')

export const emailS = (state: RootStateInterface): string => userDataStateS(state).get('email')

