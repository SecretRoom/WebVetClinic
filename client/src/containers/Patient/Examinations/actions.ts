import { createAction, createAsyncAction } from 'typesafe-actions'
import {
  CREATE_EXAM_ERROR,
  CREATE_EXAM_REQUEST,
  CREATE_EXAM_SUCCESS,
  FETCH_EXAM_LIST_ERROR,
  FETCH_EXAM_LIST_REQUEST,
  FETCH_EXAM_LIST_SUCCESS,
  SELECT_EXAM_ERROR,
  SELECT_EXAM_REQUEST,
  SELECT_EXAM_SUCCESS,
  UPDATE_EXAM_REQUEST,
  UPDATE_EXAM_SUCCESS,
  UPDATE_EXAM_ERROR,
  RESET_SELECTED_EXAM,

} from './types'

export const fetchExamListA = createAsyncAction(
  FETCH_EXAM_LIST_REQUEST,
  FETCH_EXAM_LIST_SUCCESS,
  FETCH_EXAM_LIST_ERROR,
)<
  undefined, any, Error
>()

export const createExamA = createAsyncAction(
  CREATE_EXAM_REQUEST,
  CREATE_EXAM_SUCCESS,
  CREATE_EXAM_ERROR,
)<
  string, undefined, Error
>()

export const selectExamA = createAsyncAction(
  SELECT_EXAM_REQUEST,
  SELECT_EXAM_SUCCESS,
  SELECT_EXAM_ERROR,
)<
  { id: any, newData?: any }, {
    selectedExam: string,
    selectedExamData: any
  }, Error
>()

export const updateExamA = createAsyncAction(
  UPDATE_EXAM_REQUEST,
  UPDATE_EXAM_SUCCESS,
  UPDATE_EXAM_ERROR,
)<
  any, undefined, Error
>()

export const resetSelectedExamA = createAction(
  RESET_SELECTED_EXAM,
)<undefined>()

