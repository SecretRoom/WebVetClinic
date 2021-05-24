import { createAsyncAction, createAction } from 'typesafe-actions'
import { REGISTRY_ERROR, REGISTRY_REQUEST, REGISTRY_SUCCESS } from './types'

export const registryA = createAsyncAction(
  REGISTRY_REQUEST,
  REGISTRY_SUCCESS,
  REGISTRY_ERROR,
)<
  any,
  undefined, Error
>()
