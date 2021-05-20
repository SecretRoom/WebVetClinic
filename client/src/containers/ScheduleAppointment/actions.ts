import { createAsyncAction } from 'typesafe-actions'
import {
  FETCH_SCHEDULE_APPOINTMENT_ERROR,
  FETCH_SCHEDULE_APPOINTMENT_REQUEST,
  FETCH_SCHEDULE_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_REQUEST,
  ADD_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_ERROR,
} from './types'

export const fetchScheduleAppointmentA = createAsyncAction(
  FETCH_SCHEDULE_APPOINTMENT_REQUEST,
  FETCH_SCHEDULE_APPOINTMENT_SUCCESS,
  FETCH_SCHEDULE_APPOINTMENT_ERROR,
)<
  Date, any, Error
>()

export const addAppointmentA = createAsyncAction(
  ADD_APPOINTMENT_REQUEST,
  ADD_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_ERROR,
)<
  {
    date: Date,
    idEmpl: string,
    idPat: string
  }, undefined, Error
>()

