import { createAsyncAction } from 'typesafe-actions'
import {
  FETCH_REPORT_REQUEST,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_ERROR,
} from './types'

export const fetchReportA = createAsyncAction(
  FETCH_REPORT_REQUEST,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_ERROR,
)<
  {
    dateTo: Date,
    dateFor: Date,
  }, any, Error
>()

