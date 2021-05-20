import { createAsyncAction, createAction } from 'typesafe-actions'
import { AUTH_ERROR, AUTH_REQUEST, AUTH_SUCCESS, LOG_OUT } from './types'

export const authA = createAsyncAction(
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
)<
  {
    userName: string,
    password: string,
  },
  {
    userID: string,
    isAuth: boolean
  }, Error
>()

export const logoutA = createAction(
  LOG_OUT,
)<undefined>()
