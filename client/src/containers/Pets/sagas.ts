import { takeEvery, call, put, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import * as R from 'ramda'

import { ActionType } from 'typesafe-actions';
import {
  createPetA,
  updatePetA,
  getPetsA,
  selectPetA,
  getScheduleAppointmentA,
  getScheduleServiceA,
  addToScheduleA,
  removeFromScheduleA,
} from './actions';
import { userIDS } from '../Auth/selectors';
import PetsAPI from '../../services/API/Pets'
import ScheduleAPI from '../../services/API/Schedule'
import { selectedPetIDS } from './selectors';

function* getPetsSaga(): SagaIterator {
  try {
    const userID = yield select(state => userIDS(state))
    const selectedPetID = yield select(state => selectedPetIDS(state))
    const { status, items } = yield call([PetsAPI, PetsAPI.getPets], userID)
    if (status !== '1') {
      if (selectedPetID) {
        yield put(selectPetA(
          JSON.parse(
            JSON.stringify(
              {
                ...R.find(R.propEq('_id', selectedPetID))(items),
                photoSrc: sessionStorage.getItem('photoSrc'),
              },
            ),
          ),
        ))
      }
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

function* updatePetSaga(action: ActionType<typeof updatePetA.request>): SagaIterator {
  try {
    const { status } = yield call([PetsAPI, PetsAPI.updatePet], {
      ...action.payload,
    })
    if (status !== '1') {
      if (!R.isNil(action.payload.file)) {
        const userID = yield select(state => userIDS(state))
        const formData = new FormData();
        formData.append('file', action.payload.file)
        formData.append('userID', userID)
        formData.append('petID', action.payload.petID)
        fetch('/pets/photos/upload', {
          method: 'POST',
          body: formData,
        })
      }
      yield put(updatePetA.success())
      yield put(getPetsA.request())
    }
  } catch (error) {
    yield put(updatePetA.failure(error))
  }
}

function* getScheduleAppointmentSaga(): SagaIterator {
  try {
    const selectedPetID = yield select(state => selectedPetIDS(state))
    const { status, items } = yield call([ScheduleAPI, ScheduleAPI.getAppointment], selectedPetID)
    if (status !== '1') {
      yield put(getScheduleAppointmentA.success(items))
    }
  } catch (error) {
    yield put(getScheduleAppointmentA.failure(error))
  }
}

function* getScheduleServiceSaga(): SagaIterator {
  try {
    const selectedPetID = yield select(state => selectedPetIDS(state))
    const { status, items } = yield call([ScheduleAPI, ScheduleAPI.getService], selectedPetID)
    if (status !== '1') {
      yield put(getScheduleServiceA.success(items))
    }
  } catch (error) {
    yield put(getScheduleServiceA.failure(error))
  }
}

function* addToScheduleSaga(action: ActionType<typeof addToScheduleA.request>): SagaIterator {
  try {
    const userID = yield select(state => userIDS(state))
    const petID = yield select(state => selectedPetIDS(state))
    const { status } = yield call([ScheduleAPI, ScheduleAPI.addToSchedule], {
      petID,
      ownerID: userID,
      ...action.payload,
    })
    if (status !== '1') {
      yield put(addToScheduleA.success())
      yield put(getScheduleServiceA.request())
      yield put(getScheduleAppointmentA.request())
    }
  } catch (error) {
    yield put(addToScheduleA.failure(error))
  }
}

function* removeFromScheduleSaga(action: ActionType<typeof removeFromScheduleA.request>): SagaIterator {
  try {
    const { status } = yield call([ScheduleAPI, ScheduleAPI.removeFromSchedule], action.payload)
    if (status !== '1') {
      yield put(removeFromScheduleA.success())
      yield put(getScheduleServiceA.request())
      yield put(getScheduleAppointmentA.request())
    }
  } catch (error) {
    yield put(removeFromScheduleA.failure(error))
  }
}

export default function* (): SagaIterator {
  yield takeEvery(getPetsA.request, getPetsSaga)
  yield takeEvery(createPetA.request, createPetSaga)
  yield takeEvery(updatePetA.request, updatePetSaga)
  yield takeEvery(addToScheduleA.request, addToScheduleSaga)
  yield takeEvery(removeFromScheduleA.request, removeFromScheduleSaga)
  yield takeEvery(getScheduleServiceA.request, getScheduleServiceSaga)
  yield takeEvery(getScheduleAppointmentA.request, getScheduleAppointmentSaga)
}
