import { createAction, createAsyncAction } from 'typesafe-actions'
import {
  GET_PETS_ERROR,
  GET_PETS_REQUEST,
  GET_PETS_SUCCESS,
  CREATE_PET_REQUEST,
  CREATE_PET_SUCCESS,
  CREATE_PET_ERROR,
  UPDATE_PET_REQUEST,
  UPDATE_PET_SUCCESS,
  UPDATE_PET_ERROR,
  SELECT_PET,
  RESET_SELECTED_PET,
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

export const updatePetA = createAsyncAction(
  UPDATE_PET_REQUEST,
  UPDATE_PET_SUCCESS,
  UPDATE_PET_ERROR,
)<
  any, undefined, Error
>()

export const selectPetA = createAction(
  SELECT_PET,
)<any>()

export const resetSelectedPetA = createAction(
  RESET_SELECTED_PET,
)<undefined>()
