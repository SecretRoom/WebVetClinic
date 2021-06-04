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
  GET_SCHEDULE_APPOINTMENT_REQUEST,
  GET_SCHEDULE_APPOINTMENT_SUCCESS,
  GET_SCHEDULE_APPOINTMENT_ERROR,
  GET_SCHEDULE_SERVICE_REQUEST,
  GET_SCHEDULE_SERVICE_SUCCESS,
  GET_SCHEDULE_SERVICE_ERROR,
  ADD_TO_SCHEDULE_REQUEST,
  ADD_TO_SCHEDULE_SUCCESS,
  ADD_TO_SCHEDULE_ERROR,
  REMOVE_FROM_SCHEDULE_REQUEST,
  REMOVE_FROM_SCHEDULE_SUCCESS,
  REMOVE_FROM_SCHEDULE_ERROR,
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

export const getScheduleAppointmentA = createAsyncAction(
  GET_SCHEDULE_APPOINTMENT_REQUEST,
  GET_SCHEDULE_APPOINTMENT_SUCCESS,
  GET_SCHEDULE_APPOINTMENT_ERROR,
)<
  undefined, any, Error
>()

export const getScheduleServiceA = createAsyncAction(
  GET_SCHEDULE_SERVICE_REQUEST,
  GET_SCHEDULE_SERVICE_SUCCESS,
  GET_SCHEDULE_SERVICE_ERROR,
)<
  undefined, any, Error
>()

export const addToScheduleA = createAsyncAction(
  ADD_TO_SCHEDULE_REQUEST,
  ADD_TO_SCHEDULE_SUCCESS,
  ADD_TO_SCHEDULE_ERROR,
)<
  any, undefined, Error
>()

export const removeFromScheduleA = createAsyncAction(
  REMOVE_FROM_SCHEDULE_REQUEST,
  REMOVE_FROM_SCHEDULE_SUCCESS,
  REMOVE_FROM_SCHEDULE_ERROR,
)<
  string, undefined, Error
>()
