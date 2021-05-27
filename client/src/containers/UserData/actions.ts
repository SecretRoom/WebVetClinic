import { createAsyncAction } from 'typesafe-actions'
import {
  GET_USER_DATA_ERROR,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_ERROR,
} from './types'

export const getUserDataA = createAsyncAction(
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
)<
  undefined, any, Error
>()

export const updateUserDataA = createAsyncAction(
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_ERROR,
)<
  any, undefined, Error
>()
