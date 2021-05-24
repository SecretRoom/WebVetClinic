import { takeEvery, call, put, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { getPetsA } from './actions';
import { userIDS } from '../Auth/selectors';
import PetsAPI from '../../services/API/Pets'

function* getPetsSaga(): SagaIterator {
  try {
    const userID = yield select(state => userIDS(state))
    const { status, items } = yield call([PetsAPI, PetsAPI.getPets], userID)
    if (status !== '1') {
      yield put(getPetsA.success(items))
    }
  } catch (error) {
    yield put(getPetsA.failure(error))
  }
}

export default function* (): SagaIterator {
  yield takeEvery(getPetsA.request, getPetsSaga)
}
