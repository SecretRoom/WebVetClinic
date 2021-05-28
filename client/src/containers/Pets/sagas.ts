import { takeEvery, call, put, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { ActionType } from 'typesafe-actions';
import { createPetA, getPetsA } from './actions';
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

function* createPetSaga(action: ActionType<typeof createPetA.request>): SagaIterator {
  try {
    const userID = yield select(state => userIDS(state))
    const { status, id } = yield call([PetsAPI, PetsAPI.createPet], {
      ...action.payload,
      userID,
    })
    if (status !== '1') {
      const formData = new FormData();
      formData.append('file', action.payload.file)
      formData.append('userID', userID)
      formData.append('petID', id)
      fetch('/pets/photos/upload', {
        method: 'POST',
        body: formData,
      })
      yield put(createPetA.success())
      yield put(getPetsA.request())
    }
  } catch (error) {
    yield put(createPetA.failure(error))
  }
}

export default function* (): SagaIterator {
  yield takeEvery(getPetsA.request, getPetsSaga)
  yield takeEvery(createPetA.request, createPetSaga)
}
