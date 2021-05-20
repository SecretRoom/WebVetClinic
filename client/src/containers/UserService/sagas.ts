import { takeEvery, call, put, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { getUserDataA } from './actions';
import { userIDS } from '../Auth/selectors';
import UserDataAPI from '../../services/API/UserData'
import { logoutA } from '../Auth/actions';

function* getUserDataSaga(): SagaIterator {
  try {
    const idEmpl = yield select(state => userIDS(state))
    const { status, items } = yield call([UserDataAPI, UserDataAPI.getUserData], [idEmpl])
    if (status !== '1') {
      yield put(getUserDataA.success(items[0]))
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
