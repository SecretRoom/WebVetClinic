import { takeEvery, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { SagaIterator } from 'redux-saga';
import {
  registryA,
} from './actions';
import RegistryAPI from '../../services/API/Registry'

import { authA } from '../../actions';

function* registrySaga(action: ActionType<typeof registryA.request>): SagaIterator {
  try {
    const { status } = yield call([RegistryAPI, RegistryAPI.registry], action.payload)
    if (status !== '1') {
      yield put(registryA.success())
      yield put(authA.request(action.payload))
    }
  } catch (error) {
    yield put(registryA.failure(error))
  }
}

export default function* (): SagaIterator {
  yield takeEvery(registryA.request, registrySaga)
}
