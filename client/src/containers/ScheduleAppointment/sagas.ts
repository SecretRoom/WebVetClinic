import { takeEvery, call, put, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { ActionType } from 'typesafe-actions';
import * as R from 'ramda'
import ScheduleAppointmentAPI from '../../services/API/ScheduleAppointment'
import { addAppointmentA, fetchScheduleAppointmentA } from './actions';
import { idEmplS } from '../UserService/selectors';
import { filterDateS } from './selectors';

function* fetchScheduleAppointmentSaga(action: ActionType<typeof fetchScheduleAppointmentA.request>): SagaIterator {
  try {
    const idEmpl = yield select(state => idEmplS(state))
    if (!R.isEmpty(idEmpl) && !R.isEmpty(action.payload)) {
      const { status, items } = yield call([ScheduleAppointmentAPI, ScheduleAppointmentAPI.getScheduleAppointment], {
        idEmpl,
        date: action.payload,
      })
      if (status !== '1') {
        yield put(fetchScheduleAppointmentA.success({
          date: action.payload,
          planned: items[0].planned,
          adopted: items[0].adopted,
        }))
      }
    }
  } catch (error) {
    yield put(fetchScheduleAppointmentA.failure(error))
  }
}

function* addAppointmentSaga(action: ActionType<typeof addAppointmentA.request>): SagaIterator {
  try {
    const filterDate = yield select(state => filterDateS(state))
    const { status } = yield call([ScheduleAppointmentAPI, ScheduleAppointmentAPI.addAppointment], action.payload)

    if (status !== '1') {
      yield put(addAppointmentA.success())
      yield put(fetchScheduleAppointmentA.request(filterDate))
    }
  } catch (error) {
    yield put(addAppointmentA.failure(error))
  }
}

export default function* (): SagaIterator {
  yield takeEvery(addAppointmentA.request, addAppointmentSaga)
  yield takeEvery(fetchScheduleAppointmentA.request, fetchScheduleAppointmentSaga)
}
