import { createAsyncAction } from 'typesafe-actions'
import {
  FETCH_PATIENTS_ERROR,
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
} from './types'

export const fetchPatientsA = createAsyncAction(
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
)<
  any | undefined, any[], Error
>()

