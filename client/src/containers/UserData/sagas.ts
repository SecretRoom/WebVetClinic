import { takeEvery, call, put, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { ActionType } from 'typesafe-actions';
import { getUserDataA, updateUserDataA } from './actions';
import { userIDS } from '../Auth/selectors';
import UserDataAPI from '../../services/API/UserData'
import { logoutA } from '../Auth/actions';
import { getPetsA } from '../Pets/actions';
import IndexedDB from '../../services/IndexedDB'

import StaffAPI from '../../services/API/Staff'
import DirectoriesAPI from '../../services/API/Directories'
import { NAME_INDEXED_DB } from '../../config'

function* getUserDataSaga(): SagaIterator {
  try {
    const userID = yield select(state => userIDS(state))
    if (userID) {
      const { status, data } = yield call([UserDataAPI, UserDataAPI.getUserData], userID)
      if (status !== '1') {
        const dataStaff = yield call([StaffAPI, StaffAPI.getStaff], {})
        const dataProfile = yield call([DirectoriesAPI, DirectoriesAPI.getProfile])
        const dataServices = yield call([DirectoriesAPI, DirectoriesAPI.getServices])
        const dataCategory = yield call([DirectoriesAPI, DirectoriesAPI.getCategory])

        if (
          dataStaff.status !== '1'
          && dataProfile.status !== '1'
          && dataServices.status !== '1'
          && dataCategory.status !== '1'
        ) {
          IndexedDB.createDB(
            NAME_INDEXED_DB.nameDB,
            {
              [NAME_INDEXED_DB.nameDS.staff]: dataStaff.items,
              [NAME_INDEXED_DB.nameDS.profile]: dataProfile.items,
              [NAME_INDEXED_DB.nameDS.services]: dataServices.items,
              [NAME_INDEXED_DB.nameDS.category]: dataCategory.items,
            },
            NAME_INDEXED_DB.version,
          )

          yield put(getUserDataA.success(data))
          yield put(getPetsA.request())
        }
      } else {
        yield put(logoutA())
      }
    }
  } catch (error) {
    yield put(getUserDataA.failure(error))
    yield put(logoutA())
  }
}

function* updateUserDataSaga(action: ActionType<typeof updateUserDataA.request>): SagaIterator {
  try {
    const userID = yield select(state => userIDS(state))
    const { status } = yield call([UserDataAPI, UserDataAPI.updateUserData], {
      ...action.payload,
      userID,
    })
    if (status !== '1') {
      yield put(getUserDataA.request())
    }
  } catch (error) {
    yield put(getUserDataA.failure(error))
  }
}

export default function* (): SagaIterator {
  yield takeEvery(getUserDataA.request, getUserDataSaga)
  yield takeEvery(updateUserDataA.request, updateUserDataSaga)
}
