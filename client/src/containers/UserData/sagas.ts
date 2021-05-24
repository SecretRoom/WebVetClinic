import { takeEvery, call, put, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { getUserDataA } from './actions';
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

export default function* (): SagaIterator {
  yield takeEvery(getUserDataA.request, getUserDataSaga)
}
