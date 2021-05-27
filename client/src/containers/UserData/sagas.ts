import { takeEvery, call, put, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { ActionType } from 'typesafe-actions';
import { getUserDataA, updateUserDataA } from './actions';
import { userIDS } from '../Auth/selectors';
import UserDataAPI from '../../services/API/UserData'
import { logoutA } from '../Auth/actions';
import { getPetsA } from '../Pets/actions';

function* getUserDataSaga(): SagaIterator {
  try {
    const userID = yield select(state => userIDS(state))
    const { status, data } = yield call([UserDataAPI, UserDataAPI.getUserData], userID)
    if (status !== '1') {
      yield put(getUserDataA.success(data))
      yield put(getPetsA.request())
    } else {
      yield put(logoutA())
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
