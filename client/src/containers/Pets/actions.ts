import { createAsyncAction } from 'typesafe-actions'
import {
  GET_PETS_ERROR,
  GET_PETS_REQUEST,
  GET_PETS_SUCCESS,
} from './types'

export const getPetsA = createAsyncAction(
  GET_PETS_REQUEST,
  GET_PETS_SUCCESS,
  GET_PETS_ERROR,
)<
  undefined, any, Error
>()
