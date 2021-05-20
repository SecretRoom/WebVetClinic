import { createAsyncAction } from 'typesafe-actions'
import {
  GET_USER_DATA_ERROR,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
} from './types'

/** Получение списка назначений */
export const getUserDataA = createAsyncAction(
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
)<
  undefined, any, Error
>()
