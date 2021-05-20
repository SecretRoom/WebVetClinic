import { Map } from 'immutable'

/** Стэйт модуля */
export const authStateS = (state: RootStateInterface): Map<string, any> => state.auth

export const isAuthenticatedS = (state: RootStateInterface): boolean => authStateS(state).get('isAuthenticated')

export const userIDS = (state: RootStateInterface): string => authStateS(state).get('userID')

export const isFetchingAuthS = (state: RootStateInterface): boolean => authStateS(state).get('isFetching')
