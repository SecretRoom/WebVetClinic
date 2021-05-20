import { createAction, createAsyncAction } from 'typesafe-actions'
import {
  ADD_ANALYSIS_ERROR,
  ADD_ANALYSIS_REQUEST,
  ADD_ANALYSIS_SUCCESS,
  FETCH_ANALYZES_SCHEDULE_REQUEST,
  FETCH_ANALYZES_SCHEDULE_SUCCESS,
  FETCH_ANALYZES_SCHEDULE_ERROR,
  FETCH_PATIENT_ERROR,
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  SELECT_PATIENT,
  UPDATE_PATIENT_ERROR,
  UPDATE_PATIENT_REQUEST,
  UPDATE_PATIENT_SUCCESS,
  FETCH_ANALYZES_LIST_REQUEST,
  FETCH_ANALYZES_LIST_SUCCESS,
  FETCH_ANALYZES_LIST_ERROR,
  REMOVE_ANALYSIS_REQUEST,
  REMOVE_ANALYSIS_SUCCESS,
  REMOVE_ANALYSIS_ERROR,
} from './types'

export const fetchPatientA = createAsyncAction(
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_ERROR,
)<
  undefined, any, Error
>()

export const updatePatientA = createAsyncAction(
  UPDATE_PATIENT_REQUEST,
  UPDATE_PATIENT_SUCCESS,
  UPDATE_PATIENT_ERROR,
)<
  any, undefined, Error
>()

export const addAnalysisA = createAsyncAction(
  ADD_ANALYSIS_REQUEST,
  ADD_ANALYSIS_SUCCESS,
  ADD_ANALYSIS_ERROR,
)<
  any, undefined, Error
>()

export const removeAnalysisA = createAsyncAction(
  REMOVE_ANALYSIS_REQUEST,
  REMOVE_ANALYSIS_SUCCESS,
  REMOVE_ANALYSIS_ERROR,
)<
  string, undefined, Error
>()

export const fetchAnalyzesScheduleA = createAsyncAction(
  FETCH_ANALYZES_SCHEDULE_REQUEST,
  FETCH_ANALYZES_SCHEDULE_SUCCESS,
  FETCH_ANALYZES_SCHEDULE_ERROR,
)<
  undefined, any, Error
>()

export const fetchAnalyzesListA = createAsyncAction(
  FETCH_ANALYZES_LIST_REQUEST,
  FETCH_ANALYZES_LIST_SUCCESS,
  FETCH_ANALYZES_LIST_ERROR,
)<
  undefined, any, Error
>()

export const selectPatientA = createAction(
  SELECT_PATIENT,
)<string>()
