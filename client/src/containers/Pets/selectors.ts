import { Map } from 'immutable'

/** Стэйт модуля */
export const petsStateS = (state: RootStateInterface): Map<string, any> => state.pets

export const isFetchingPetsS = (state: RootStateInterface): boolean => petsStateS(state).get('isFetching')

export const petsS = (state: RootStateInterface): any[] => petsStateS(state).get('pets')

