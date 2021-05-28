import { createAsyncAction } from 'typesafe-actions'
import {
  GET_PETS_ERROR,
  GET_PETS_REQUEST,
  GET_PETS_SUCCESS,
  CREATE_PET_REQUEST,
  CREATE_PET_SUCCESS,
  CREATE_PET_ERROR,
} from './types'

export const getPetsA = createAsyncAction(
  GET_PETS_REQUEST,
  GET_PETS_SUCCESS,
  GET_PETS_ERROR,
)<
  undefined, any, Error
>()

export const createPetA = createAsyncAction(
  CREATE_PET_REQUEST,
  CREATE_PET_SUCCESS,
  CREATE_PET_ERROR,
)<
  any, undefined, Error
>()
